<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipementType extends Model
{
    use HasFactory;
    protected $hidden = ['pivot'];

    protected $fillable = [
        'name',
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'type_product');
    }
}