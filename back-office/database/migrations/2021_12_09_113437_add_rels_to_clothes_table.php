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
            $table->bigInteger("order_id")->unsigned()->nullable();
            $table->foreign("order_id")->references("id")->on("orders")->onDelete('cascade');
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
            $table->dropForeign(["order_id"]);
            $table->dropColumn(["order_id"]);
        });
    }
}
