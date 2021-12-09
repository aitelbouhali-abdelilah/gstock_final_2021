<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsumableHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'messages',
        'piece_id',

    ];
}