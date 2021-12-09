<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentDtHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'messages',
        'id_equipement_dts',

    ];
}