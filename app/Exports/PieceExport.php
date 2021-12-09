<?php

namespace App\Exports;

use App\Models\Piece;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

HeadingRowFormatter::default('none');

class PieceExport implements FromCollection, WithHeadings, WithMapping
{

    use Exportable;

    protected $pieces;

    public function __construct($pieces)
    {
        ob_clean();
        $this->pieces = $pieces;
    }


    public function headings(): array
    {
        return [
            'Sites',
            'Terminal',
            'Reference',
            'Serial part number',
            'Quantity',
            'Supplier',
            'Description',

        ];
    }

    public function collection()
    {
        return $this->pieces;
    }
    public function map($pieces): array
    {

        return [
            $pieces->site->signifi,
            $pieces->terminal->name,
            $pieces->piecelist->ref_piece,
            $pieces->part_number,
            '' . $pieces->stock,
            $pieces->piecelist->supplier,
            $pieces->piecelist->designation,

        ];
    }
}