<?php

namespace App\Http\Controllers\System;

use App\Exports\EquipementExport;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Jobs\SendTransferQueueEmail;
use App\Models\Equipement;
use App\Models\EquipementDt;
use App\Models\EquipementType;
use App\Models\EquipmentDtHistory;
use App\Models\ChartEquipmentHistory;
use App\Models\EquipementModel;
use App\Models\Products;
use App\Models\Site;
use App\Models\User;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel as Excel;

class EquipementController extends Controller
{

    public function exportPDF(Request $request, $system_type)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|string|exists:products,name',
                'site' => 'nullable|integer|exists:sites,id',
                'type' => 'nullable|integer|exists:equipement_types,id',
                'status' => 'nullable|in:ALL,ONLINE,SPARE',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }

        if ($currentUser->hasProduct($system_type, $request->site)) {

            $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();

            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return back();
            if (isset($request->type) && !in_array($related_product->id, EquipementType::findOrFail($request->type)->products->pluck('id')->toArray()))
                return back();

            set_time_limit(300);
            ini_set('memory_limit', '-1');

            $equipements = null;

            $filter = [['id_product', '=', $related_product->id]];
            $status_filter = [];
            if ($request->site) {
                array_push($filter, ['id_site', '=', $request->site]);
            }
            if ($request->status) {
                if ($request->status == 'ALL') {
                    $status_filter = ['SPARE', 'ONLINE'];
                } else
                    $status_filter = [$request->status];
            } else {
                $status_filter = ['SPARE'];
            }

            if (isset($request->type)) {
                $this_models = EquipementModel::where('id_type', '=', $request->type)->get();
                $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                    ->whereIn('status', $status_filter)
                    ->whereIn('model', $this_models->pluck('id')->toArray())
                    ->where($filter)
                    ->get();
            } else {
                $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                    ->whereIn('status', $status_filter)
                    ->where($filter)
                    ->get();
            }

            if (count($equipements)) {
                view()->share('equipements', $equipements);
                $pdf = PDF::loadView('system.equipement.pdf_view', $equipements);
                return $pdf->download('equipements_' . $system_type . '.pdf');
            }
        }
        return back();
    }

    public function exportCSV(Request $request, $system_type)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|string|exists:products,name',
                'site' => 'nullable|integer|exists:sites,id',
                'type' => 'nullable|integer|exists:equipement_types,id',
                'status' => 'nullable|in:ALL,ONLINE,SPARE',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }
        if ($currentUser->hasProduct($system_type, $request->site)) {
            $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();

            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return back();
            if (isset($request->type) && !in_array($related_product->id, EquipementType::findOrFail($request->type)->products->pluck('id')->toArray()))
                return back();

            set_time_limit(300);
            $equipements = null;
            $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();

            $filter = [['id_product', '=', $related_product->id]];
            $status_filter = [];
            if ($request->site) {
                array_push($filter, ['id_site', '=', $request->site]);
            }
            if ($request->status) {
                if ($request->status == 'ALL') {
                    $status_filter = ['SPARE', 'ONLINE'];
                } else
                    $status_filter = [$request->status];
            } else {
                $status_filter = ['SPARE'];
            }
            if (isset($request->type)) {
                $this_models = EquipementModel::where('id_type', '=', $request->type)->get();
                $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                    ->whereIn('status', $status_filter)
                    ->whereIn('model', $this_models->pluck('id')->toArray())
                    ->where($filter)
                    ->get();
            } else {
                $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                    ->whereIn('status', $status_filter)
                    ->where($filter)
                    ->get();
            }

            $fileName = 'equipement_' . $system_type . '.csv';
            return Excel::download(new EquipementExport($equipements), $fileName);
        }
        return back();
    }

    public function index(Request $request, $system_type)
    {
        $currentUser = $request->user();

        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|string|exists:products,name',
                'site' => 'nullable|integer|exists:sites,id',
                'status' => 'nullable|in:ALL,ONLINE,SPARE',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        NotificationController::checkNotification($request);

        if ($currentUser->hasProduct($system_type, $request->site)) {
            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return abort(403);
            $product = Products::where('name', '=', $system_type)->firstOrFail();

            $filter = [['id_product', '=', $product->id]];
            $status_filter = [];
            if ($request->site) {
                array_push($filter, ['id_site', '=', $request->site]);
            }
            if ($request->status) {
                if ($request->status == 'ALL') {
                    $status_filter = ['SPARE', 'ONLINE'];
                } else
                    $status_filter = [$request->status];
            } else {
                $status_filter = ['SPARE'];
            }

            $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                ->where($filter)
                ->whereIn('status', $status_filter);

            $data = [
                'system_type' => Str::upper($system_type),
                'product_sites' => $product->getRelatedSites(),
                'selected_site' => $request->site,
                'equipements' => $equipements->paginate(5),
                'type' => '',
                'types' => $product->types,
                'type_id' => null,
                'status' => $request->status ?? 'SPARE',
                'products' =>  $currentUser->products(),
            ];


            return view("system.equipement.index")
                ->with($data);
        } else
            return abort(403);
    }

    public function create(Request $request)
    {
        return view('system.equipement.create');
    }

    public function store(Request $request)
    {
        $currentUser = $request->user();

        Validator::make($request->input(), [
            'type' => ['required', 'string', 'max:255', 'exists:equipement_types,id'],
            'model' => ['required', 'string', 'max:255', 'exists:equipement_models,id'],
            'description' => ['required', 'string', 'max:255'],
            'product' => 'required|integer|exists:products,id',
            'site' => 'required|integer|exists:sites,id',
            'alert_stock' => ['required', 'integer'],
            'status' => 'required|in:ONLINE,SPARE',
        ])->validate();

        $product = $currentUser->products()->where('id', '=', $request->product)->firstOrFail();
        $model = EquipementModel::findOrFail($request->model);
        $type = $model->type;

        if (
            $currentUser->hasProduct($product->name, $request->site)
            && $currentUser->hasSite($request->site)
            && $type->id == $request->type
            && in_array($product->id, $type->products->pluck('id')->toArray())
        ) {

            $equipement = Equipement::create([
                'model' => $request->model,
                'id_site' => $request->site,
                'id_product' => $product->id,
                'description' => $request->description,
                'alert_stock' => $request->alert_stock,
                'status' => $request->status,
            ]);

            $request->session()->flash('success', __('messages.You have created the equipment'));

            return redirect(route('system.equipement.index', $product->name));
        }

        return back()->with('error', __('messages.Unable to create this equipment'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($system_type, $id, Request $request)
    {
        $currentUser = $request->user();

        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|string|exists:products,name',
                'site' => 'nullable|integer|exists:sites,id',
                'status' => 'nullable|in:ALL,ONLINE,SPARE',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        NotificationController::checkNotification($request);

        $product = Products::where('name', '=', $system_type)->firstOrFail();
        $type = EquipementType::findOrFail($id);

        if (
            $currentUser->hasProduct($product->name, $request->site)
            && in_array($product->id, $type->products->pluck('id')->toArray())
        ) {
            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return abort(403);

            $this_models = EquipementModel::where('id_type', '=', $type->id)->get();

            $filter = [['id_product', '=', $product->id]];
            $status_filter = [];

            if ($request->site) {
                array_push($filter, ['id_site', '=', $request->site]);
            }
            if ($request->status) {
                if ($request->status == 'ALL') {
                    $status_filter = ['SPARE', 'ONLINE'];
                } else
                    $status_filter = [$request->status];
            } else {
                $status_filter = ['SPARE'];
            }

            $equipements = Equipement::whereIn('id_site', $currentUser->sites->pluck('id')->toArray())
                ->whereIn('model', $this_models->pluck('id')->toArray())
                ->where($filter)
                ->whereIn('status', $status_filter);

            $data = [
                'system_type' => Str::upper($system_type),
                'product_sites' => $product->getRelatedSites(),
                'selected_site' => $request->site,
                'equipements' => $equipements->paginate(5),
                'type_id' => $id,
                'type' => $product->types->find($id)->name,
                'types' => $product->types,

                'status' => $request->status ?? 'SPARE',
                'products' =>  $currentUser->products(),
                'status' => $request->status,
            ];

            return view('system.equipement.index', [
                'system_type' => Str::upper($system_type)
            ])->with($data);
        } else
            return abort(403);
    }

    public function edit($system_type, $id, Request $request)
    {
        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'equipement' => $id], [
                'product' => 'required|string|exists:products,name',
                'equipement' => 'required|integer|exists:equipements,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $equipement = Equipement::findOrFail($id);

        if (
            $currentUser->hasProduct($system_type)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            $product = Products::where('name', '=', $system_type)->firstOrFail();
            $sites = $product->getRelatedSites();
            return view(
                'system.equipement.edit',
                [
                    'system_type' => $product->name,
                    'equipement' => $equipement,
                    'equipement_types' => $product->types,
                    'equipement_models' => EquipementModel::find($equipement->model),
                    'sites' => $sites,
                    'products' =>  $currentUser->products(),
                ]
            );
        }

        return abort(403);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();

        Validator::make($request->input(), [
            'type' => ['required', 'integer', 'max:255', 'exists:equipement_types,id'],
            'model' => ['required', 'integer', 'max:255', 'exists:equipement_models,id'],
            'description' => ['required', 'string', 'max:255'],
            'site' => 'required|integer|exists:sites,id',
            'alert_stock' => ['required', 'integer'],
            'status' => 'required|in:ONLINE,SPARE',

        ])->validate();

        $equipement = Equipement::findOrFail($id);
        $product = Products::where('name', '=', $system_type)->firstOrFail();
        $model = EquipementModel::findOrFail($request->model);
        $type = $model->type;
        if (
            $currentUser->hasProduct($system_type, $request->site)
            && $currentUser->hasSite($request->site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
            && $type->id == $request->type
            && in_array($product->id, $type->products->pluck('id')->toArray())
        ) {

            $equipement->update([
                'id_site' => $request['site'],
                'model' => $request->model,
                'description' => $request['description'],
                'alert_stock' => $request['alert_stock'],
                'status' => $request['status'],

            ]);

            $request->session()->flash('success', __('messages.You have updated the equipment'));

            return redirect()->route('system.equipement.index', $system_type);
        } else {
            return back()->with('error', __('messages.You can not edited this equipment'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();
        $equipement = Equipement::findOrFail($id);

        if (
            $currentUser->hasProduct($system_type, $request->site)
            && $currentUser->hasSite($equipement->id_site)
            && $equipement->product->name == $system_type
        ) {

            try {
                if (EquipementDt::where('id_equipement', $id)->count() > 0)
                    return back()->with('error', __('messages.Unable to delete this equipment'));

                Equipement::destroy($id);
                return back()->with('success', __('messages.You have deleted this equipment'));
            } catch (QueryException $e) {
                return back()->with('error', __('messages.Unable to delete this equipment'));
            }
        }
        return abort(403);
    }


    public function move($system_type, $id, Request $request)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type, 'equipement' => $id]), [
                'product' => 'required|string|exists:products,name',
                'equipement' => 'required|integer|exists:equipements,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        $related_product = $currentUser->products()->where('name', '=', $system_type)->firstOrFail();
        //$sites = Products::where('name', '=', $system_type)->firstOrFail()->getRelatedSites()->pluck('id')->toArray();


        $equipement = Equipement::where('id_product', '=', $related_product->id)->findOrFail($id);
        $can_user = in_array($equipement->id_site, $currentUser->sites->pluck('id')->toArray());
        if ($related_product && $can_user) {
            $inputs = $request->except(['_token']);

            $dts = explode(',', $inputs['dts']);
            $inputs['dts'] = $dts;

            Validator::make($inputs, [
                'dts' => 'required|array',
                'dts.*' => 'required|integer|exists:equipement_dts,id',
                'site' => 'required|integer|exists:sites,id',
            ])->validate();
            $get_dts_equi_ids = EquipementDt::whereIn('id', $dts)->pluck('id_equipement')->toArray();

            //Check if user has the access to those DTS
            if (!in_array($id, $get_dts_equi_ids))
                return back();

            //dd(Products::where('name', '=', $system_type)->first()->sites);
            $suitable_user = ($currentUser->productsUsers($system_type, $request['site'])->where('id_role', '=', 2)->first());
            if (!$suitable_user) {
                return back()->with('error', __('messages.Unable to move those equipment details ! no suitable user'));
            }

            // try {

            $equipement_to_send = Equipement::where('id_product', '=', $related_product->id)
                ->where('id_site', '=', $request['site'])
                ->where('model', '=', $equipement->model)
                ->where('status', '=', $equipement->status)
                ->first();

            $equipement_id_to_send = null;
            $pendding = !in_array($request['site'], $currentUser->sites->pluck('id')->toArray());
            if (!$equipement_to_send && !$pendding) {
                $equipement_to_send = Equipement::create([
                    'model' => $equipement->model,
                    'id_site' => $request['site'],
                    'id_product' => $equipement->id_product,
                    'description' => $equipement->description,
                    //'id_product' => Products::where('name', '=', $system_type)->first('id')->id,
                    'alert_stock' => $equipement->alert_stock,
                    'status' => $equipement->status,
                ]);
                $equipement_id_to_send = $equipement_to_send->id;
                $datevar = $equipement_to_send->created_at;
            }
            if ($equipement_to_send) {
                $equipement_id_to_send = $equipement_to_send->id;
            }

            if (!$pendding) {
                $equi_dts = EquipementDt::whereIn('id', $inputs['dts'])->whereNotIn('id', DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray())->get();
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

                foreach ($equi_dts as $dt) {

                    // terminal
                    //$terminals = Products::find($equipement_to_send->id_product)->getSiteUserTerminals($equipement_to_send->id_site, $request['user']);
                    $terminals = User::findOrFail($request['user'])->getUserSiteTerminals($request['site'])->first()->id;
                    if ($terminals != null) {
                        $dt->update(['id_equipement' => $equipement_id_to_send, 'id_terminal' => $terminals]);
                    } else {
                        $dt->update(['id_equipement' => $equipement_id_to_send]);
                    }

                    $datevar = $dt->updated_at;

                    EquipmentDtHistory::create([
                        'id_equipement_dts' =>  $dt->id,
                        'messages' => ' Moved From [' . Site::find($equipement->id_site)->signifi . '] To  [' . Site::find($request['site'])->signifi . '] At [' . $datevar . ']',
                    ]);

                    if ($dt->wasChanged('id_equipement')) {

                        if ($dt->status == 'NOK')
                            $nok_count = $nok_count + 1;
                        else
                            $ok_count = $ok_count + 1;
                    }
                }
                //For Chart
                $CEH_receiver = ChartEquipmentHistory::whereMonth('created_at', '=', Carbon::now()->month)
                    ->whereYear('created_at', '=', Carbon::now()->year)
                    ->firstOrCreate(
                        [
                            'id_equipement' => $equipement_to_send->id,
                            'site' => $equipement_to_send->id_site
                        ]
                    );
                $CEH_receiver->update([
                    'ok_quantity' => $CEH_receiver->ok_quantity + $ok_count,
                    'nok_quantity' => $CEH_receiver->nok_quantity + $nok_count,
                ]);
                $CEH->update([
                    'ok_quantity' => $CEH->ok_quantity - $ok_count,
                    'nok_quantity' => $CEH->nok_quantity - $nok_count,
                ]);
            } else {

                $params = [
                    'sender_id' => $currentUser->id,
                    'receiver_id' => $request['user'],
                    'terminal_id' => User::findOrFail($request['user'])->getUserSiteTerminals($request['site'])->first()->id,
                    //'receiver_id' => $suitable_user->id,
                    'equipement_id' => $equipement->id,
                    'id_site' => $request['site'],
                ];

                $table = DB::table('pendding_transfer_equipement');
                $token = Str::random(60);
                $data = array();
                foreach ($inputs['dts'] as $id_equipement_dts) {
                    array_push($data, array_merge($params, ['id_equipement_dts' => $id_equipement_dts, 'token' => $token]));
                    $table->insert(array_merge($params, ['id_equipement_dts' => $id_equipement_dts, 'token' => $token]));
                }

                $job = (new SendTransferQueueEmail($suitable_user, $data, $currentUser->name, 'equipement'))
                    ->delay(
                        now()
                            ->addSeconds(2)
                    );

                dispatch($job);
            }
            return back()->with('success', __('messages.Equipment details has been moved!'));
            /*
            } catch (\Throwable $th) {
                return abort(403);
            }*/
        }
        return abort(403);
    }
    public function getTypes(Request $request, $system_type)
    {
        $currentUser = $request->user();
        $product = Products::findOrFail($system_type);
        if ($currentUser->hasProduct($product->name))
            return response()->json($product->types);
        return response('', 200);
    }
    public function getModels(Request $request, $system_type, $type)
    {
        $currentUser = $request->user();
        $product = Products::findOrFail($system_type);
        if (
            $currentUser->hasProduct($product->name)
            && in_array($type, $product->types->pluck('id')->toArray())
        )
            return response()->json(EquipementModel::where('id_type', '=', $type)->get());
        return response('', 200);
    }
    public function getProductSites(Request $request, $system_type)
    {
        $currentUser = $request->user();
        $product = Products::findOrFail($system_type);
        if ($currentUser->hasProduct($product->name))
            return response()->json($product->getRelatedSites());
        return response('', 200);
    }
    public function getUserProducts(Request $request)
    {
        return response()->json($request->user()->products);
    }
    /*public function getAllProducts(Request $request)
    {
        return response()->json(Products::all());
    }*/
    public function getUserTerminals(Request $request)
    {
        return response()->json($request->user()->terminals);
    }
    public function getProductTerminals(Request $request, $system_type, $site)
    {
        $currentUser = $request->user();
        $product = Products::findOrFail($system_type);
        if ($currentUser->hasProduct($product->name, $site))
            return $product->getUserProductTerminals($site);
        return response('', 200);
    }
    public function getSiteUserTerminals(Request $request, $system_type, $site, $user)
    {
        $currentUser = $request->user();
        $product = Products::where('name', '=', $system_type)->firstOrFail();
        if ($currentUser->hasProduct($product->name, $site))
            return $product->getSiteUserTerminals($site, $user);
        return response('', 200);
    }
    public function getUsersBySite(Request $request, $system_type, $site)
    {
        $currentUser = $request->user();
        $product = Products::where('name', '=', $system_type)->firstOrFail();
        if ($currentUser->hasProduct($product->name, $site))
            return $product->getUsersBySites($site);
        return response('', 200);
    }
}