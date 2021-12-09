<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipements', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('model')->unsigned();

            //$table->string('type_eqpt')->nullable(false);
            //$table->string('modele')->nullable(false);
            
            $table->string('status')->nullable(false);
            $table->string('description')->nullable(false);
            $table->unsignedBigInteger('id_site')->unsigned();
            $table->unsignedBigInteger('id_product')->unsigned();
            //$table->string('system_type');
            $table->unsignedBigInteger('alert_stock');
            $table->foreign('id_site')->references('id')->on('sites');
            $table->foreign('id_product')->references('id')->on('products');

            $table->foreign('model')->references('id')->on('equipement_models');
            
            $table->timestamps();

            //keep deleted records
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipements');
    }
}