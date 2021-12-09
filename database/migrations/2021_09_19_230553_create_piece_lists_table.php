<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePieceListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('piece_lists', function (Blueprint $table) {
            $table->id();
            $table->string('designation')->nullable(false);
            $table->string('ref_piece')->nullable(false);
            $table->string('supplier')->nullable(false);
            $table->string('selection')->nullable(false);
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
        Schema::dropIfExists('piece_lists');
    }
}
