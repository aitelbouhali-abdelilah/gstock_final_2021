<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PieceList extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref_piece',
        'designation',
        'supplier',
        'id_site',
        'selection',
        'system_type',
    ];
    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }
    public function products()
    {
        return $this->belongsToMany(Products::class, 'piecelist_product');
    }
}