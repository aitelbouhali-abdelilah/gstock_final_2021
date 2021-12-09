<?php

namespace App\Exports;

use App\Models\EquipementModel;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EquipementExport implements FromCollection, WithHeadings, WithMapping
{
    use Exportable;
    protected $equiepemnts;
    public function __construct($equiepemnts)
    {
        ob_clean();
        $this->equiepemnts = $equiepemnts;
    }


    public function collection()
    {
        return collect($this->equiepemnts);
    }
    public function map($equiepemnts): array
    {
        $this_model = EquipementModel::find($equiepemnts->model);
        return [

            $equiepemnts->site->signifi,
            $this_model->type->name,
            $this_model->name,
            '' . count($equiepemnts->equipement_dts),
            $equiepemnts->status,
            $equiepemnts->description,

        ];
    }


    public function headings(): array
    {
        return [
            'Site',
            'Type',
            'Model',
            'Stock',
            'status',
            'Description',
        ];
    }
}