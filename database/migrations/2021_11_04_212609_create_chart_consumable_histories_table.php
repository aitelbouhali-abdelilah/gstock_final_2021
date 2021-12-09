<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChartConsumableHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chart_consumable_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quantity')->default(0);
            $table->string('site')->nullable(false);
            $table->unsignedBigInteger('piece_id')->nullable(false);
            $table->foreign('piece_id')->references('id')->on('pieces')->onDelete('cascade');
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
        Schema::dropIfExists('chart_consumable_histories');
    }
}
