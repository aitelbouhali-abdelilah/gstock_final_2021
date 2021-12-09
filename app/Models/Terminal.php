<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terminal extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'id_site',
    ];
    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'terminals_user');
    }
    public function products()
    {
        return $this->belongsToMany(Products::class, 'terminals_product');
    }
    /*
    public function equipments()
    {
        return $this->belongsToMany(Equipement::class, 'terminals_equipement');
    }

    public function consumables()
    {
        return $this->belongsToMany(Piece::class, 'terminals_consumable');
    }
     */
}