<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartEquipmentHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_equipement',
        'ok_quantity',
        'nok_quantity',
        'site'
    ];
}
