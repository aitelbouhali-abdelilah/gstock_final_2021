<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipementDtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipement_dts', function (Blueprint $table) {
            $table->id();
            $table->string('zone')->nullable();
            $table->string('airline')->nullable();
            $table->string('counter')->nullable();
            $table->string('status_online_spare')->nullable(false);
            $table->string('status')->nullable(false);
            $table->string('reparable')->nullable();
            $table->string('observation')->nullable(false);
            $table->string('serial_part_number')->nullable(false);
            $table->string('asset_tag')->nullable(false);
            $table->unsignedBigInteger('id_terminal')->unsigned()->nullable(true);
            $table->unsignedBigInteger('id_equipement')->nullable(false);
            $table->string('system_type');
            $table->foreign('id_terminal')->references('id')->on('terminals');
            $table->foreign('id_equipement')->references('id')->on('equipements');
            //$table->foreign('id_terminal')->references('id')->on('terminals');
            //$table->foreign('id_equipement')->references('id')->on('equipements');
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
        Schema::dropIfExists('equipement_dts');
    }
}