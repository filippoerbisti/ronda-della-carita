<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewRelsToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->bigInteger("param_id")->unsigned()->nullable();
            $table->foreign("param_id")->references("id")->on("params");
            $table->bigInteger("clothe_id")->unsigned()->nullable();
            $table->foreign("clothe_id")->references("id")->on("clothes");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(["param_id"]);
            $table->dropColumn(["param_id"]);
            $table->dropForeign(["clothe_id"]);
            $table->dropColumn(["clothe_id"]);
        });
    }
}
