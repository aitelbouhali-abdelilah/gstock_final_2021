<?php

namespace App\Http\Controllers\Admin;


use App\Models\Products;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\Site;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        NotificationController::checkNotification($request);
        return view('admin.products.index')
            ->with([
                'products' => Products::paginate(10),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $product_name)
    {
        Validator::make(['product' => $product_name], [
            'product' => 'required|string|exists:products,name',
        ])->validate();
        try {
            return view('admin.products.index')
            ->with([
                'products' => Products::where('name', 'LIKE', '%' . $product_name . '%')->paginate(10),
            ]);
        } catch (\Throwable $th) {
            return back();
        }
        
    }

    public function create()
    {
        return view('admin.products.create', [
            'products' => Products::all(),
            'sites' => Site::all(),
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
        $val = $request->validate([
            'name' => 'required|string|max:100|unique:products,name',
            'sites' => 'required|array',
            'sites.*' => 'required|exists:sites,id',
            'terminal' => 'required|array',
            'terminal.*' => 'required|exists:terminals,id',
        ]);
        try {
            $products = Products::create([
                'name' => Str::upper($request['name'])
            ]);
            $products->sites()->sync($request->sites);
            $products->terminals()->sync($request->terminal);
    
            $request->session()->flash('success', __('messages.You have created the product'));
            return redirect(route('admin.products.index'));
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
        
        try {
            Validator::make(['product' => $id], [
                'product' => 'required|string|exists:products,id'
            ])->validate();
            return view(
                'admin.products.edit',
                [
                    'product' => Products::find($id),
                    'sites' => Site::all(),
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
            'name' => 'required|string|max:100|unique:products,name,'.$id,
            'sites' => 'required|array',
            'sites.*' => 'required|exists:sites,id',
            'terminal' => 'required|array',
            'terminal.*' => 'required|exists:terminals,id',
        ])->validated();
        try {
            $products = Products::findOrFail($id);
            if (!$products) {
                $request->session()->flash('error', __('messages.Unable to update the product'));
            }
            $products->update([
                'name' => Str::upper($request['name']),

            ]);
            $products->sites()->sync($request->sites);
            $products->terminals()->sync($request->terminal);

            $request->session()->flash('success', __('messages.You have updated the product'));
            return redirect(route('admin.products.index'));
        } catch (\Throwable $th) {
            return back()->with('error', __('messages.Unable to update the product'));
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
            Products::destroy($id);
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this product'));
            return redirect(route('admin.products.index'));
        }
        $request->session()->flash('success', __('messages.You have deleted this product'));
        return redirect(route('admin.products.index'));
    }
}