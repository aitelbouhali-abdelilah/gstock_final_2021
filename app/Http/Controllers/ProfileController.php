<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\PasswordValidationRules;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    use PasswordValidationRules;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('user.profile');
    }

    public function update(Request $request)
    {
        $input = $request->except(['_token']);
        $user = Auth::user();

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => $this->passwordRules(),
            'alert_stock_equipement' => ['numeric', 'min:0'],
            'alert_stock_consomable' => ['numeric', 'min:0'],
        ])->validated();
            try {
                if (Auth::user()->hasRole('admin')) {
                    $alert_stock_equipement = 0;
                    $alert_stock_consomable = 0;
                } else if (Auth::user()->hasRole('user')) {
                    $alert_stock_equipement = $input['alert_stock_equipement'];
                    $alert_stock_consomable = $input['alert_stock_consomable'];
                }
        
                $user->forceFill([
                    'name' => $input['name'],
                    'email' => $input['email'],
                    'password' => Hash::make($input['password']),
                    'alert_stock_equipement' => $alert_stock_equipement,
                    'alert_stock_consomable' => $alert_stock_consomable,
                ])->save();
        
                return back()->with('success', __('messages.You have updated your profile'));
            } catch (\Throwable $th) {
                return abort(403);
            }
        
    }
}