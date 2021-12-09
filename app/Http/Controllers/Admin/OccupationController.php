<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\Products;
use App\Models\UserOccupation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OccupationController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        NotificationController::checkNotification($request);

        return view('admin.occupation.index')

            ->with([
                'occupations' => UserOccupation::paginate(10),
                'products' => Products::all(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.occupation.create', [
            'products' => Products::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newOccupation = new UserOccupation();
        Validator::make($request->input(), [
            'occupation' => ['required', 'string', 'max:255', 'e:uuniquser_occupations,occupation']
        ])->validated();
        try {
            $occupation = $newOccupation->create($request->only(['occupation']));
            $request->session()->flash('success', __('messages.You have created the function'));
            return redirect(route('admin.occupation.index'));
        } catch (\Throwable $th) {
            return back();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        Validator::make(['occupation'=>$id], [
            'occupation' => ['required', 'integer', 'exists:user_occupations,id']
        ])->validated();
        try {
            return view(
                'admin.occupation.edit',
                [
                    'occupation' => UserOccupation::find($id),
                    'products' => Products::all(),
                ]
            );
        } catch (\Throwable $th) {
            return back();
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Validator::make($request->input(), [
            'occupation' => ['required', 'integer', 'exists:user_occupations,id']
        ])->validated();

        try {
            $occupation = UserOccupation::findOrFail($id);
            if (!$occupation) {
                $request->session()->flash('error', __('messages.Unable to update the function'));
            }
            $occupation->update($request->except(['_token']));
            $request->session()->flash('success', __('messages.You have updated the function'));
            return redirect(route('admin.occupation.index'));
        } catch (\Throwable $th) {
            $request->session()->flash('error', __('messages.Unable to update the function'));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        try {
            UserOccupation::destroy($id);
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this function'));
            return redirect(route('admin.occupation.index'));
        }
        $request->session()->flash('success', __('messages.You have deleted this function'));
        return redirect(route('admin.occupation.index'));
    }
}