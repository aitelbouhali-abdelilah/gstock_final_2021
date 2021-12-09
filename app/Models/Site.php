<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Site extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'signifi'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'site_product');
    }

}