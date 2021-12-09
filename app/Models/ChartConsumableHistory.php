<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartConsumableHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'site',
        'quantity',
        'piece_id',
    ];
}
