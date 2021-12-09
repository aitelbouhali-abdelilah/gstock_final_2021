<?php

namespace App\Imports;

use App\Models\Equipement;
use App\Models\EquipementDt;
use App\Models\Products;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsErrors;

class EquipmentDtImport implements ToModel, WithHeadingRow, SkipsOnError, WithValidation
{

    use Importable, SkipsErrors;
    protected $id_equipement, $system_type;
    public function __construct($id_equipement)
    {
        $equipement = Equipement::find($id_equipement);
        $this->id_equipement = $id_equipement;
        $this->status = $equipement->status;
        $this->id_site = $equipement->id_site;
        $this->system_type = Products::find($equipement->id_product)->name;
        $this->count_OK = 0;
        $this->count_NOK = 0;
    }

    public function model(array $row)
    {
        $currentUser = Auth::user();
        if ($row['status'] === null || $row['serial_part_number'] === null || $row['asset_tag'] === null) {
            return null;
        }
        if ($this->status == 'ONLINE') {
            if ($row['zone'] === null || $row['airline'] === null || $row['counter'] === null) {
                return null;
            }

            if (isset($row['terminal'])) {
                if (in_array($row['terminal'], $currentUser->getUserSiteTerminals($this->id_site)->pluck('name')->toArray())) {
                    $id_terminal = $currentUser->getUserSiteTerminals($this->id_site)->where('name', '=', $row['terminal'])->first()->id;
                    $eqpt_dts = new EquipementDt([
                        'id_terminal' => $id_terminal,
                        'zone' => $row['zone'],
                        'airline' => $row['airline'],
                        'counter' => $row['counter'],
                        'status_online_spare' => 'ONLINE',
                        'status' => $row['status'],
                        'reparable' => $row['reparable'],
                        'observation' => $row['observation'],
                        'serial_part_number' => $row['serial_part_number'],
                        'asset_tag' => $row['asset_tag'],
                        'id_equipement' =>  $this->id_equipement,
                        'system_type' => $this->system_type,
                    ]);
                } else {
                    $eqpt_dts = null;
                    $this->errors = 'There was an error on row ' . ($this->count_OK + $this->count_NOK) . ' Terminal [' . $row['terminal'] . "] " .  __('messages.does not related to this user');
                }
            }
        } else if ($this->status == 'SPARE') {
            if (isset($row['terminal']) || isset($row['zone']) || isset($row['airline']) || isset($row['counter'])) {
                $eqpt_dts = null;
                $this->errors =  __('messages.not related file');
            } else {
                $eqpt_dts = new EquipementDt([
                    'status_online_spare' => 'SPARE',
                    'status' => $row['status'],
                    'reparable' => $row['reparable'],
                    'observation' => $row['observation'],
                    'serial_part_number' => $row['serial_part_number'],
                    'asset_tag' => $row['asset_tag'],
                    'id_equipement' =>  $this->id_equipement,
                    'system_type' => $this->system_type,
                ]);
            }
        }
        if ($row['status'] == 'OK') {
            $this->count_OK++;
        } else {
            $this->count_NOK++;
        }
        return $eqpt_dts;
    }

    public function rules(): array
    {
        if ($this->status == 'ONLINE') {
            return [
                '*.terminal' => [
                    'required_with:*.serial_part_number,*.asset_tag',
                    'nullable',
                    'exists:terminals,name',
                    'in:' . Auth::user()->getUserSiteTerminals($this->id_site)->implode('name', ','),
                ],
                '*.zone' => ['required_with:*.serial_part_number,*.asset_tag'],
                '*.airline' => ['required_with:*.serial_part_number,*.asset_tag'],
                '*.counter' => ['required_with:*.serial_part_number,*.asset_tag'],
                '*.status' => [
                    'required_with:*.serial_part_number,*.asset_tag',
                    'nullable',
                    'in:OK,NOK'
                ],
                '*.reparable' => ['nullable', 'required_if:status,NOK', 'in:YES,NO,OUI,NON'],
                '*.observation' => ['nullable'],
                '*.serial_part_number' => ['required_with:*.asset_tag', 'unique:equipement_dts,serial_part_number'],
                '*.asset_tag' => ['required_with:*.serial_part_number,*.terminal', 'unique:equipement_dts,asset_tag'],
            ];
        } else {
            return [
                '*.status' => [
                    'required_with:*.serial_part_number,*.asset_tag',
                    'nullable',
                    'in:OK,NOK'
                ],
                '*.reparable' => ['nullable', 'required_if:status,NOK', 'in:YES,NO,OUI,NON'],
                '*.observation' => ['nullable'],
                '*.serial_part_number' => ['required_with:*.asset_tag', 'unique:equipement_dts,serial_part_number'],
                '*.asset_tag' => ['required_with:*.serial_part_number,*.terminal', 'unique:equipement_dts,asset_tag'],
            ];
        }
    }
}