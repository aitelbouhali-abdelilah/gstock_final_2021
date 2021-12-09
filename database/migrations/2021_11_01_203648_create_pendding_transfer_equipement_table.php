<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenddingTransferEquipementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pendding_transfer_equipement', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_equipement_dts')->nullable(false)->unique();
            $table->unsignedBigInteger('sender_id')->nullable(false);
            $table->unsignedBigInteger('receiver_id')->nullable(false);
            $table->unsignedBigInteger('id_site')->nullable(false);
            $table->unsignedBigInteger('terminal_id')->nullable(true);
            $table->unsignedBigInteger('equipement_id')->nullable(true);
            $table->string('token')->nullable(false);
            $table->foreign('id_equipement_dts')->references('id')->on('equipement_dts')->onDelete('cascade');
            $table->foreign('equipement_id')->references('id')->on('equipements')->onDelete('cascade');
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
        Schema::dropIfExists('pendding_transfer_equipement');
    }
}