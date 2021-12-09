<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChartEquipmentHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chart_equipment_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_equipement')->nullable(false);
            $table->string('site')->nullable(false);
            $table->unsignedBigInteger('ok_quantity')->default(0);
            $table->unsignedBigInteger('nok_quantity')->default(0);
            $table->foreign('id_equipement')->references('id')->on('equipements')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chart_equipment_histories');
    }
}