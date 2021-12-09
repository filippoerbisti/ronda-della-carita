<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelsToClothesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clothes', function (Blueprint $table) {
            $table->bigInteger("param_id")->unsigned()->nullable();
            $table->foreign("param_id")->references("id")->on("params");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clothes', function (Blueprint $table) {
            $table->dropForeign(["param_id"]);
            $table->dropColumn(["param_id"]);
        });
    }
}
