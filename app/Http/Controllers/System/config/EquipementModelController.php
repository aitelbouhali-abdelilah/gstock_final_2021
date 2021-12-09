<?php

namespace App\Http\Controllers\System\config;

use App\Http\Controllers\ColectionPaginate;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\EquipementModel;
use App\Models\Products;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EquipementModelController extends Controller
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
        return view('system.config.equipement_model.index')
            ->with([
                'system_type' => Str::upper($system_type),
                'equipementModels' => EquipementModel::paginate(5),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('system.config.equipement_model.create');
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
            'model' => 'required',
            'type' => 'required|exists:equipement_types,id',
        ]);


        //$model = new EquipementModel();
        $model = EquipementModel::create([
            'name' => $request['model'],
            'id_type' => $request['type'],
        ]);
        // $model->products()->sync($request->products);

        $request->session()->flash('success', __('messages.You have created the model'));
        return redirect()->route('system.config.equipement_model.index', $system_type);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($system_type, $model_name)
    {
        try {
            Validator::make(array_merge(['product' => $system_type, 'model_name' => $model_name]), [
                'product' => 'required|string|exists:products,name',
                'model_name' => 'nullable|string',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        return view('system.config.equipement_model.index')
            ->with([
                'system_type' => Str::upper($system_type),
                'equipementModels' => EquipementModel::where('name', 'LIKE',  '%' . $model_name . '%')->paginate(5),
                'search_word' => $model_name,

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
            Validator::make(['product' => $system_type, 'model_id' => $id], [
                'product' => 'required|string|exists:products,name',
                'model_id' => 'required|integer|exists:equipement_models,id',
            ])->validate();
        } catch (\Throwable $th) {
            return abort(403);
        }

        return view('system.config.equipement_model.edit', [
            'system_type' => Str::upper($system_type),
            'model' => EquipementModel::findOrFail($id),
            'equipement_model' => EquipementModel::findOrFail($id),
            'type' => EquipementModel::findOrFail($id)->type()->first(),
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
            'model' => 'required',
            'type' => 'required|exists:equipement_types,id',
        ]);

        $model = EquipementModel::findOrFail($id);

        if (!$model || $request->type == null) {
            $request->session()->flash('error', __('messages.Unable to update the Model'));
            return redirect()->route('system.config.equipement_model.index', $system_type);
        } else {
            $model->update([
                'name' => $request['model'],
                'id_type' => $request['type'],
            ]);
            // $model->products()->sync($request->products);
            $request->session()->flash('success', __('messages.You have updated the Model'));
            return redirect()->route('system.config.equipement_model.index', $system_type);
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
            Validator::make(['product' => $system_type, 'model_id' => $id], [
                'product' => 'required|string|exists:products,name',
                'model_id' => 'required|integer|exists:equipement_models,id',
            ])->validate();

            $deleted = EquipementModel::destroy($id);

            if ($deleted) {
                $request->session()->flash('success', __('messages.You have deleted this Model'));
            } else {
                $request->session()->flash('error', __('messages.Unable to delete this Model'));
            }
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this Model'));
        }

        return redirect()->route('system.config.equipement_model.index', $system_type);
    }
}