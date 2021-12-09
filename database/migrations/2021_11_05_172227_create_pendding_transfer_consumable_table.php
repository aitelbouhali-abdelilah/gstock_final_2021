<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenddingTransferConsumableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pendding_transfer_consumable', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_consumable')->nullable(false);
            $table->unsignedBigInteger('sender_id')->nullable(false);
            $table->unsignedBigInteger('receiver_id')->nullable(false);
            $table->unsignedBigInteger('id_site')->nullable(false);
            $table->unsignedBigInteger('id_terminal')->nullable(false);
            $table->unsignedBigInteger('quantity')->nullable(false);
            $table->string('token')->nullable(false);
            $table->foreign('id_consumable')->references('id')->on('pieces')->onDelete('cascade');
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
        Schema::dropIfExists('pendding_transfer_consumable');
    }
}