<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClotheTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clothes = [
            ["reference" => 'Giacca', "value" => 'Giaccone lungo'],
            ["reference" => 'Giacca', "value" => 'Giubbotto leggero'],
            ["reference" => 'Giacca', "value" => 'Giubbotto pesante'],
            ["reference" => 'Giacca', "value" => 'Spolverino impermeabile'],
            ["reference" => 'Giacca', "value" => 'Gilet imbottito'],
            ["reference" => 'Maglieria', "value" => 'Felpa senza cappuccio'],
            ["reference" => 'Maglieria', "value" => 'Felpa con cappuccio'],
            ["reference" => 'Maglieria', "value" => 'T-shirt'],
            ["reference" => 'Maglieria', "value" => 'Canottieria sportiva'],
            ["reference" => 'Maglieria', "value" => 'Maglia manica lunga'],
            ["reference" => 'Maglieria', "value" => 'Polo manica corta'],
            ["reference" => 'Maglieria', "value" => 'Maglione'],
            ["reference" => 'Camicia', "value" => "Camicia pesante"],
            ["reference" => 'Camicia', "value" => 'Camicia manica lunga'],
            ["reference" => 'Camicia', "value" => 'Camicia manica corta'],
            ["reference" => 'Pantaloni', "value" => 'Pantaloni corti'],
            ["reference" => 'Pantaloni', "value" => 'Pantaloni lunghi jeans'],
            ["reference" => 'Pantaloni', "value" => 'Pantaloni lunghi altro'],
            ["reference" => 'Pantaloni', "value" => 'Tuta leggera'],
            ["reference" => 'Pantaloni', "value" => 'Tuta pesante'],
            ["reference" => 'Pantaloni', "value" => 'Tuta solo pantaloni'],
            ["reference" => 'Intimo', "value" => 'Slip'],
            ["reference" => 'Intimo', "value" => 'Boxer'],
            ["reference" => 'Intimo', "value" => 'Canottiera'],
            ["reference" => 'Calze', "value" => 'Calze lunghe'],
            ["reference" => 'Calze', "value" => 'Calze corte'],
            ["reference" => 'Calze', "value" => 'Calze fanstasmini'],
            ["reference" => 'Calze', "value" => 'Calze calzamaglia'],
            ["reference" => 'Scarpe', "value" => 'Ciabatte'],
            ["reference" => 'Scarpe', "value" => 'Scarpe da lavoro'],
            ["reference" => 'Scarpe', "value" => 'Scarponcino pesante'],
            ["reference" => 'Scarpe', "value" => 'Sportive'],
            ["reference" => 'Scarpe', "value" => 'Scarpe normali'],
            ["reference" => 'Accessori', "value" => 'Borsone'],
            ["reference" => 'Accessori', "value" => 'Cappello invernale'],
            ["reference" => 'Accessori', "value" => 'Cappello con visiera'],
            ["reference" => 'Accessori', "value" => 'Cintura'],
            ["reference" => 'Accessori', "value" => 'Guanti'],
            ["reference" => 'Accessori', "value" => 'Sciarpa'],
            ["reference" => 'Accessori', "value" => 'Valigia'],
            ["reference" => 'Accessori', "value" => 'Zaino piccolo'],
            ["reference" => 'Accessori', "value" => 'Zaino grande'],
        ];

        DB::table('clothe_types')->insert(
            $clothes
        );
    }
}
