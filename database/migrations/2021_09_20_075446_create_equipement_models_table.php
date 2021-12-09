<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipementModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipement_models', function (Blueprint $table) {
            $table->id();
            //$table->string('model')->nullable(false);
            $table->string('name')->nullable(false);
            $table->unsignedBigInteger('id_type')->unsigned();
            $table->foreign('id_type')->references('id')->on('equipement_types');
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
        Schema::dropIfExists('equipement_models');
    }
}