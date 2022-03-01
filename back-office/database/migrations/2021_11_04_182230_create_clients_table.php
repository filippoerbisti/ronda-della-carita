<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->nullable();
            $table->string('cognome')->nullable();
            $table->integer('n_tessera');
            $table->char('genere');
            $table->string('nazionalita')->nullable();
            $table->float('altezza')->nullable();
            $table->char('t_maglietta')->nullable();
            $table->char('t_pantaloni')->nullable();
            $table->integer('t_scarpe')->nullable();
            $table->string('note')->nullable();
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
        Schema::dropIfExists('clients');
    }
}
