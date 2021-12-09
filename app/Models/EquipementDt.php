<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EquipementDt extends Model
{
    use HasFactory;
    protected $fillable = [
        'zone',
        'airline',
        'counter',
        'status_online_spare',
        'status',
        'reparable',
        'observation',
        'id_equipement',
        'system_type',
        'serial_part_number',
        'asset_tag',
        'id_terminal',
    ];

    public function terminals()
    {
        return $this->hasOne(Terminal::class, 'id', 'id_terminal');
    }
    public function equipement()
    {
        return $this->hasOne(Equipement::class, 'id', 'id_equipement');
    }
    public function site()
    {
        return $this->hasOne(Site::class, 'id', 'id_site');
    }
    public function equipmentDtHistory()
    {
        return $this->hasMany(EquipmentDtHistory::class, 'id_equipement_dts', 'id');
    }
    public function equipmentDtChartHistory()
    {
        return $this->hasMany(ChartEquipmentDtHistory::class, 'id_equipement_dts', 'id');
    }
    public static function getEquipementDts($search_keyword, $equipement_id, $terminal)
    {
        $equipement_dts = EquipementDt::where('id_equipement', '=', $equipement_id)
            ->whereNotIn('equipement_dts.id', DB::table('pendding_transfer_equipement')->select('id_equipement_dts')->distinct()->pluck('id_equipement_dts')->toArray());
        if ($terminal && !empty($terminal)) {
            $equipement_dts->where(function ($q) use ($terminal) {
                $q->Where('equipement_dts.id_terminal', '=', $terminal);
            });
        }
        if ($search_keyword && !empty($search_keyword)) {
            $equipement_dts->where(function ($q) use ($search_keyword,) {
                $q->where('equipement_dts.asset_tag', 'like', "%{$search_keyword}%")
                    ->orWhere('equipement_dts.serial_part_number', 'like', "%{$search_keyword}%");
            });
        }
        return $equipement_dts->paginate(10);
    }
}