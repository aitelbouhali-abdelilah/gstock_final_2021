<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('id_occupation');
            //$table->unsignedBigInteger('id_site');
            $table->unsignedBigInteger('id_role');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->unsignedBigInteger('alert_stock_equipement')->default(2);
            $table->unsignedBigInteger('alert_stock_consomable')->default(2);
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('id_occupation')->references('id')->on('user_occupations');
            $table->foreign('id_role')->references('id')->on('roles');
            //$table->foreign('id_site')->references('id')->on('sites');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}