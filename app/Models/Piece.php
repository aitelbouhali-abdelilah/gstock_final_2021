<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Piece extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'id_site',
        'stock',
        'id_piece_lists',
        'selection',
        'system_type',
        'id_product',
        'part_number',
        'alert_stock',
        'id_terminal'

    ];
    public function terminal()
    {
        return $this->hasOne(Terminal::class, 'id', 'id_terminal');
    }
    public function product()
    {
        return $this->hasOne(Products::class, 'id', 'id_product');
    }

    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }
    public function piecelist()
    {
        return $this->hasOne(PieceList::class, 'id', 'id_piece_lists');
    }
    public function products()
    {
        return $this->belongsToMany(Products::class, 'piece_product');
    }
    public function consumableHistory()
    {
        return $this->hasMany(ConsumableHistory::class, 'piece_id', 'id');
    }
}