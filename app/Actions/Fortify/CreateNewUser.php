<?php

namespace App\Actions\Fortify;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $defaultRole = Role::firstOrCreate(['name' => 'user']);

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'role_id' => $defaultRole->id,
            'password' => $input['password'],
        ]);
    }
}
