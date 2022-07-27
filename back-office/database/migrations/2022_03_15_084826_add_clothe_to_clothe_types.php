<?php

use App\Models\Clothe;
use App\Models\ClotheType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddClotheToClotheTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clothe_types', function (Blueprint $table) {
            $clothes = [
                ['reference' => 'Giacca', 'value' => 'Giaccone lungo'],
                ['reference' => 'Giacca', 'value' => 'Giubbotto leggero'],
                ['reference' => 'Giacca', 'value' => 'Giubbotto pesante'],
                ['reference' => 'Giacca', 'value' => 'Spolverino impermeabile'],
                ['reference' => 'Giacca', 'value' => 'Gilet imbottito'],
                ['reference' => 'Maglieria', 'value' => 'Felpa senza cappuccio'],
                ['reference' => 'Maglieria', 'value' => 'Felpa con cappuccio'],
                ['reference' => 'Maglieria', 'value' => 'T-shirt'],
                ['reference' => 'Maglieria', 'value' => 'Canottieria sportiva'],
                ['reference' => 'Maglieria', 'value' => 'Maglia manica lunga'],
                ['reference' => 'Maglieria', 'value' => 'Polo manica corta'],
                ['reference' => 'Maglieria', 'value' => 'Maglione'],
                ['reference' => 'Camicia', 'value' => 'Camicia pesante'],
                ['reference' => 'Camicia', 'value' => 'Camicia manica lunga'],
                ['reference' => 'Camicia', 'value' => 'Camicia manica corta'],
                ['reference' => 'Pantaloni', 'value' => 'Pantaloni corti'],
                ['reference' => 'Pantaloni', 'value' => 'Pantaloni lunghi jeans'],
                ['reference' => 'Pantaloni', 'value' => 'Pantaloni lunghi altro'],
                ['reference' => 'Pantaloni', 'value' => 'Tuta leggera'],
                ['reference' => 'Pantaloni', 'value' => 'Tuta pesante'],
                ['reference' => 'Pantaloni', 'value' => 'Tuta solo pantaloni'],
                ['reference' => 'Intimo', 'value' => 'Slip'],
                ['reference' => 'Intimo', 'value' => 'Boxer'],
                ['reference' => 'Intimo', 'value' => 'Canottiera'],
                ['reference' => 'Calze', 'value' => 'Calze lunghe'],
                ['reference' => 'Calze', 'value' => 'Calze corte'],
                ['reference' => 'Calze', 'value' => 'Calze fanstasmini'],
                ['reference' => 'Calze', 'value' => 'Calze calzamaglia'],
                ['reference' => 'Scarpe', 'value' => 'Ciabatte'],
                ['reference' => 'Scarpe', 'value' => 'Scarpe da lavoro'],
                ['reference' => 'Scarpe', 'value' => 'Scarponcino pesante'],
                ['reference' => 'Scarpe', 'value' => 'Scarpe sportive'],
                ['reference' => 'Scarpe', 'value' => 'Scarpe normali'],
                ['reference' => 'Accessori', 'value' => 'Borsone'],
                ['reference' => 'Accessori', 'value' => 'Cappello invernale'],
                ['reference' => 'Accessori', 'value' => 'Cappello con visiera'],
                ['reference' => 'Accessori', 'value' => 'Cintura'],
                ['reference' => 'Accessori', 'value' => 'Guanti'],
                ['reference' => 'Accessori', 'value' => 'Sciarpa'],
                ['reference' => 'Accessori', 'value' => 'Valigia'],
                ['reference' => 'Accessori', 'value' => 'Zaino piccolo'],
                ['reference' => 'Accessori', 'value' => 'Zaino grande'],
            ];
    
            foreach ($clothes as $clothe) {
                $newClothe = new ClotheType();
                $newClothe->reference = $clothe['reference'];
                $newClothe->value = $clothe['value'];
                $newClothe->save();
            }
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
            //
        });
    }
}
