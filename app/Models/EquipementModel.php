<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipementModel extends Model
{
    use HasFactory;
    protected $hidden = ['pivot'];

    protected $fillable = [
        'name',
        'id_type',
    ];

    public function type()
    {
        return $this->hasOne(EquipementType::class, 'id', 'id_type');
    }
}