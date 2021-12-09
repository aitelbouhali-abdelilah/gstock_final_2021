<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Equipement extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'model',
        'status',
        'description',
        'id_site',
        'id_product',
        'alert_stock',
    ];

    public function product()
    {
        return $this->hasOne(Products::class, 'id', 'id_product');
    }

    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }
    public function type()
    {
        return $this->hasOne(EquipementType::class, 'id', 'type_eqpt');
    }
    public function equipement_dts()
    {
        return $this->hasMany(EquipementDt::class, 'id_equipement', 'id')->whereNotIn('equipement_dts.id', DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray());
    }
    public function products()
    {
        return $this->belongsToMany(Products::class, 'equipement_product');
    }
}