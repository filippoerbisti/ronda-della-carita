<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameValueFieldInClotheTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clothe_types', function (Blueprint $table) {
            $table->renameColumn("value", "t_vestiario");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clothe_types', function (Blueprint $table) {
            $table->renameColumn("t_vestiario","value");
        });
    }
}
