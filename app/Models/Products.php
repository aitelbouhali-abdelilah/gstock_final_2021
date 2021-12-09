<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Products extends Model
{
    use HasFactory;
    protected $hidden = ['pivot'];
    protected $fillable = [
        'name',
        'id_site',
    ];

    public function sites()
    {
        return $this->belongsToMany(Site::class, 'site_product');
    }
    /*public function products()
    {
        return $this->belongsToMany(Products::class, 'site_product');
    }*/
    public function getRelatedSites()
    {
        return $this
            ->join('site_product', 'site_product.products_id', '=', 'products.id')
            ->where('site_product.products_id', '=', $this->id)
            ->join('sites', 'site_product.site_id', '=', 'sites.id')
            ->whereIn('sites.id', Auth::user()->sites->pluck('id')->toArray())
            ->select('sites.*')->distinct()->get();
    }
    public function getRelatedProductsSites()
    {
        return $this
            ->belongsToMany(Site::class, 'site_product')
            ->whereIn('sites.id', Auth::user()->sites->pluck('id')->toArray());
    }
    public function getRelatedProducts()
    {
        return $this
            ->join('site_product', 'site_product.products_id', '=', 'products.id')
            ->join('sites', 'site_product.site_id', '=', 'sites.id')
            ->whereIn('sites.id', Auth::user()->sites->pluck('id')->toArray())
            ->select('products.*')->distinct()->get();
    }
    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }

    public function types()
    {
        return $this->belongsToMany(EquipementType::class, 'type_product');
    }
    public function models()
    {
        return $this->belongsToMany(EquipementModel::class, 'model_product');
    }
    public function piecelists()
    {
        return $this->belongsToMany(PieceList::class, 'piecelist_product');
    }
    public function equipements()
    {
        return $this->belongsToMany(Equipement::class, 'equipement_product');
    }
    public function pieces()
    {
        return $this->belongsToMany(Piece::class, 'piece_product');
    }
    public function terminals()
    {
        return $this->belongsToMany(Terminal::class, 'terminals_product');
    }
    public function getUserProductTerminals($site)
    {
            return $this
            ->join('terminals_product', 'terminals_product.products_id', '=', 'products.id')
            ->where('products_id', '=', $this->id)
            ->join('terminals_user', 'terminals_product.terminal_id', '=', 'terminals_user.terminal_id')
            ->join('users', 'terminals_user.user_id', '=', 'users.id')
            ->where('users.id', '=', Auth::user()->id)
            ->join('terminals', 'terminals_product.terminal_id', '=', 'terminals.id')
            ->where('id_site', '=', $site)
            ->select('terminals.*')->distinct()
            ->get();
    }
    public function getUserProductAllTerminals()
    {
        return $this
            ->join('terminals_product', 'terminals_product.products_id', '=', 'products.id')
            ->where('products_id', '=', $this->id)
            ->join('terminals_user', 'terminals_product.terminal_id', '=', 'terminals_user.terminal_id')
            ->join('users', 'terminals_user.user_id', '=', 'users.id')
            ->where('users.id', '=', Auth::user()->id)
            ->join('terminals', 'terminals_product.terminal_id', '=', 'terminals.id')
            ->select('terminals.*')->distinct()
            ->get();
    }
    public function getSiteUserTerminals($site, $user)
    {
        return $this
            ->join('terminals_product', 'terminals_product.products_id', '=', 'products.id')
            ->where('products_id', '=', $this->id)
            ->join('terminals_user', 'terminals_product.terminal_id', '=', 'terminals_user.terminal_id')
            ->join('users', 'terminals_user.user_id', '=', 'users.id')
            ->where('users.id', '=', $user)
            ->join('terminals', 'terminals_product.terminal_id', '=', 'terminals.id')
            ->where('id_site', '=', $site)
            ->select('terminals.*')->distinct()
            ->get();
    }
    public function getUsersBySites($site)
    {
        return $this
            ->join('site_product', 'site_product.products_id', '=', 'products.id')
            ->where('products_id', '=', $this->id)
            ->join('sites', 'site_product.site_id', '=', 'sites.id')
            ->where('sites.id', '=', $site)
            ->join('user_sites', 'user_sites.site_id', '=', 'sites.id')
            ->join('users', 'user_sites.user_id', '=', 'users.id')
            ->where('id_role', '=', 2)
            ->select('users.*')->distinct()
            ->get();
    }
}