<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePiecesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pieces', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_site')->nullable(false);
            $table->integer('stock')->nullable(false);
            $table->unsignedBigInteger('id_piece_lists')->nullable(false);
            $table->unsignedBigInteger('id_product')->unsigned();
            $table->string('system_type')->nullable(false);
            $table->unsignedBigInteger('id_terminal')->unsigned();
            $table->string('part_number')->nullable(false);
            $table->unsignedBigInteger('alert_stock');
            $table->timestamps();
            $table->foreign('id_terminal')->references('id')->on('terminals');
            $table->foreign('id_piece_lists')->references('id')->on('piece_lists');
            $table->foreign('id_site')->references('id')->on('sites');
            $table->foreign('id_product')->references('id')->on('products');

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
        Schema::dropIfExists('pieces');
    }
}