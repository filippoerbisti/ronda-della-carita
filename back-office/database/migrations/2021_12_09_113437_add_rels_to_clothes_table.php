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
            $table->bigInteger("inventory_id")->unsigned()->nullable();
            $table->foreign("inventory_id")->references("id")->on("inventories")->onDelete('cascade');
            $table->bigInteger("param_id")->unsigned()->nullable();
            $table->foreign("param_id")->references("id")->on("params")->onDelete('cascade');
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
            $table->dropForeign(["inventory_id"]);
            $table->dropColumn(["inventory_id"]);
            $table->dropForeign(["param_id"]);
            $table->dropColumn(["param_id"]);
        });
    }
}
