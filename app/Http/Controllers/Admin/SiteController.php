<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\Products;
use App\Models\Site;
use App\Models\Terminal;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Ternary;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        NotificationController::checkNotification($request);
        return view('admin.sites.index')
            ->with([
                'sites' => Site::paginate(10),
                'products' => Products::all(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request, $site_name)
    {
        
        try {
            Validator::make(['name' => $site_name], [
                'name' => [
                    'required', 'string', 'max:255',
                    'exists:sites,nom'
                ],
            ])->validate();
            return view('admin.sites.index')
                ->with([
                    'sites' => Site::where('nom', 'LIKE', '%' . $site_name . '%')->paginate(10),
                    'products' => Products::all(),
            ]);
        } catch (\Throwable $th) {
            return back();
        }
    }
    public function create()
    {
        return view('admin.sites.create', [
            'sites' => Site::all(),
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
        $terminals = explode(',', $request->get('terminal'));
        Validator::make(array_merge($request->all(),['terminal'=>$terminals]), [
            'nom' => [
                'required', 'string', 'max:255',
                'unique:sites,nom'
            ],
            'signifi' => ['required', 'string', 'max:255'],
            "terminal"  => "required|array",
            "terminal.*"  => "required|string|distinct|min:1",
        ])->validate();

        try {
            $site = Site::create([
                'nom' => $request['nom'],
                'signifi' => $request['signifi']
            ]);
    
            for ($i = 0; $i < count($terminals); $i++) {
                $terminal = Terminal::create([
                    'id_site' => $site->id,
                    'name' => $terminals[$i],
                ]);
            }
    
            $request->session()->flash('success', __('messages.You have created the site'));
    
            return redirect(route('admin.sites.index'));
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
        Validator::make(['site' => $id], [
            'site' => 'required|integer|exists:sites,id',
        ])->validate();
        try {
            return view('admin.sites.edit', [
                'site' => Site::find($id),
                'products' => Products::all(),
                'terminal' => Terminal::where('id_site', '=', $id)->get(),
            ]);
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
        $terminals=[];
        if($request->get('terminal')!=null){
        $terminals = explode(',', $request->get('terminal'));
        }
        Validator::make(array_merge($request->all(),['terminal'=>$terminals]), [
            'nom' => [
                'required', 'string', 'max:255',
                'unique:sites,nom,' . $id
            ],
            'signifi' => ['required', 'string', 'max:255'],
            "terminal"  => "required|array",
            "terminal.*"  => "required|string|distinct|min:1",
        ])->validate();
        try {
        
            $site = Site::findOrFail($id);
            $terminal = Terminal::where('id_site', '=', $site->id)->get();
            for ($i = 0; $i < max(count($terminal), count($terminals)); $i++) {
                if (isset($terminal[$i]) && isset($terminals[$i])) {
                    $terminal[$i]->update([
                        'name' => rtrim($terminals[$i]),
                    ]);
                } else if (isset($terminals[$i]) && !isset($terminal[$i])) {
                    Terminal::create([
                        'id_site' => $site->id,
                        'name' => $terminals[$i],
                    ]);
                } else {
                    Terminal::destroy($terminal[$i]->id);
                }
            }
            if (!$site) {
                $request->session()->flash('error', __('messages.Unable to update the site'));
            }

            $site->update($request->all());
            $request->session()->flash('success', __('messages.You have updated the site'));

            return redirect(route('admin.sites.index'));
        } catch (\Throwable $th) {
            return back();
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
            Site::destroy($id);
        } catch (QueryException $e) {
            $request->session()->flash('error', __('messages.Unable to delete this site'));
            return redirect(route('admin.sites.index'));
        }
        $request->session()->flash('success', __('messages.You have deleted this site'));
        return redirect(route('admin.sites.index'));
    }
}