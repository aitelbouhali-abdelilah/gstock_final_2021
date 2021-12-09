<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentDtHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_dt_histories', function (Blueprint $table) {
            $table->id();
            $table->String('messages');
            $table->unsignedBigInteger('id_equipement_dts')->nullable(false);
            $table->foreign('id_equipement_dts')->references('id')->on('equipement_dts')->onDelete('cascade');
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
        Schema::dropIfExists('equipment_dt_histories');
    }
}