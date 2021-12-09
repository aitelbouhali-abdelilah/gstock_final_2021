<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        $validator = Validator::make($input, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'occupation' => 'required|exists:user_occupations,id',
            'role' => 'required|exists:roles,id',
            'site' => 'required|exists:sites,id',
            'password' => $this->passwordRules(),
        ])->validated();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'id_occupation' => $input['occupation'],
            'id_role' => $input['role'],
            'id_site' => $input['site'],
            'password' => Hash::make($input['password']),
        ]);
    }
}
