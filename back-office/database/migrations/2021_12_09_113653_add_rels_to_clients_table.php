<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelsToClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->bigInteger("user_id")->unsigned()->nullable();
            $table->foreign("user_id")->references("id")->on("users");
            $table->bigInteger("param_id")->unsigned()->nullable();
            $table->foreign("param_id")->references("id")->on("params");
            $table->bigInteger("document_id")->unsigned()->nullable();
            $table->foreign("document_id")->references("id")->on("documents");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign(["user_id"]);
            $table->dropColumn(["user_id"]);
            $table->dropForeign(["param_id"]);
            $table->dropColumn(["param_id"]);
            $table->dropForeign(["document_id"]);
            $table->dropColumn(["document_id"]);
        });
    }
}
