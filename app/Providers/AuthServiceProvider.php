<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('logged-in', function ($user) {
            return $user;
        });

        Gate::define('is-admin', function ($user) {
            return $user->hasRole('admin');
        });
        Gate::define('is-user', function ($user) {
            return $user->hasRole('user');
        });
        Gate::define('is-viewer', function ($user) {
            //return $user->hasAnyRole('user');
            return $user->hasRole('viewer');
        });
        Gate::define('user-or-viewer', function ($user) {
            return $user->hasRole('user') || $user->hasRole('viewer');
        });
    }
}