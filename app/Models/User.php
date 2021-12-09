<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'id_role',
        'id_occupation',
        //'id_site',
        'id_product',
        'password',
        'alert_stock_equipement',
        'alert_stock_consomable',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function occupation()
    {
        return $this->hasOne(UserOccupation::class, 'id', 'id_occupation');
    }
    public function productsUsers($name, $site)
    {
        return $this->select('users.*')
            ->join('user_sites', 'users.id', '=', 'user_sites.user_id')
            ->join('site_product', 'site_product.site_id', '=', 'user_sites.site_id')
            ->where('site_product.site_id', '=', $site)
            ->join('products', 'site_product.products_id', '=', 'products.id')
            ->where('products.name', '=', $name)
            ->distinct()->get();
    }
    public function products()
    {
        return $this
            ->join('user_sites', 'users.id', '=', 'user_sites.user_id')
            ->where('user_id', '=', $this->id)
            ->join('sites', 'user_sites.site_id', '=', 'sites.id')
            ->join('site_product', 'site_product.site_id', '=', 'sites.id')
            ->join('products', 'site_product.products_id', '=', 'products.id')
            ->select('products.*')->distinct()->get();
    }
    public function getUserProductTerminals()
    {
        return $this
            ->join('terminals_user', 'users.id', '=', 'terminals_user.user_id')
            ->where('user_id', '=', $this->id)
            ->join('terminals', 'terminals_user.terminal_id', '=', 'terminals.id')
            ->join('terminals_product', 'terminals.id', '=', 'terminals_product.terminal_id')
            ->select('terminals.*')->distinct()->get();
    }
    public function getUserSiteTerminals($site)
    {
        return $this
            ->join('terminals_user', 'users.id', '=', 'terminals_user.user_id')
            ->where('user_id', '=', $this->id)
            ->join('terminals', 'terminals_user.terminal_id', '=', 'terminals.id')
            ->where('terminals.id_site', '=', $site)
            ->select('terminals.*')->distinct()->get();
    }
    public function terminals()
    {
        return $this->belongsToMany(Terminal::class, 'terminals_user');
    }

    public function sites()
    {
        return $this->belongsToMany(Site::class, 'user_sites');
    }

    public function role()
    {
        return $this->hasOne(Role::class, 'id', 'id_role');
    }

    /**
     * Check if the user has a role
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role)
    {
        return null !== $this->role()->where('name', $role)->first();
    }
    public function hasSite(int $id)
    {
        return null !== $this->sites->where('id', $id)->first();
    }
    public function hasProduct(string $name, int $site = null)
    {
        $product = $this->products()->where('name', '=', $name)->first();

        if (isset($site) && isset($product)) {
            return null !== DB::table('site_product')
                ->where('site_id', $site)
                ->where('products_id', $product->id)
                ->first();
        }
        return null !== $product;
    }
    public function hasTerminal(int $id)
    {
        return null !== $this->terminals->where('id', $id)->first();
    }
}