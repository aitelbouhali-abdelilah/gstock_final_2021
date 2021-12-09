<?php

namespace App\Http\Controllers\System;

use App\Exports\PieceExport;
use App\Models\Piece;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Jobs\SendQueueEmail;
use App\Jobs\SendTransferQueueEmail;
use App\Models\ChartConsumableHistory;
use App\Models\ConsumableHistory;
use App\Models\PieceList;
use App\Models\Products;
use App\Models\Site;
use App\Models\Terminal;
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
use Illuminate\Database\QueryException;

class PieceController extends Controller
{

    public function exportPDF(Request $request, $system_type)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|exists:products,name',
                'site' => 'nullable|exists:sites,id',
                'ter' => 'nullable|exists:terminals,id',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }
        if ($currentUser->hasProduct($system_type, $request->site)) {
            $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();
            $related_user_terminal = $currentUser->terminals->pluck('id')->toArray();
            $related_terminal_to_product = Products::where('name', '=', Str::upper($system_type))->firstOrFail()->terminals;
            $related_sites = Products::where('name', '=', Str::upper($system_type))->firstOrFail()->getRelatedSites()->pluck('id')->toArray();

            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return back();
            if (isset($request->ter) && (!in_array($request->ter, $related_user_terminal) || !in_array($request->ter, $related_terminal_to_product->pluck('id')->toArray())))
                return back();
            set_time_limit(300);
            ini_set('memory_limit', '-1');

            $pieces = null;

            if ($request->site && $request->ter) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->where('id_site', '=', $request->site)
                    ->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals(Auth::user()->sites->where('id', '=', $request->site)->first()->id)->pluck('id'))
                    ->where('id_terminal', '=', $request->ter)
                    ->whereIn('id_terminal', $related_user_terminal)
                    ->get();
            } else if ($request->site && !isset($request->ter)) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->where('id_site', '=', $request->site)
                    ->get();
            } else if (!isset($request->site) && !isset($request->ter)) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->whereIn('id_terminal', $related_user_terminal)
                    ->get();
            }

            if (count($pieces)) {
                view()->share('pieces', $pieces);
                $pdf = PDF::loadView('system.rechange_and_conso.pdf_view', $pieces);
                $pdf->setPaper('A4');
                return $pdf->download('piece_list_' . $system_type . '.pdf');
            }
        }
        return back();
    }


    public function exportCSV(Request $request, $system_type)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|exists:products,name',
                'site' => 'nullable|exists:sites,id',
                'type' => 'nullable|exists:equipement_types,id',
                'status' => 'nullable|in:ALL,ONLINE,SPARE',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }

        if ($currentUser->hasProduct($system_type, $request->site)) {
            $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();
            $related_user_terminal = $currentUser->terminals->pluck('id')->toArray();
            $related_terminal_to_product = Products::where('name', '=', Str::upper($system_type))->firstOrFail()->terminals;
            $related_sites = Products::where('name', '=', Str::upper($system_type))->firstOrFail()->getRelatedSites()->pluck('id')->toArray();

            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return back();
            if (isset($request->ter) && (!in_array($request->ter, $related_user_terminal) || !in_array($request->ter, $related_terminal_to_product->pluck('id')->toArray())))
                return back();
            set_time_limit(300);
            $pieces = null;
            if ($request->site && $request->ter) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->where('id_site', '=', $request->site)
                    ->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals(Auth::user()->sites->where('id', '=', $request->site)->first()->id)->pluck('id'))
                    ->where('id_terminal', '=', $request->ter)
                    ->whereIn('id_terminal', $related_user_terminal)
                    ->get();
            } else if ($request->site && !isset($request->ter)) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->where('id_site', '=', $request->site)
                    ->get();
            } else if (!isset($request->site) && !isset($request->ter)) {
                $pieces = Piece::whereIn('id_site', $related_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->whereIn('id_terminal', $related_user_terminal)
                    ->get();
            }

            if (count($pieces)) {
                $fileName = 'piece_list_' . $system_type . '.csv';
                return Excel::download(new PieceExport($pieces), $fileName);
            }
        }
        return back();
    }


    public function exportPDFHistory($system_type, $piece)
    {
        try {
            Validator::make(array_merge(['piece_id' => $piece]), [
                'piece_id' => 'required|exists:pieces,id',
            ])->validate();
        } catch (\Throwable $th) {
            return back();
        }
        set_time_limit(300);
        $related_piece = Piece::where('system_type', '=', Str::upper($system_type))->findOrFail($piece);
        $piece_history = ConsumableHistory::where([
            ['piece_id', '=', $related_piece->id],
        ])->get();

        view()->share([
            'piece_history' => $piece_history,
            'piece' => $related_piece,
        ]);
        $pdf = PDF::loadView('system.rechange_and_conso.pdf_view_history', $piece_history);
        return $pdf->download('History_' . $related_piece->part_number . '.pdf');
        return back();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $system_type)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|exists:products,name',
                'site' => 'nullable|exists:sites,id',
                'ter' => 'nullable|exists:terminals,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        $related_terminal = Products::where('name', '=', $system_type)->firstOrFail()->getUserProductALLTerminals();
        $related_product = $currentUser->products()->where('name', '=', Str::upper($system_type))->firstOrFail();

        NotificationController::checkNotification($request);
        if ($currentUser->hasProduct($system_type, $request->site)) {
            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return abort(403);
            if ($request->ter && !in_array($request->ter, $related_terminal->pluck('id')->toArray()))
                return abort(403);

            $product = Products::where('name', '=', $system_type)->firstOrFail();
            $product_sites = $product->getRelatedSites()->pluck('id')->toArray();
            $pieces = null;
            if ($request->site && in_array($request->site, $product_sites)) {
                $related_terminal = Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($currentUser->sites->where('id', '=', $request->site)->first()->id);
                $pieces = Piece::whereIn('id_site', $product_sites)
                    ->where('id_site', '=', $request->site)
                    ->where('id_product', '=', $related_product->id)
                    ->whereNotIn('id', DB::table('pendding_transfer_consumable')->select('id_consumable')->distinct()->pluck('id_consumable')->toArray())
                    ->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($currentUser->sites->where('id', '=', $request->site)->first()->id)->pluck('id'));

                if ($request->ter && in_array($request->ter, $related_terminal->pluck('id')->toArray())) {
                    $pieces = Piece::whereIn('id_site', $product_sites)
                        ->where('id_site', '=', $request->site)
                        ->where('id_product', '=', $related_product->id)
                        ->whereNotIn('id', DB::table('pendding_transfer_consumable')->select('id_consumable')->distinct()->pluck('id_consumable')->toArray())
                        ->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($currentUser->sites->where('id', '=', $request->site)->first()->id)->pluck('id'))
                        ->where('id_terminal', '=', $request->ter);
                }
            } else {
                $pieces = Piece::whereIn('id_site', $product_sites)
                    ->where('id_product', '=', $related_product->id)
                    ->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductALLTerminals()->pluck('id'));
            }

            $data = [
                'system_type' => Str::upper($system_type),
                'pieces' => $pieces->paginate(5),
                'product_sites' => $product->getRelatedSites(),
                'selected_site' => $request->site,
                'sites' => Site::all(),
                'pieceref' => '',
                'piecerefs' => PieceList::all()->where('system_type', '=', Str::upper($system_type)),
                'products' =>  $currentUser->products(),
                'terminals' => Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($request->site),
                'selected_terminal' => $request->ter,
            ];
            return view('system.rechange_and_conso.index')
                ->with($data);
        } else
            return abort(403);
    }


    public function store(Request $request)
    {
        $currentUser = $request->user();
        $id_product = $request['product'];
        $inputs = $request->except(['_token']);
        Validator::make($request->input(), [
            'stock' => 'required|numeric|gt:-1',
            'piece' => ['required', 'exists:piece_lists,id'],
            'part' => ['required', 'string', 'unique:pieces,part_number'],
            'product' => 'required|exists:products,id',
            'site' => 'required|exists:sites,id',
            'alert_stock' => 'required|numeric|gt:-1',
            'terminal' => 'required',
        ])->validate();
        $related_product_terminal = Products::where('id', '=', $id_product)->firstOrFail()->terminals;
        $related_user_terminal = $currentUser->terminals;
        $product = $currentUser->products()->where('id', '=', $id_product)->firstOrFail();

        if (
            $currentUser->hasProduct($product->name, $request->site)
            && $currentUser->hasSite($request->site)
            && $currentUser->hasTerminal($request->terminal)
            && in_array($request->terminal, $related_user_terminal->pluck('id')->toArray())
            && in_array($request->terminal, $related_product_terminal->pluck('id')->toArray())
        ) {

            $piece = Piece::create([
                'id_site' => $request['site'],
                'stock' => $request['stock'],
                'id_product' => $product->id,
                'id_piece_lists' => $request['piece'],
                'part_number' => $request['part'],
                'system_type' => Str::upper($product->name),
                'alert_stock' => $request['alert_stock'],
                'id_terminal' => $request['terminal'],

            ]);
            if ($piece) {
                //For Chart
                ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
                    ->whereYear('created_at', '=', Carbon::now()->year)
                    ->firstOrCreate(
                        [
                            'piece_id' => $piece->id,
                            'site' => $piece->id_site
                        ],
                        [
                            'quantity' => $piece->stock
                        ]
                    );
            }
            $piece->products()->sync($product->id);
            $request->session()->flash('success', __('messages.You have created the Consomable'));
            return redirect(route('system.rechange_and_conso.index', $product->name));
        }
        return back()->with('error', __('messages.Unable to create this Consomable'));
    }

    public function create(Request $request)
    {
        return view('system.rechange_and_conso.create');
    }

    public function show($system_type, $id, Request $request)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|exists:products,name',
                'site' => 'nullable|exists:sites,id',
                'ter' => 'nullable|exists:terminals,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        $related_terminal = Products::where('name', '=', $system_type)->firstOrFail()->getUserProductALLTerminals();

        NotificationController::checkNotification($request);
        if ($currentUser->hasProduct($system_type, $request->site)) {
            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return abort(403);
            if ($request->ter && !in_array($request->ter, $related_terminal->pluck('id')->toArray()))
                return abort(403);
            $product = Products::where('name', '=', $system_type)->firstOrFail();
            $product_sites = $product->getRelatedSites()->pluck('id')->toArray();
            $pieces = null;
            if ($request->site && in_array($request->site, $product_sites)) {
                $related_terminal = Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($currentUser->sites->where('id', '=', $request->site)->first()->id);
                $pieces = Piece::with('piecelist')
                    ->where([
                        ['id_piece_lists', '=', $id],
                        ['system_type', '=', Str::upper($system_type)],
                        ['id_site', '=', $request['site']],
                        ['id_product', '=', $product->id],
                    ])->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($currentUser->sites->where('id', '=', $request->site)->first()->id)->pluck('id'));


                if ($request->ter && in_array($request->ter, $related_terminal->pluck('id')->toArray())) {
                    $pieces = Piece::with('piecelist')
                        ->where([
                            ['id_piece_lists', '=', $id],
                            ['system_type', '=', Str::upper($system_type)],
                            ['id_site', '=', $request['site']],
                            ['id_product', '=', $product->id],
                            ['id_terminal', '=', $request->ter],
                        ])->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals(Auth::user()->sites->where('id', '=', $request->site)->first()->id)->pluck('id'));
                }
            } else {
                $pieces = Piece::with('piecelist')
                    ->where([
                        ['id_piece_lists', '=', $id],
                        ['system_type', '=', Str::upper($system_type)],
                        ['id_site', '=', $request['site']],
                        ['id_product', '=', $product->id],
                    ])->whereIn('id_terminal', Products::where('name', '=', $system_type)->firstOrFail()->getUserProductALLTerminals()->pluck('id'));
            }
            $data = [
                'system_type' => Str::upper($system_type),
                'pieces' => $pieces->paginate(5),
                'pieceref' => PieceList::find($id)->selection,
                'piecerefs' => PieceList::all()->where('system_type', '=', Str::upper($system_type)),
                'products' =>  $currentUser->products(),
                'terminals' => Products::where('name', '=', $system_type)->firstOrFail()->getUserProductTerminals($request->site),
                'selected_terminal' => $request->ter,
                'sites' => Site::all(),
                'product_sites' => $product->getRelatedSites(),
                'selected_site' => $request->site,
            ];

            return view('system.rechange_and_conso.index', [
                'system_type' => Str::upper($system_type),

            ])->with($data);
        } else
            return abort(403);
    }


    public function update(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();

        Validator::make($request->input(), [
            'stock' => ['required', 'numeric', 'min:0'],
            'piece' => ['required', 'exists:piece_lists,id'],
            'system_type' => Str::upper($system_type),
            'part' => ['required', 'string'],
            'site' => 'required|exists:sites,id',
            'alert_stock' => ['required', 'integer'],
            'terminal' => 'required',
        ])->validate();
        $related_product = $currentUser->products()->where('name', '=', $system_type)->firstOrFail();
        $product = Products::where('name', '=', $system_type)->firstOrFail();
        $sites = $product->getRelatedSites()->pluck('id')->toArray();
        $product_sites = $product->getRelatedSites()->pluck('id')->toArray();
        $piece = Piece::where('system_type', '=', Str::upper($system_type))->whereIn('id_site', $product_sites)->findOrFail($id);
        $pieceTemp = Piece::where('system_type', '=', Str::upper($system_type))->whereIn('id_site', $product_sites)->findOrFail($id);
        $related_product_terminal = $product->terminals;
        $related_user_terminal = $currentUser->terminals;
        if (
            $currentUser->hasProduct($system_type, $request->site)
            && $currentUser->hasSite($request->site)
            && $currentUser->hasSite($piece->id_site)
            && $piece->product->name == $system_type
            && in_array($request->terminal, $related_user_terminal->pluck('id')->toArray())
            && in_array($request->terminal, $related_product_terminal->pluck('id')->toArray())
        ) {
            $inputs = $request->except(['_token']);

            if (isset($request->site) && !$currentUser->hasSite($request->site))
                return abort(403);
            if ($request->ter && !(in_array($request->ter, $related_user_terminal->pluck('id')->toArray()) || in_array($request->ter, $related_product_terminal->pluck('id')->toArray())))
                return abort(403);

            if (!$piece || !in_array($request->terminal, $related_user_terminal->pluck('id')->toArray()) || !in_array($request->terminal, $related_product_terminal->pluck('id')->toArray())) {
                $request->session()->flash('error', __('messages.You can not edited this equipment'));
            } else {
                $piece->update([
                    'system_type' => Str::upper($system_type),
                    'id_site' => $request['site'],
                    'stock' => $request['stock'],
                    'id_piece_lists' => $request['piece'],
                    'part_number' => $request['part'],
                    'alert_stock' => $request['alert_stock'],
                    'id_terminal' => $request['terminal'],

                ]);
            }

            if ($piece->wasChanged('id_site')) {
                $this->UpdateHistory($piece, $pieceTemp, 'id_site');
            }
            if ($piece->wasChanged('id_piece_lists')) {
                $this->UpdateHistory($piece, $pieceTemp, 'id_piece_lists');
            }
            if ($piece->wasChanged('id_terminal')) {
                $this->UpdateHistory($piece, $pieceTemp, 'id_terminal');
            }
            if ($piece->wasChanged('stock')) {
                $this->UpdateHistory($piece, $pieceTemp, 'stock');
                //For Chart
                $CEH = ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
                    ->whereYear('created_at', '=', Carbon::now()->year)
                    ->firstOrCreate(
                        [
                            'piece_id' => $piece->id,
                            'site' => $piece->id_site
                        ],
                        []
                    );
                $CEH->update(['quantity' => $piece->stock]);
            }
            if ($piece->wasChanged('part_number')) {
                $this->UpdateHistory($piece, $pieceTemp, 'part_number');
            }
            if ($piece->wasChanged('alert_stock')) {
                $this->UpdateHistory($piece, $pieceTemp, 'alert_stock');
            }

            $pieceTemp = null;


            $userSchema = $currentUser->productsUsers($system_type, $request['site'])->where('id_role', '=', 2);

            // echo (Piece::find($id)->alert_stock >= Piece::find($id)->stock);
            if (($piece->alert_stock >= $piece->stock)) {

                $data = ['id' => $piece->id, 'type' => 'piece'];
                Notification::send($userSchema, new StockNotification($data));

                $job = (new SendQueueEmail($data, $userSchema))
                    ->delay(
                        now()
                            ->addSeconds(2)
                    );

                dispatch($job);
            }

            $request->session()->flash('success', __('messages.You have updated the Consomable'));
            return redirect()->route('system.rechange_and_conso.index', $system_type);
        } else {
            return back()->with('error', __('messages.You can not edited this Consomable'));
        }
    }

    public function edit($system_type, $id, Request $request)
    {

        $currentUser = $request->user();
        try {
            Validator::make(['product' => $system_type, 'piece' => $id], [
                'product' => 'required|exists:products,name',
                'piece' => 'required|exists:pieces,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        $product = Products::where('name', '=', $system_type)->firstOrFail();
        //$related_product = $currentUser->products()->where('name', '=', $system_type)->firstOrFail();
        //$related_terminal = $product->getUserProductAllTerminals()->firstOrFail();
        $piece = Piece::where('system_type', '=', Str::upper($system_type))->findOrFail($id);
        if (
            $currentUser->hasProduct($system_type)
            && $currentUser->hasSite($piece->id_site)
            && $piece->product->name == Str::upper($system_type)
        ) {
            $sites = $product->getRelatedSites();
            return view(
                'system.rechange_and_conso.edit',
                [
                    'system_type' => Str::upper($system_type),
                    'piece' => $piece,
                    'piecelists' => Products::find(Products::where('name', '=', $system_type)->first('id')->id)->piecelists,
                    'sites' => $sites,
                    'products' =>  $currentUser->products(),
                    'terminals' => $product->getUserProductTerminals($piece->id_site),
                    'selected_terminal' => $piece->id_terminal,

                ]
            );
        }
        return abort(403);
    }

    public function destroy(Request $request, $system_type, $id)
    {
        $currentUser = $request->user();
        $piece = Piece::where('system_type', '=', Str::upper($system_type))->findOrFail($id);

        if (
            $currentUser->hasProduct($system_type, $request->site)
            && $currentUser->hasSite($piece->id_site)
            && $piece->product->name == $system_type
        ) {
            try {
                if ($piece->stock > 0)
                    return back()->with('error', __('messages.Unable to delete this Consomable'));

                Piece::destroy($id);
                return back()->with('success', __('messages.You have deleted this Consomable'));
            } catch (QueryException $e) {
                return back()->with('error', __('messages.Unable to delete this Consomable'));
            }
        }
        return abort(403);
    }

    public function getPiecesList(Request $request, $system_type)
    {
        return response()->json(Products::find($system_type)->piecelists);
    }

    public static function UpdateHistory($piece, $pieceTemp, $field)
    {
        $from = $pieceTemp->$field;
        $to = $piece->$field;
        if ($field == 'id_site') {
            $from = Site::find($pieceTemp->$field)->signifi;
            $to = Site::find($piece->$field)->signifi;
            $field = "Site";
        }
        if ($field == 'id_terminal') {
            $from = Terminal::find($pieceTemp->id_terminal)->name;
            $to = Terminal::find($piece->id_terminal)->name;
            $field = "Terminal";
        }
        if ($field == 'id_piece_lists') {
            $from = PieceList::find($pieceTemp->$field)->ref_piece;
            $to = PieceList::find($piece->$field)->ref_piece;
            $field = "Piece Ref";
        }

        ConsumableHistory::create([
            'piece_id' => $piece->id,
            'messages' => '[' . $field . '] Updated  From : [' . $from . '] To : [' . $to . '] At [' . $piece->getChanges()['updated_at'] . ']',
        ]);
    }

    public function move($system_type, $id, Request $request)
    {
        $currentUser = $request->user();
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type, 'piece' => $id]), [
                'product' => 'required|exists:products,name',
                'piece' => 'required|exists:pieces,id',
            ])->validate();

            $piece = Piece::where('system_type', '=', Str::upper($system_type))->findOrFail($id);
            $related_product = $currentUser->products()->where('name', '=', $system_type)->firstOrFail();
            if ($related_product) {
                $product = Products::where('name', '=', $system_type)->firstOrFail();
                $sites = $product->getRelatedSites();
                try {
                    Validator::make($request->except(['token']), [
                        'stock' => 'required|numeric|min:1',
                        'site' => 'required|exists:sites,id',
                        'user' => 'required|exists:users,id',
                        'terminal' => 'required|exists:terminals,id',
                    ])->validate();
                } catch (\Throwable $th) {
                    return abort(403);
                }
                if (($piece->stock - $request['stock']) < 0) {
                    return back()->with('error', __('messages.Unable to move this consumable ! not enough quantity'));
                }
                $suitable_user = ($currentUser->productsUsers($system_type, $request['site'])->where('id_role', '=', 2)->where('id', '=', $request['user'])->first());
                if (!$suitable_user) {
                    return back()->with('error', __('messages.Unable to move this consumable ! no suitable user'));
                }

                $consumable_to_send = Piece::where('system_type', '=', $system_type)
                    ->where('id_site', '=', $request['site'])
                    ->where('id_piece_lists', '=', $piece->id_piece_lists)
                    ->where('id_product', '=', $piece->id_product)
                    ->where('part_number', '=', $piece->part_number)
                    ->whereIn('id_terminal', $currentUser->terminals->pluck('id'))
                    ->where('id_terminal', '=', $request['terminal'])
                    ->first();
                $pendding = !in_array($request['site'], $currentUser->sites->pluck('id')->toArray());
                if (!$consumable_to_send && !$pendding) {
                    $consumable_to_send = Piece::create([
                        'id_site' => $request['site'],
                        'stock' => $request['stock'],
                        'id_product' => $piece->id_product,
                        'id_piece_lists' => $piece->id_piece_lists,
                        'part_number' => $piece->part_number,
                        'system_type' => Str::upper($system_type),
                        'alert_stock' => $piece->alert_stock,
                        'id_terminal' => $request['terminal'],

                    ]);
                    $piece->update(['stock' => ($piece->stock - $request['stock'])]);
                    $datevar = $consumable_to_send->created_at;
                    $id_new_consumable = $consumable_to_send->id;
                } else if ($consumable_to_send && !$pendding) {
                    $consumable_to_send->update([
                        'stock' => ($request['stock'] + $consumable_to_send->stock),
                    ]);
                    $piece->update(['stock' => ($piece->stock - $request['stock'])]);
                    $datevar = $piece->updated_at;
                    $id_new_consumable = $consumable_to_send->id;
                }

                if (!$pendding) {
                    if (($piece->alert_stock >= $piece->stock)) {
                        $userSchema = ($currentUser->findOrFail($request->user)->productsUsers($system_type, $request['site'])->where('id_role', '=', 2));

                        $data = ['id' => $piece->id, 'type' => 'piece'];
                        Notification::send($userSchema, new StockNotification($data));

                        $job = (new SendQueueEmail($data, $userSchema))
                            ->delay(
                                now()
                                    ->addSeconds(2)
                            );

                        dispatch($job);
                    }
                    ConsumableHistory::create([
                        'piece_id' => $piece->id,
                        'messages' => '[Quantity] of [' . $request['stock'] . '] Moved From [' . Site::find($piece->id_site)->signifi . '],Terminal: [' . Terminal::find($piece->id_terminal)->name . '] To  [' . Site::find($request['site'])->signifi . '],Terminal: [' . Terminal::find($request->terminal)->name . '] At [' . $datevar . ']',
                    ]);
                    ConsumableHistory::create([
                        'piece_id' => $id_new_consumable,
                        'messages' => '[Quantity] of [' . $request['stock'] . '] Received in  [' . Site::find($request['site'])->signifi . '],Terminal: [' . Terminal::find($request->terminal)->name . '] From [' . Site::find($piece->id_site)->signifi . '],Terminal: [' . Terminal::find($piece->id_terminal)->name . '] At [' . $datevar . ']',
                    ]);
                    //return $consumable_to_send->id;
                    //For Chart
                    $CEH = ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
                        ->whereYear('created_at', '=', Carbon::now()->year)
                        ->firstOrCreate(
                            [
                                'piece_id' => $piece->id,
                                'site' => $piece->id_site
                            ],
                            []
                        );
                    $CEH->update(['quantity' => $piece->stock]);
                    //Receiver
                    $CEH_receiver = ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
                        ->whereYear('created_at', '=', Carbon::now()->year)
                        ->firstOrCreate(
                            [
                                'piece_id' => $consumable_to_send->id,
                                'site' => $consumable_to_send->id_site
                            ],
                            []
                        );
                    $CEH_receiver->update(['quantity' => $consumable_to_send->stock]);
                } else {
                    $piece->update(['stock' => ($piece->stock - $request['stock'])]);
                    $params = [
                        'sender_id' => Auth::user()->id,
                        'receiver_id' =>  $request['user'],
                        'id_consumable' => $piece->id,
                        'quantity' => $request['stock'],
                        'id_site' => $request['site'],
                        'id_terminal' => $request['terminal'],
                        'token' => Str::random(60),
                    ];
                    $table = DB::table('pendding_transfer_consumable');
                    $table->insert($params);
                    $job = (new SendTransferQueueEmail($suitable_user, $params, $currentUser->name, 'consumable'))
                        ->delay(
                            now()
                                ->addSeconds(2)
                        );

                    dispatch($job);
                }

                return back()->with('success', __('messages.Consumable has been moved!'));
            }
        } catch (\Throwable $th) {
            return abort(403);
        }
        return abort(403);
    }
    public function moveAccept(Request $request, $move_id)
    {
        $table = DB::table('pendding_transfer_consumable')->where('id', '=', $move_id)->where('receiver_id', '=', Auth::user()->id);
        $this->moveAcceptBody($table);
        return back()->with('success', __('messages.Consumable has been moved!'));
    }
    public function moveAcceptByToken($token)
    {
        $table = DB::table('pendding_transfer_consumable')->where('token', '=', $token);
        if ($table->count()) {
            $this->moveAcceptBody($table);
            return view('transfer.success', ['message' => 'Consumable has been moved!']);
        }
        return view('transfer.error', ['message' => 'Not a valid token!']);
    }
    public function moveRefuse(Request $request, $move_id)
    {
        $table = DB::table('pendding_transfer_consumable')->where('id', '=', $move_id)->where('receiver_id', '=', Auth::user()->id);
        $piece = Piece::findOrFail($table->first()->id_consumable);
        $piece->update(['stock' => ($piece->stock + $table->first()->quantity)]);
        $table->delete();
        return back()->with('success', __('messages.Consumable has been refused!'));
    }
    public function moveRefuseByToken($token)
    {
        $table = DB::table('pendding_transfer_consumable')->where('token', '=', $token);

        if ($table->count()) {
            $piece = Piece::findOrFail($table->first()->id_consumable);
            $piece->update(['stock' => ($piece->stock + $table->first()->quantity)]);
            $table->delete();
            return view('transfer.success', ['message' => 'Consumable has been refused!']);
        }
        return view('transfer.error', ['message' => 'Not a valid token!']);
    }
    private function moveAcceptBody($table)
    {

        $piece = Piece::findOrFail($table->first()->id_consumable);
        $consumable_to_send = Piece::where('system_type', '=', $piece->system_type)
            ->where('id_site', '=', $table->first()->id_site)
            ->where('id_piece_lists', '=', $piece->id_piece_lists)
            ->where('id_product', '=', $piece->id_product)
            ->where('part_number', '=', $piece->part_number)
            ->whereIn('id_terminal', Auth::user()->terminals->pluck('id'))
            ->where('id_terminal', '=', $table->first()->id_terminal)
            ->first();

        if (!$consumable_to_send) {
            $consumable_to_send = Piece::create([
                'id_site' => $table->first()->id_site,
                'stock' => $table->first()->quantity,
                'id_product' => $piece->id_product,
                'id_piece_lists' => $piece->id_piece_lists,
                'part_number' => $piece->part_number,
                'system_type' => Str::upper($piece->system_type),
                'alert_stock' => $piece->alert_stock,
                'id_terminal' => $table->first()->id_terminal,

            ]);
            $datevar = $consumable_to_send->created_at;
            $id_consumable_to_send = $consumable_to_send->id;
        } else if ($consumable_to_send) {
            $consumable_to_send->update([
                'stock' => ($table->first()->quantity + $consumable_to_send->stock),
            ]);
            $datevar = $consumable_to_send->updated_at;
            $id_consumable_to_send = $consumable_to_send->id;
        }
        //dd($consumable_to_send);
        ChartConsumableHistory::create([
            'system_type' => $piece->system_type,
            'site' => $piece->id_site,
            'stock' => - ($table->first()->quantity),
            'ref_piece' => $piece->id_piece_lists,
            'piece_id' => $piece->id,

        ]);

        if (($piece->alert_stock >= $piece->stock)) {
            $userSchema = (Auth::user()->productsUsers($piece->system_type, $table->first()->id_site)->where('id_role', '=', 2));

            $data = ['id' => $piece->id, 'type' => 'piece'];
            Notification::send($userSchema, new StockNotification($data));

            $job = (new SendQueueEmail($data, $userSchema))
                ->delay(
                    now()
                        ->addSeconds(2)
                );

            dispatch($job);
        }
        ConsumableHistory::create([
            'piece_id' => $piece->id,
            'messages' => '[Quantity] of [' . $table->first()->quantity . '] Moved From [' . Site::find($piece->id_site)->signifi . '],Terminal: [' . Terminal::find($piece->id_terminal)->name . '] To  [' . Site::find($table->first()->id_site)->signifi . '],Terminal: [' . Terminal::find($table->first()->id_terminal)->name . '] At [' . $datevar . ']',
        ]);
        ConsumableHistory::create([
            'piece_id' => $id_consumable_to_send,
            'messages' => '[Quantity] of [' . $table->first()->quantity  . '] Received in [' . Site::find($table->first()->id_site)->signifi . '],Terminal: [' . Terminal::find($table->first()->id_terminal)->name . '] From [' .  Site::find($piece->id_site)->signifi . '],Terminal: [' . Terminal::find($piece->id_terminal)->name . '] At [' . $datevar . ']',
        ]);

        //For Chart
        $CEH = ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->firstOrCreate(
                [
                    'piece_id' => $piece->id,
                    'site' => $piece->id_site
                ],
                []
            );
        $CEH->update(['quantity' => $piece->stock]);
        //Receiver
        $CEH_receiver = ChartConsumableHistory::whereMonth('created_at', '=', Carbon::now()->month)
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->firstOrCreate(
                [
                    'piece_id' => $consumable_to_send->id,
                    'site' => $consumable_to_send->id_site
                ],
                []
            );
        $CEH_receiver->update(['quantity' => $consumable_to_send->stock]);

        $table->delete();
    }
}