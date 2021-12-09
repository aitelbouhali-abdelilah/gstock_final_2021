<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Models\Products;
use App\Models\User;
use App\Models\Role;
use App\Models\Site;
use App\Models\UserOccupation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Actions\Fortify\PasswordValidationRules;
use App\Models\Terminal;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class UserController extends Controller
{
    use PasswordValidationRules;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        NotificationController::checkNotification($request);
        return view('admin.users.index')
            ->with([
                'users' => User::paginate(10),
                'products' => Products::all(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illumin
     * ate\Http\Response
     */

    public function show(Request $request, $user_name)
    {
        Validator::make(['username' => $user_name], [
            'username' => 'required|string|exists:users,name',
        ])->validate();
        try {
            return view('admin.users.index')
            ->with([
                'users' => User::where('name', 'LIKE', '%' . $user_name . '%')->paginate(10),
                'products' => Products::all(),
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
    }

    public function create()
    {
        return view('admin.users.create', [
            'occupations' => UserOccupation::all(),
            'sites' => Site::all(),
            'roles' => Role::all(),
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
        //$inputs = $request->only(['name', 'occupation', 'site', 'role', 'email', 'password', 'password_confirmation']);

        //$newUser = new CreateNewUser();
        //$user = $newUser->create($inputs);
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'occupation' => 'required|exists:user_occupations,id',
            'role' => 'required|exists:roles,id',
            'sites' => 'required|array',
            'sites.*' => 'required|exists:sites,id|min:1',
            'terminal' => 'required|array',
            'terminal.*' => 'required|exists:terminals,id|min:1',
            'password' => $this->passwordRules(),
        ]);
        try {
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'id_occupation' => $request['occupation'],
                'id_role' => $request['role'],
                'password' => Hash::make($request['password']),
            ]);
    
            $user->sites()->sync($request->sites);
            $user->terminals()->sync($request->terminal);
    
            $request->session()->flash('success', __('messages.You have created the user'));
            return redirect(route('admin.users.index'));
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
            Validator::make(['user' => $id], [
                'user' => 'required|integer|exists:users,id',
            ])->validate();
            return view(
                'admin.users.edit',
                [
                    'user' => User::find($id),
                    'occupations' => UserOccupation::all(),
                    'sites' => Site::all(),
                    'roles' => Role::all(),
                    'products' => Products::all(),
                    'terminals' => User::find($id)->terminals,
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
        Validator::make(array_merge($request->input(), ['user' => $id]), [
            'user' => 'required|integer|exists:users,id',
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($id),
            ],
            'occupation' => 'required|exists:user_occupations,id',
            'role' => 'required|exists:roles,id',
            'sites' => 'required|array',
            'sites.*' => 'required|exists:sites,id',
            'terminal' => 'required',
        ])->validate();
        try {
            $user = User::findOrFail($id);

            if (!$user || $request->sites == null) {
                $request->session()->flash('error', __('messages.Unable to update the user'));
            }
            $user->update([
                'name' => $request['name'],
                'email' => $request['email'],
                'id_occupation' => $request['occupation'],
                'id_role' => $request['role'],
            ]);
            $user->sites()->sync($request->sites);
            $user->terminals()->sync($request->terminal);


            $request->session()->flash('success', __('messages.You have updated the user'));
            return redirect(route('admin.users.index'));
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
            User::destroy($id);
        } catch (Exception $e) {
            $request->session()->flash('error', __('messages.Unable to delete this user'));
            return redirect(route('admin.users.index'));
        }
        $request->session()->flash('success', __('messages.You have deleted this user'));
        return redirect(route('admin.users.index'));
    }

    public function getTerminals(Request $request, $id_site)
    {
        return response()->json(Terminal::where('id_site', '=', $id_site)->get());
    }
}