<?php

namespace App\Console\Commands;

use App\Models\ChartConsumableHistory;
use App\Models\ChartEquipmentHistory;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateChartDataMonthly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateChart:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Chart Data Each Month';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $currentDate=Carbon::now();
        $YEAR=$currentDate->subMonth()->year;
        $MONTH=$currentDate->month;
        try {
            $data = ChartEquipmentHistory::select(DB::raw("`id_equipement`, `ok_quantity`, `nok_quantity`,`site`"))
            ->whereYear('created_at', '=', date($YEAR))
            ->whereMonth('created_at', '=', date($MONTH))->get()->toArray();
            foreach ($data as $row) {
                ChartEquipmentHistory::create(array_merge($row,[
                    "created_at" =>  \Carbon\Carbon::now(),
                    "updated_at" => \Carbon\Carbon::now(),
                ]));
            }
            $this->info('Successfully updated equipement chart data.');
        } catch (\Throwable $th) {
            $this->info('Error occured when updating equipement chart data.');
        }
        try {
            $data = ChartConsumableHistory::select(DB::raw("`quantity`, `site`, `piece_id`"))
            ->whereYear('created_at', '=', date($YEAR))
            ->whereMonth('created_at', '=', date($MONTH))->get()->toArray();
            foreach ($data as $row) {
                ChartConsumableHistory::create(array_merge($row,[
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now(),
                ]));
            }
            $this->info('Successfully updated consumable chart data.');
        } catch (\Throwable $th) {
            $this->info('Error occured when updating consumable chart data.');
        }
        
    }
}
