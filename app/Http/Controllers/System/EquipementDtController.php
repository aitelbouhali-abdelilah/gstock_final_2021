<?php

namespace App\Http\Controllers\System;

use App\Exports\EquipementDtExport;
use App\Models\EquipementDt;
use App\Http\Controllers\Controller;
use App\Imports\EquipmentDtImport;
use App\Jobs\SendQueueEmail;
use App\Models\ChartEquipmentHistory;
use App\Models\Equipement;
use App\Models\EquipementModel;
use App\Models\EquipmentDtHistory;
use App\Models\Products;
use App\Models\Site;
use App\Models\Terminal;
use App\Models\User;
use App\Notifications\StockNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel as Excel;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;

class EquipementDtController extends Controller
{

    public function storeCSV(Request $request)
    {

        $files =   Storage::allFiles('import/');
        Storage::delete($files);


        $currentUser = $request->user();

        $request->validate([
            'file'  => 'required|file|max:10000|mimes:xlsx,csv,xls',
            'id_equipment' => 'required|integer|exists:equipements,id',
        ]);


        $equipement = Equipement::findOrFail($request['id_equipment']);
        $file = $request->file('file');

        if (
            $file && $equipement
            && $currentUser->hasSite($equipement->id_site)
            && $currentUser->hasProduct($equipement->product->name, $request->site)
        ) {

            set_time_limit(300);

            $file->store('import');
            $import = new EquipmentDtImport($request['id_equipment']);
            $import->import($file);
            //dd($import->errors());

            $CEH = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->firstOrCreate(
                    [
                        'id_equipement' => $request->id_equipment,
                        'site' => Equipement::findOrFail($request['id_equipment'])->id_site
                    ]
                );
            $CEH->update([
                'ok_quantity' => $import->count_OK + $CEH->ok_quantity,
                'nok_quantity' => $import->count_NOK + $CEH->nok_quantity,
            ]);

            if ($import->errors()->first() == null) {
                $request->session()->flash('success', __('messages.import finished'));
            } else {
                $request->session()->flash(
                    'error',
                    $import->errors()->first()
                );
            }
        } else {
            $request->session()->flash('error', __('messages.Please select file '));
        }
        return back();
    }

    public function importCSV($system_type)
    {
        return view('system.equipement_state.importCSV', [
            'system_type' => Str::upper($system_type)
        ]);
    }

    public function exportPDFHistory(Request $request, $system_type, $equipementsDt_id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement_dt' => $equipementsDt_id], [
                'product' => 'required|string|exists:products,name',
                'equipement_dt' => 'required|integer|exists:equipement_dts,id',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }

        //set_time_limit(300);

        $related_equipement_dt = EquipementDt::findOrFail($equipementsDt_id);
        $equipement = Equipement::findOrFail($related_equipement_dt->id_equipement);

        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
        ) {

            $equipement_history = EquipmentDtHistory::where([
                ['id_equipement_dts', '=', $related_equipement_dt->id],
            ])->get();
            view()->share([
                'equipement_history' => $equipement_history,
                'equipement_dt' =>  $related_equipement_dt,
            ]);

            $pdf = PDF::loadView('system.equipement_state.pdf_view_history', $equipement_history);
            return $pdf->download('History_' . $related_equipement_dt->asset_tag . '_' . $related_equipement_dt->serial_part_number . '.pdf');
            //}
        } else
            return abort(403);
    }


    public function exportPDF(Request $request, $system_type, $equipement_id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement' => $equipement_id], [
                'product' => 'required|string|exists:products,name',
                'equipement' => 'required|integer|exists:equipements,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        set_time_limit(300);
        ini_set('memory_limit', '-1');
        $equipement = Equipement::findOrFail($equipement_id);
        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {
            $equipementsDt = EquipementDt::with('equipement')
                ->where([
                    ['id_equipement', '=', $equipement_id],
                    ['system_type', '=', Str::upper($system_type)]
                ])->get();

            // share data to view
            view()->share([
                'equipementsDt' => $equipementsDt,
            ]);

            if (count($equipementsDt)) {
                $pdf = PDF::loadView('system.equipement_state.pdf_view', $equipementsDt);
                $pdf->setPaper('a4', 'landscape');
                // download PDF file with download method
                return $pdf->download('equipementsDt_' . $system_type . '.pdf');
            }
        } else
            return abort(403);
    }

    public function exportCSV(Request $request, $system_type, $equipement_id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement' => $equipement_id], [
                'product' => 'required|string|exists:products,name',
                'equipement' => 'required|integer|exists:equipements,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        //set_time_limit(300);
        $equipement = Equipement::findOrFail($equipement_id);
        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {
            set_time_limit(300);
            $fileName = 'equipementDT_' . $system_type . '.csv';
            $equipementsDt = null;
            $equipementsDt = EquipementDt::with('equipement')
                ->where([
                    ['id_equipement', '=', $equipement_id],
                    ['system_type', '=', Str::upper($system_type)]
                ])->get();
            return Excel::download(new EquipementDtExport($equipementsDt), $fileName);
        } else
            return abort(403);
    }


    public function create(Request $request, $system_type, $equipement_id)
    {
        /*
        $equipement = Equipement::where('system_type', '=', $system_type)->findOrFail($equipement_id);
        if (Site::findOrFail(Auth::user()->id_site)->products->where('name', '=', Str::upper($system_type))->first()) {
*/
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement' => $equipement_id], [
                'product' => 'required|string|exists:products,name',
                'equipement' => 'required|integer|exists:equipements,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $equipement = Equipement::findOrFail($equipement_id);
        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {
            return view('system.equipement_state.create')->with([
                'system_type' => Str::upper($system_type),
                'equipement_id' => $equipement_id,
                'products' => $currentUser->products(),
                'terminals' => Products::where('name', '=', $system_type)->firstOrFail()->getSiteUserTerminals(Equipement::find($equipement_id)->id_site, $currentUser->id),
                'equiepemnt_status' => Equipement::findOrFail($equipement_id)->status,
                'site' => Equipement::findOrFail($equipement_id)->id_site,

            ]);
        }

        return abort(403);
        // }
        // return view('index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $system_type)
    {
        $currentUser = $request->user();

        $serials = explode(',', $request->get('serial'));
        $tags = explode(',', $request->get('tag'));

        $inputs = $request->except(['_token']);
        $inputs['serial'] = $serials;
        $inputs['tag'] = $tags;

        Validator::make(array_merge(['product' => $system_type], $inputs), [
            'zone' => ['nullable', 'required_if:status_online_spare,ONLINE'],
            'airline' => ['nullable', 'required_if:status_online_spare,ONLINE'],
            'counter' => ['nullable', 'required_if:status_online_spare,ONLINE'],
            'terminal' => ['nullable', 'required_if:status_online_spare,ONLINE'],
            'status_online_spare' => 'required|in:ONLINE,SPARE',
            'state' => 'required|in:OK,NOK',
            'reparable' => ['nullable', 'required_if:state,NOK', 'in:YES,NO,OUI,NON'],
            'observation' => ['required', 'string', 'max:255'],
            "serial.*"  => "required|string|distinct|min:1|unique:equipement_dts,serial_part_number",
            "tag.*"  => "required|string|distinct|min:1|unique:equipement_dts,asset_tag",
            'id_equipement' => 'required|integer|exists:equipements,id',
            'product' => 'required|string|exists:products,name',
        ])->validate();


        $product = $currentUser->products()->where('name', '=', $system_type)->firstOrFail();
        $equipement = Equipement::where('id_product', '=', $product->id)->findOrFail($inputs['id_equipement']);

        if (
            $product
            && $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            //For Chart
            $nok_count = 0;
            $ok_count = 0;

            for ($index = 0; $index < count($inputs['serial']); $index++) {

                if ($inputs['terminal'] == '') {
                    $inputs['terminal'] = null;
                }

                $state = '';
                if ($inputs['state'] == 'OK') {
                    $repa = '';
                    $state = 'OK';
                    $ok_count++;
                } else {
                    $repa = $inputs['reparable'];
                    $state = 'NOK';
                    //For Chart
                    $nok_count++;
                }
                EquipementDt::create([
                    'zone' => $inputs['zone'],
                    'airline' => $inputs['airline'],
                    'counter' => $inputs['counter'],
                    'id_terminal' => $inputs['terminal'],
                    'status_online_spare' => $inputs['status_online_spare'],
                    'status' => $state,
                    'reparable' => $repa,
                    'observation' => $inputs['observation'],
                    'id_equipement' => $equipement->id,
                    'system_type' => Str::upper($system_type),
                    'serial_part_number' => $inputs['serial'][$index] ?? '',
                    'asset_tag' => $inputs['tag'][$index] ?? ''
                ]);
            }
            //For Chart
            $CEH = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->firstOrCreate(
                    [
                        'id_equipement' => $equipement->id,
                        'site' => $equipement->id_site
                    ]
                );
            $CEH->update([
                'ok_quantity' => $ok_count + $CEH->ok_quantity,
                'nok_quantity' => $nok_count + $CEH->nok_quantity,
            ]);


            $request->session()->flash('success', __('messages.You have created the equipment details'));

            return redirect(route('system.equipement.index', $system_type));
        }
        return abort(403);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\equipementstate  $equipementstate
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement_dt' => $id], [
                'product' => 'required|string|exists:products,name',
                'equipement_dt' => 'required|integer|exists:equipement_dts,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $equipementDt = EquipementDt::where('system_type', '=', Str::upper($system_type))->whereNotIn('equipement_dts.id', DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray())->findOrFail($id);
        $equipement = $equipementDt->equipement;

        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            $selected_terminal = null;
            if ($equipementDt->id_terminal)
                $selected_terminal = Terminal::find($equipementDt->id_terminal);

            return view(
                'system.equipement_state.edit',
                [
                    'system_type' => Str::upper($system_type),
                    'equipement_state' => $equipementDt,
                    'equipement_id' => $equipement->id,
                    'products' => $currentUser->products(),
                    'terminals' => Products::where('name', '=', $system_type)->firstOrFail()->getSiteUserTerminals(Equipement::find($equipement->id)->id_site, $currentUser->id),
                    'selected_terminal' => $selected_terminal,
                ]
            );
        }
        return abort(403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\equipementstate  $equipementstate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type, 'equipement_dt' => $id]), [
                'zone' => ['nullable', 'required_if:status_online_spare,ONLINE'],
                'airline' => ['nullable', 'required_if:status_online_spare,ONLINE'],
                'counter' => ['nullable', 'required_if:status_online_spare,ONLINE'],
                'terminal' => ['nullable', 'required_if:status_online_spare,ONLINE'],
                'status_online_spare' => 'required|in:ONLINE,SPARE',
                'state' => 'required|in:OK,NOK',
                'reparable' => ['nullable', 'required_if:state,NOK', 'in:YES,NO,OUI,NON'],
                'observation' => ['required', 'string', 'max:255'],
                "serial.*"  => "required|string|distinct|min:1|unique:equipement_dts,serial_part_number",
                "tag.*"  => "required|string|distinct|min:1|unique:equipement_dts,asset_tag",
                'product' => 'required|string|exists:products,name',
                'equipement_dt' => 'required|integer|exists:equipement_dts,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $pendding_dt_ids = DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray();
        $equipementDt = EquipementDt::where('system_type', '=', Str::upper($system_type))
            ->where('id_equipement', $request->id_equipement)
            ->whereNotIn('equipement_dts.id', $pendding_dt_ids)
            ->findOrFail($id);
        $equipement = $equipementDt->equipement;

        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            //For Chart
            $CEH = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->firstOrCreate(
                    [
                        'id_equipement' => $equipement->id,
                        'site' => $equipement->id_site,
                    ]
                );


            if ($request->has('state') && $request['state'] == 'NOK')
                $rules['reparable'] = 'required|in:YES,NO,OUI,NON';
            else
                $rules['reparable'] = 'nullable|in:YES,NO,OUI,NON';


            $equipementDtTemp = $equipementDt->replicate();

            if ($request['reparable'] == null) {
                $repa = "";
            } else {
                $repa = $request['reparable'];
            }
            $equipementDt->update([
                'zone' => $request['zone'],
                'airline' => $request['airline'],
                'counter' => $request['counter'],
                'id_terminal' => $request['terminal'],
                'status_online_spare' => $request['status_online_spare'],
                'status' => $request['state'],
                'reparable' => $repa,
                'observation' => $request['observation'],
                'serial_part_number' => $request['serial'],
                'asset_tag' => $request['tag']
            ]);
            if ($equipementDt->wasChanged('id_terminal')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'id_terminal');
            }

            if ($equipementDt->wasChanged('status')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'status');
                if ($request['state'] == 'NOK')
                    $CEH->update([
                        'ok_quantity' => -1 + $CEH->ok_quantity,
                        'nok_quantity' => 1 + $CEH->nok_quantity,
                    ]);
                else
                    $CEH->update([
                        'ok_quantity' => 1 + $CEH->ok_quantity,
                        'nok_quantity' => -1 + $CEH->nok_quantity,
                    ]);
            }

            if ($equipementDt->wasChanged('status_online_spare')) {

                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'status_online_spare');
                if ($request['status_online_spare'] != $equipementDtTemp->equipement->status) {
                    $old_equipement = Equipement::find($equipementDtTemp->id_equipement);
                    $new_equipement = Equipement::where('model', '=', $old_equipement->model)
                        ->where('id_site', '=', $old_equipement->id_site)
                        ->where('id_product', '=', $old_equipement->id_product)
                        ->where('status', '!=', $old_equipement->id_site)
                        ->where('id', '!=', $old_equipement->id)
                        ->first();

                    if ($new_equipement) {
                        if ($equipementDt->status_online_spare == 'SPARE') {
                            $equipementDt->update([
                                'id_terminal' => null,
                            ]);
                        }
                        $equipementDt->update([
                            'id_equipement' => $new_equipement->id,
                        ]);
                    } else {
                        $new_equipement = Equipement::create([
                            'model' => $old_equipement->model,
                            'id_site' => $old_equipement->id_site,
                            'id_product' => $old_equipement->id_product,
                            'description' => $old_equipement->description,
                            'alert_stock' => $old_equipement->alert_stock,
                            'status' => $request['status_online_spare'],
                        ]);
                        if ($new_equipement) {
                            if ($equipementDt->status_online_spare == 'SPARE') {
                                $equipementDt->update([
                                    'id_terminal' => null,
                                ]);
                            }
                            $equipementDt->update([
                                'id_equipement' => $new_equipement->id,
                            ]);
                        }
                    }
                    $CEH_receiver = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                        ->whereYear('created_at', '=', Carbon::now()->year)
                        ->firstOrCreate(
                            [
                                'id_equipement' => $new_equipement->id,
                                'site' => $new_equipement->id_site,
                            ]
                        );

                    if ($request['state'] == 'NOK') {
                        $CEH_receiver->update([
                            'nok_quantity' => 1 + $CEH_receiver->nok_quantity,
                        ]);
                        $CEH->update([
                            'nok_quantity' => -1 + $CEH->nok_quantity,
                        ]);
                    } else {
                        $CEH_receiver->update([
                            'ok_quantity' => 1 + $CEH_receiver->ok_quantity,
                        ]);
                        $CEH->update([
                            'ok_quantity' => -1 + $CEH->ok_quantity,
                        ]);
                    }
                }
            }


            if ($equipementDt->wasChanged('reparable')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'reparable');
            }
            if ($equipementDt->wasChanged('zone') && $equipementDt->zone != '') {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'zone');
            }
            if ($equipementDt->wasChanged('airline') && $equipementDt->airline != '') {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'airline');
            }
            if ($equipementDt->wasChanged('counter') && $equipementDt->counter != '') {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'counter');
            }
            if ($equipementDt->wasChanged('observation')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'observation');
            }
            if ($equipementDt->wasChanged('serial_part_number')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'serial_part_number');
            }
            if ($equipementDt->wasChanged('asset_tag')) {
                $this->UpdateHistory($equipementDt, $equipementDtTemp, 'asset_tag');
            }
            $equipementDtTemp = null;
            $request->session()->flash('success', __('messages.You have updated the equipment details'));

            return redirect()->route('system.equipement.index', $system_type);
        }
        return abort(403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\equipementstate  $equipementstate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement_dt' => $id], [
                'product' => 'required|string|exists:products,name',
                'equipement_dt' => 'required|integer|exists:equipement_dts,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $equipementDt = EquipementDt::where('system_type', '=', Str::upper($system_type))->whereNotIn('equipement_dts.id', DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray())->findOrFail($id);
        $equipement_id =  $equipementDt->id_equipement;
        $equipement = Equipement::findOrFail($equipement_id);

        if (
            $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            //For Chart
            $CEH = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->where('id_equipement', $equipement->id)
                ->where('site', $equipement->id_site)
                ->first();

            $ok_quantity = 0;
            $nok_quantity = 0;
            if ($equipementDt->status == 'NOK')
                $nok_quantity = 1;
            else
                $ok_quantity = 1;

            EquipementDt::destroy($id);


            //For Chart
            $CEH->update([
                'ok_quantity' => $CEH->ok_quantity - $ok_quantity,
                'nok_quantity' => $CEH->nok_quantity - $nok_quantity,
            ]);

            if (count($equipement->equipement_dts) <= $equipement->alert_stock) {

                $userSchema = ($currentUser->productsUsers($system_type, $equipement->id_site)->where('id_role', '=', 2));
                $data = ['id' => $equipement_id, 'type' => 'equipement'];


                Notification::send($userSchema, new StockNotification($data));

                $job = (new SendQueueEmail($data, $userSchema))
                    ->delay(
                        now()
                            ->addSeconds(2)
                    );
                dispatch($job);
            }
            return back()->with('success', __('messages.You have deleted this equipment details'));
            //return redirect()->route('system.equipement.index', $system_type);
        } else
            return abort(403);
    }

    public static function UpdateHistory($equipementDt, $equipementDtTemp, $field)
    {
        $from = $equipementDtTemp->$field;
        $to = $equipementDt->getChanges()[$field];
        if ($field == 'id_terminal') {
            if (isset($equipementDtTemp->id_terminal))
                $from = Terminal::find($equipementDtTemp->id_terminal)->name;
            $to = Terminal::find($equipementDt->id_terminal)->name;
            $field = "Terminal";
        }
        EquipmentDtHistory::create([
            'id_equipement_dts' => $equipementDt->id,
            'messages' => '[' . $field . '] Updated  From  [' . $from . '] To [' . $to . '] At [' . $equipementDt->getChanges()['updated_at'] . '], Observation [' . $equipementDt->observation . ']',
        ]);
    }
    public function moveAccept(Request $request, $token)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['token' => $token], [
                'token' => 'required|string|exists:pendding_transfer_equipement,token'
            ])->validate();

            $table = DB::table('pendding_transfer_equipement')->where('token', '=', $token)->where('receiver_id', '=', $currentUser->id);
            $this->moveAcceptBody($table);
            return back()->with('success', __('messages.Equipments has been moved!'));
        } catch (\Throwable $th) {
            return abort(403);
        }
    }
    public function moveAcceptByToken($token)
    {
        try {
            $table = DB::table('pendding_transfer_equipement')->where('token', '=', $token);
            if ($table->count()) {
                $this->moveAcceptBody($table);
                return view('transfer.success', ['message' => 'Equipments has been moved!']);
            }
            return view('transfer.error', ['message' => 'Not a valid token!']);
        } catch (\Throwable $th) {
        }
    }
    private function moveAcceptBody($table)
    {
        $pendding_transfer_equipement = $table->get()->groupBy('equipement_id')->toArray();

        foreach (array_keys($pendding_transfer_equipement) as $equipement_id) {
            $equipement = Equipement::findOrFail($equipement_id);
            $equipement_temp = Equipement::where('id_product', '=', $equipement->id_product)
                ->where('model', '=', $equipement->model)
                ->where('status', '=', $equipement->status);

            //For Chart
            $CEH = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->firstOrCreate(
                    [
                        'id_equipement' => $equipement->id,
                        'site' => $equipement->id_site
                    ]
                );
            $ok_count = 0;
            $nok_count = 0;

            foreach ($pendding_transfer_equipement[$equipement_id] as $pendding_equipementDt) {
                $equipement_to_send = $equipement_temp->where('id_site', '=', $pendding_equipementDt->id_site)->first();

                if (!$equipement_to_send) {
                    $equipement_to_send = Equipement::create([
                        'model' => $equipement->model,
                        'id_site' => $pendding_equipementDt->id_site,
                        'id_product' => $equipement->id_product,
                        'status' => $equipement->status,
                        'description' => $equipement->description,
                        'alert_stock' => $equipement->alert_stock,
                    ]);
                    $datevar = $equipement_to_send->created_at;
                }
                $equi_dt = EquipementDt::where('id', $pendding_equipementDt->id_equipement_dts);

                if ($equi_dt->first()->status_online_spare == 'SPARE') {
                    $equi_dt->update([
                        'id_equipement' => $equipement_to_send->id,
                        'id_terminal' => null,
                    ]);
                } else {
                    $equi_dt->update([
                        'id_equipement' => $equipement_to_send->id,
                        'id_terminal' => $pendding_equipementDt->terminal_id,
                    ]);
                }


                $datevar = $equi_dt->first()->updated_at;
                EquipmentDtHistory::create([
                    'id_equipement_dts' =>  $pendding_equipementDt->id_equipement_dts,
                    'messages' => ' Moved From [' . Site::find($equipement->id_site)->signifi . '] To  [' . Site::find($pendding_equipementDt->id_site)->signifi . '] At [' . $datevar . ']',
                ]);

                if ($equi_dt->first()->status == 'OK')
                    $ok_count++;
                else
                    $nok_count++;
            }

            $CEH_receiver = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                ->whereYear('created_at', '=', Carbon::now()->year)
                ->firstOrCreate(
                    [
                        'id_equipement' => $equipement_to_send->id,
                        'site' => $equipement_to_send->id_site
                    ]
                );
            $CEH->update([
                'ok_quantity' => $CEH->ok_quantity - $ok_count,
                'nok_quantity' => $CEH->nok_quantity - $nok_count,
            ]);
            $CEH_receiver->update([
                'ok_quantity' => $CEH_receiver->ok_quantity + $ok_count,
                'nok_quantity' => $CEH_receiver->nok_quantity + $nok_count,
            ]);

            if (count($equipement->equipement_dts) <= $equipement->alert_stock) {

                $userSchema = (Auth::user()->productsUsers(Products::find($equipement->id_product)->name, $equipement->id_site)->where('id_role', '=', 2));
                $data = ['id' => $equipement_id, 'type' => 'equipement'];


                Notification::send($userSchema, new StockNotification($data));

                $job = (new SendQueueEmail($data, $userSchema))
                    ->delay(
                        now()
                            ->addSeconds(2)
                    );

                dispatch($job);
            }

            $table->delete();
        }
    }
    public function moveRefuse(Request $request, $token)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['token' => $token], [
                'token' => 'required|string|exists:pendding_transfer_equipement,token'
            ])->validate();

            $table = DB::table('pendding_transfer_equipement')->where('token', '=', $token)->where('receiver_id', '=', $currentUser->id);
            $table->delete();
            return back()->with('success', __('messages.Equipments has been refused!'));
        } catch (\Throwable $th) {
            return abort(403);
        }
    }
    public function moveRefuseByToken($token)
    {
        try {
            $table = DB::table('pendding_transfer_equipement')->where('token', '=', $token);
            if ($table->count()) {
                $table->delete();
                return view('transfer.success', ['message' => 'Equipments has been refused!']);
            }
            return view('transfer.error', ['message' => 'Not a valid token!']);
        } catch (\Throwable $th) {
        }
    }

    public function getMoreEqpts(Request $request)
    {

        $currentUser = $request->user();

        try {
            Validator::make($request->input(), [
                'eqpt' => 'required|integer|exists:equipements,id',
                'page' => 'required|integer',
                'search_query' => 'nullable|string',
                'search_terminal' => 'nullable|string|exists:terminals,id',
                'product' => 'required|string|exists:products,name',
            ])->validate();

            $query = $request->search_query;
            $equipement_id = $request->eqpt;
            $terminal = $request->search_terminal ?? null;
            $equipement = Equipement::findOrFail($equipement_id);
            $terminals = Products::where('name', '=', $request->product)->firstOrFail()->getSiteUserTerminals($equipement->id_site, $currentUser->id);

            if (
                $currentUser->hasProduct($equipement->product->name, $equipement->id_site)
                && $currentUser->hasSite($equipement->id_site)
                && $request->ajax()
            ) {

                if (isset($terminal) && !in_array($terminal, $terminals->pluck('id')->toArray()))
                    return abort(403);
                $equipement_dts = EquipementDt::getEquipementDts($query, $equipement_id, $terminal);
                return view('pages.eqpt_data', compact('equipement_dts'))->render();
            }
        } catch (\Throwable $th) {
            return response('', 200);
        }
    }
}