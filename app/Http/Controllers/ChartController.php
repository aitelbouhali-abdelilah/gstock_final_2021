<?php

namespace App\Http\Controllers;

use App\Models\ChartConsumableHistory;
use App\Models\ChartEquipmentHistory;
use App\Models\Equipement;
use App\Models\EquipementModel;
use App\Models\EquipementType;
use App\Models\Piece;
use App\Models\PieceList;
use App\Models\Products;
use App\Models\Site;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ChartController extends Controller
{
    private function getConsumaleQuantityByMonth($PRODUCT, $SITE, $ID_CONSUMABLE_LIST, $YEAR)
    {
        $consumable_ids = $this->getConsumableId($PRODUCT, $SITE, $ID_CONSUMABLE_LIST);
        $consumable_records = ChartConsumableHistory::select(DB::raw("MONTH(created_at) as period, sum(quantity) as quantity"))
        ->whereIn('piece_id',$consumable_ids)
        ->whereYear('created_at', '=', date($YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->consumableDataProcessing(1, 12, $consumable_records);
    }
    private function getConsumaleQuantityByQuarter($PRODUCT, $SITE, $ID_CONSUMABLE_LIST, $YEAR)
    {
        $consumable_ids = $this->getConsumableId($PRODUCT, $SITE, $ID_CONSUMABLE_LIST);
        $consumable_records = ChartConsumableHistory::select(DB::raw("QUARTER(created_at) as period, sum(quantity) as quantity"))
        ->whereIn('piece_id',$consumable_ids)
        ->whereYear('created_at', '=', date($YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->consumableDataProcessing(1, 4, $consumable_records);
    }
    private function getConsumaleQuantityByYear($PRODUCT, $SITE, $ID_CONSUMABLE_LIST, $FROM_YEAR, $TO_YEAR)
    {
        $consumable_ids = $this->getConsumableId($PRODUCT, $SITE, $ID_CONSUMABLE_LIST);
        $consumable_records = ChartConsumableHistory::select(DB::raw("YEAR(created_at) as period, sum(quantity) as quantity"))
        ->whereIn('piece_id',$consumable_ids)
        ->whereYear('created_at', '>=', date($FROM_YEAR))
        ->whereYear('created_at', '<=', date($TO_YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->consumableDataProcessing($FROM_YEAR, ($TO_YEAR-$FROM_YEAR), $consumable_records);
    }
    private function consumableDataProcessing($FROM, $TO, $RECORDS)
    {
        $consumable_total = array_fill($FROM, $TO, 0);
        foreach ($RECORDS as $row) {
            $consumable_total[$row->period] = (int) $row->quantity;
        }
        return $consumable_total;
    }
    private function getConsumableId($PRODUCT, $SITE, $ID_CONSUMABLE_LIST)
    {
        return Piece::withTrashed()->
        where('id_product', '=', $PRODUCT)
        ->whereIn('id_site', $SITE)
        ->where('id_piece_lists', '=', $ID_CONSUMABLE_LIST)
        ->pluck('id')->toArray();
    }


    public static function getEquipementQuantityOfSpecificMonth($PRODUCT, $SITE, $MODEL, $YEAR,$MONTH)
    {
        $equipement_ids = ChartController::getEquipementId($PRODUCT, $SITE, $MODEL);
        $equipement_record = ChartEquipmentHistory::select(DB::raw("sum(ok_quantity) as ok_quantity,sum(nok_quantity) as nok_quantity"))
        ->whereIn('id_equipement',$equipement_ids)
        ->whereMonth('created_at', '=', date($MONTH))
        ->whereYear('created_at', '=', date($YEAR))
        ->get();
        return $equipement_record->toArray();
    }
    private function getEquipementQuantityByMonth($PRODUCT, $SITE, $MODEL, $YEAR)
    {
        $equipement_ids = $this->getEquipementId($PRODUCT, $SITE, $MODEL);
        $equipement_record = ChartEquipmentHistory::select(DB::raw("MONTH(created_at) as period, sum(ok_quantity) as ok_quantity,sum(nok_quantity) as nok_quantity"))
        ->whereIn('id_equipement',$equipement_ids)
        ->whereYear('created_at', '=', date($YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->equipementDataProcessing(1, 12, $equipement_record);
    }
    private function getEquipementQuantityByQuarter($PRODUCT, $SITE, $MODEL, $YEAR)
    {
        $equipement_ids = $this->getEquipementId($PRODUCT, $SITE, $MODEL);
        $equipement_record = ChartEquipmentHistory::select(DB::raw("QUARTER(created_at) as period, sum(ok_quantity) as ok_quantity,sum(nok_quantity) as nok_quantity"))
        ->whereIn('id_equipement',$equipement_ids)
        ->whereYear('created_at', '=', date($YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->equipementDataProcessing(1, 4, $equipement_record);
    }
    private function getEquipementQuantityByYear($PRODUCT, $SITE, $MODEL, $FROM_YEAR, $TO_YEAR)
    {
        $equipement_ids = $this->getEquipementId($PRODUCT, $SITE, $MODEL);
        $equipement_record = ChartEquipmentHistory::select(DB::raw("YEAR(created_at) as period, sum(ok_quantity) as ok_quantity,sum(nok_quantity) as nok_quantity"))
        ->whereIn('id_equipement',$equipement_ids)
        ->whereYear('created_at', '>=', date($FROM_YEAR))
        ->whereYear('created_at', '<=', date($TO_YEAR))
        ->groupBy('period')
        ->orderBy('period')
        ->get();
        return $this->equipementDataProcessing($FROM_YEAR, ($TO_YEAR-$FROM_YEAR), $equipement_record);
    }
    private function equipementDataProcessing($FROM, $TO, $RECORDS)
    {
        $equipement_ok = array_fill($FROM, $TO, 0);
        $equipement_nok = array_fill($FROM, $TO, 0);
        $equipement_total = array_fill($FROM, $TO, 0);

        foreach ($RECORDS as $row) {
            $equipement_ok[$row->period] = (int) $row->ok_quantity;
            $equipement_nok[$row->period] = (int) $row->nok_quantity;
            $equipement_total[$row->period] = (int) $row->ok_quantity + (int) $row->nok_quantity;
        }

        $data['equipement_ok'] = $equipement_ok;
        $data['equipement_nok'] = $equipement_nok;
        $data['equipement_total'] = $equipement_total;
        return $data;
    }
    private static function getEquipementId($PRODUCT, $SITE, $MODEL)
    {
        /*$model = EquipementModel::find($MODEL);
        $type = EquipementType::find($TYPE);*/

        return Equipement::withTrashed()->
        where('id_product',$PRODUCT)
        ->where('model', '=', $MODEL)
        ->whereIn('id_site', $SITE)
        ->pluck('id')->toArray();
    }

    public function getEquipementChartData(Request $request)
    {

        $currentUser = $request->user();
        try {

            $rules = [
                'interval'=>'required|integer|in:1,2,3',
                'product' => 'required|integer|exists:products,id',
                'site' => 'required|integer|exists:sites,id',  
                'site' => 'required|array',
                'site.*' => 'required|integer|exists:sites,id',
                'model' => ['required', 'integer', 'max:255', 'exists:equipement_models,id'],
            ];
            if($request->interval == 3){
                $rules['from'] = 'required|digits:4|integer|min:1900';
                $rules['to'] = 'required|digits:4|integer|min:1900';
            }
            else
                $rules['year'] = 'required|digits:4|integer|min:1900|max:'.(date('Y')+1);
            Validator::make($request->input(), $rules)->validate();
            
            $related_product = $currentUser->products()->where('id', '=', $request->product)->first();
            if ($related_product == null)
                return response('',200);
            else {
                $product = Products::find($request->product);
                $product_sites = $product->getRelatedSites()->pluck('id')->toArray();

                $model = EquipementModel::findOrFail($request->model);
                $type = $model->type;
                if (!($request->site && count(array_diff($request->site, $product_sites))==0)
                    || count(array_diff($request->site, $currentUser->sites->pluck('id')->toArray())) != 0
                    || !in_array($product->id, $type->products->pluck('id')->toArray()))
                        return response('',200);
            }
            
            switch ($request->interval) {
                case '1':
                    # MONTH
                    $results = [];
                    $results[0] = $this->getEquipementQuantityByMonth($request->product, $request->site, $request->model, $request->year);
                    foreach ($request->site as $key=>$site) {
                        $results[$key+1] = [Site::find($site)->signifi=>$this->getEquipementQuantityByMonth($request->product, [$site], $request->model, $request->year)];
                    }

                    return $results;

                    break;
                case '2':
                    # QUARTER
                    $results = [];
                    $results[0] = $this->getEquipementQuantityByQuarter($request->product, $request->site, $request->model, $request->year);
                        foreach ($request->site as $key=>$site) {
                            $results[$key+1] = [Site::find($site)->signifi=>$this->getEquipementQuantityByQuarter($request->product, [$site], $request->model, $request->year)];
                        }
                    return $results;
                    break;
                case '3':
                    # YEAR
                    $results = [];
                    $results[0] = $this->getEquipementQuantityByYear($request->product, $request->site, $request->model, $request->from, $request->to);
                        foreach ($request->site as $key=>$site) {
                            
                            $results[$key+1] = [Site::find($site)->signifi=>$this->getEquipementQuantityByYear($request->product, [$site], $request->model, $request->from, $request->to)];
                        }
                    return $results;
                    break;
                default:
                    return response('',200);
                    break;
            }

        } catch (\Throwable $th) {
            return response('',200);
        }
    }
    public function getConsumableChartData(Request $request)
    {
        $currentUser = $request->user();
        
        
        try {
            $rules = [
                'interval'=>'required|in:1,2,3',
                'product' => 'required|exists:products,id',
                'site' => 'required|array',
                'site.*' => 'required|exists:sites,id',
                'reference' => ['required', 'exists:piece_lists,id'],
           ];
            if($request->interval == 3){
                $rules['from'] = 'required|digits:4|integer|min:1900';
                $rules['to'] = 'required|digits:4|integer|min:1900';
            }
            else
                $rules['year'] = 'required|digits:4|integer|min:1900|max:'.(date('Y')+1);
            Validator::make($request->input(), $rules)->validate();

            $related_product = $currentUser->products()->where('id', '=', $request->product)->first();

            if ($related_product == null)
                return response('',200);
            else {
                $product = Products::find($request->product);
                $product_sites = $product->getRelatedSites()->pluck('id')->toArray();

                $related_piece = PieceList::find($request->reference)->products->where('id', '=', $request->product);
                if (!($request->site && count(array_diff($request->site, $product_sites))==0)
                    || $related_piece == null
                    || count(array_diff($request->site, $currentUser->sites->pluck('id')->toArray())) != 0)
                    return response('',200);
            }

            switch ($request->interval) {
                case '1':
                    # MONTH
                    $results = [];
                    $results[0] = [];
                    foreach ($request->site as $key=>$site) {
                        $results[$key+1] = [Site::find($site)->signifi=>$this->getConsumaleQuantityByMonth($request->product, [$site], $request->reference, $request->year)];
                    }
                    return $results;
                    break;
                case '2':
                    # QUARTER
                    $results = [];
                    $results[0] = [];
                    foreach ($request->site as $key=>$site) {
                        $results[$key+1] = [Site::find($site)->signifi=>$this->getConsumaleQuantityByQuarter($request->product, [$site], $request->reference, $request->year)];
                    }
                    return $results;
                    break;
                case '3':
                    # YEAR
                    $results = [];
                    $results[0] = [];
                    foreach ($request->site as $key=>$site) {
                        $results[$key+1] = [Site::find($site)->signifi=>$this->getConsumaleQuantityByYear($request->product, [$site], $request->reference, $request->from, $request->to)];
                    }
                    return $results;
                    break;
                default:
                    return response('',200);
                    break;
            }

        } catch (\Throwable $th) {
            return response('',200);
        }
        
    }
    public function barChart(Request $request)
    {
        // $id_site = null, $interval = null, $id_model = null, $id_type = null,  $id_piece = null, $yearStart = null
        
        /*$related_product = Auth::user()->products()->where('name', '=', $request->system_type)->first();
        if ($related_product == null)
        $request->system_type = null;
        else {
            $product = Products::where('name', '=', $request->system_type)->first();
            $product_sites = $product->getRelatedSites()->pluck('id')->toArray();
            if (!($request->id_site && in_array($request->id_site, $product_sites)))
            $request->id_site = null;
        }*/
        
        return view('index');
    }

}
