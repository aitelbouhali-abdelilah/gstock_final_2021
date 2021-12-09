<?php

namespace App\Exports;

use App\Models\EquipementDt;
use App\Models\EquipementModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EquipementDtExport implements FromCollection, WithHeadings,  WithMapping
{
    use Exportable;
    protected $equiepemntdts;
    public function __construct($equiepemntdts)
    {
         ob_clean();
        $this->equiepemntdts = $equiepemntdts;
    }

    /**
     * @return \Illuminate\Support\Collection
     */

    public function headings(): array
    {

        if ($this->equiepemntdts->first()->status_online_spare != 'ONLINE') {
            return [
                'Status',
                'Repairable',
                'Serial part number',
                'Asset tag',
                'Type',
                'Model',
                'Observation',

            ];
        } else {
            return [
                'Terminal',
                'Zone',
                'Airline',
                'Counter',
                'Status',
                'Repairable',
                'Serial part number',
                'Asset tag',
                'Type',
                'Model',
                'Observation',

            ];
        }
    }
    public function collection()
    {
        return $this->equiepemntdts;
    }
    public function map($equiepemntdts): array
    {
        $this_model = EquipementModel::find($equiepemntdts->equipement->model);
        $terminal = "";
        if ($equiepemntdts->terminals()->first())
            if (isset($equiepemntdts->terminals()->first()->name))
                $terminal = $equiepemntdts->terminals()->first()->name;

        if ($this->equiepemntdts->first()->status_online_spare != 'ONLINE') {
            return [
                $equiepemntdts->status,
                $equiepemntdts->reparable,
                $equiepemntdts->serial_part_number,
                $equiepemntdts->asset_tag,
                $this_model->type->name,
                $this_model->name,
                $equiepemntdts->observation,
            ];
        } else {
            return [
                $terminal,
                $equiepemntdts->zone,
                $equiepemntdts->airline,
                $equiepemntdts->counter,
                $equiepemntdts->status,
                $equiepemntdts->reparable,
                $equiepemntdts->serial_part_number,
                $equiepemntdts->asset_tag,
                $this_model->type->name,
                $this_model->name,
                $equiepemntdts->observation,
            ];
        }
    }
}