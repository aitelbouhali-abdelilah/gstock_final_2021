<?php

namespace App\Http\Controllers\System\config;

use App\Http\Controllers\ColectionPaginate;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\PieceList;
use App\Models\Products;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SpareConsoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $system_type)
    {
        try {
            Validator::make(array_merge($request->input(), ['product' => $system_type]), [
                'product' => 'required|string|exists:products,name',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        NotificationController::checkNotification($request);
        return view('system.config.spare_and_conso.index')
            ->with([
                'piecelists' => Products::findOrFail(Products::where('name', '=', $system_type)->firstOrFail('id')->id)->piecelists()->paginate(5),
                'system_type' => $system_type,
                'products' => Products::all(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('system.config.spare_and_conso.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $system_type = Products::firstOrFail()->name;

        $inputs = $request->except(['_token']);

        Validator::make($inputs, [
            'reference' => 'required',
            'designation' => 'required',
            'supplier' => 'required',
            'products' => 'required|array',
            'products.*' => 'required|exists:products,id',
        ])->validate();

        $piecelist = PieceList::create([
            'ref_piece' => $request['reference'],
            'designation' => $request['designation'],
            'supplier' => $request['supplier'],
            'selection' => $request['reference'] . '-' . $request['designation'],
        ]);
        $piecelist->products()->sync($request->products);
        $request->session()->flash('success', __('messages.You have created the consumable'));
        return redirect()->route('system.config.spare_and_conso.index', $system_type);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($system_type, $consumable_name)
    {
        try {
            Validator::make(['product' => $system_type, 'consumable_name' => $consumable_name], [
                'product' => 'required|string|exists:products,name',
                'consumable_name' => 'nullable|string',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        return view('system.config.spare_and_conso.index')
            ->with([
                'piecelists' => Products::findOrFail(Products::where('name', '=', $system_type)->firstOrFail('id')->id)->piecelists()->where('ref_piece', 'LIKE', '%' . $consumable_name . '%')->paginate(5),
                'system_type' => Str::upper($system_type),
                'products' => Products::all(),
                'product' => '',
                'search_word' => $consumable_name,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($system_type, $id)
    {
        try {
            Validator::make(['product' => $system_type, 'piecelist' => $id], [
                'product' => 'required|string|exists:products,name',
                'piecelist' => 'required|integer|exists:piece_lists,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        return view('system.config.spare_and_conso.edit', [
            'piecelist' => PieceList::findOrFail($id),
            'system_type' => Str::upper($system_type),
            'products' => Products::all(),

        ]);
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
        $inputs = $request->except(['_token']);

        Validator::make(array_merge($request->input(), ['product' => $system_type, 'piecelist' => $id]), [
            'product' => 'required|string|exists:products,name',
            'piecelist' => 'required|integer|exists:piece_lists,id',
            'ref_piece' => 'required',
            'designation' => 'required',
            'supplier' => 'required',
            'products' => 'required|array',
            'products.*' => 'required|exists:products,id',
        ])->validate();


        $piece_list = PieceList::findOrFail($id);
        if (!$piece_list || $request->products == null) {
            $request->session()->flash('error', __('messages.Unable to update the consumable'));
            return redirect()->route('system.config.spare_and_conso.index', $system_type);
        }
        $piece_list->update($request->all());
        $piece_list->products()->sync($request->products);
        $request->session()->flash('success', __('messages.You have updated the consumable'));
        return redirect()->route('system.config.spare_and_conso.index', $system_type);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $system_type, $id)
    {
        try {
            Validator::make(['product' => $system_type, 'piecelist' => $id], [
                'product' => 'required|string|exists:products,name',
                'piecelist' => 'required|integer|exists:piece_lists,id',
            ])->validated();
            $deleted = PieceList::destroy($id);

            if ($deleted) {
                $request->session()->flash('success', __('messages.You have deleted this consumable'));
            } else {
                $request->session()->flash('error', __('messages.Unable to delete this consumable'));
            }
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this consumable'));
        }
        return redirect()->route('system.config.spare_and_conso.index', $system_type);
    }
}