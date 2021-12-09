<?php

namespace App\Http\Controllers\System\config;

use App\Http\Controllers\ColectionPaginate;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use App\Models\EquipementType;
use App\Models\Products;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EquipementTypeController extends Controller
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
        return view('system.config.equipement_type.index')
            ->with([
                'system_type' => Str::upper($system_type),
                'equipementTypes' =>  Products::findOrFail(Products::where('name', '=', $system_type)->firstOrFail('id')->id)->types()->paginate(5),
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
        return view('system.config.equipement_type.create');
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
        $val = $request->validate([
            'type' => 'required',
            'products' => 'required|array',
            'products.*' => 'required|exists:products,id',
        ]);
        $type = EquipementType::create([
            'name' => $request['type'],
        ]);
        $type->products()->sync($request->products);

        $request->session()->flash('success',  __('messages.You have created the type'));
        return redirect()->route('system.config.equipement_type.index', $system_type);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($system_type, $type_name)
    {
        try {
            Validator::make(array_merge(['product' => $system_type, 'type_name' => $type_name]), [
                'product' => 'required|string|exists:products,name',
                'type_name' => 'nullable|string',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }
        return view('system.config.equipement_type.index')
            ->with([
                'equipementTypes' =>  Products::findOrFail(Products::where('name', '=', $system_type)->firstOrFail('id')->id)->types()->where('name', 'LIKE', '%' . $type_name . '%')->paginate(5),
                'system_type' => Str::upper($system_type),
                'products' => Products::all(),
                'product' => '',
                'search_word' => $type_name,

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
            Validator::make(['product' => $system_type, 'type_id' => $id], [
                'product' => 'required|string|exists:products,name',
                'type_id' => 'required|integer|exists:equipement_types,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        return view('system.config.equipement_type.edit', [
            'system_type' => Str::upper($system_type),
            'type' => EquipementType::find($id),
            'products' => Products::all(),
            'equipement_type' => EquipementType::findOrFail($id),
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

        $val = $request->validate([
            'type' => 'required',
            'products' => 'required|array',
            'products.*' => 'required|exists:products,id',
        ]);

        $type = EquipementType::findOrFail($id);
        if (!$type || $request->products == null) {
            $request->session()->flash('error', __('messages.You can not edited this type'));
            return redirect()->route('system.config.equipement_type.index', $system_type);
        } else {
            $type->update(['name' => $request->type]);
            $type->products()->sync($request->products);
            $request->session()->flash('success', __('messages.You have updated the type'));
            return redirect()->route('system.config.equipement_type.index', $system_type);
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
        try {
            Validator::make(['product' => $system_type, 'type_id' => $id], [
                'product' => 'required|string|exists:products,name',
                'type_id' => 'required|integer|exists:equipement_types,id',
            ])->validate();
            $deleted = EquipementType::destroy($id);

            if ($deleted) {
                $request->session()->flash('success', __('messages.You have deleted this type'));
            } else {
                $request->session()->flash('error', __('messages.Unable to delete this type'));
            }
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this type'));
        }

        return redirect()->route('system.config.equipement_type.index', $system_type);
    }
}