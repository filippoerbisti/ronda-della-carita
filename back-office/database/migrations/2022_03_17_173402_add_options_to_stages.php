<?php

use App\Models\Stage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOptionsToStages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::table('stages', function (Blueprint $table) {
            $stages = [
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Rifugio 1"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "S. Nicolò"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Biblioteca"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Cortile del Tribunale"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Teatro Nuovo"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Sinagoga"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Santa Maria in Organo"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "S. Giorgio"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Inail"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "SS. Apostoli"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Pal. Canossa"
                ],
                [
                    "Giro" => "Giro 1",
                    "Tappa" => "Esselunga (Fiera)"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Rifugio 2"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Porta Vescovo 2 (Svai)"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Tiberghien"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Via Trecca 2"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Via Nepote (rist. Asia)"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Barana/Monte dei Paschi"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Uff. Finanziari scalinata"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Uff. Finanziari giardini"
                ],
                [
                    "Giro" => "Giro 2",
                    "Tappa" => "Piazza Brà"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Via Pasteur"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Via Combattenti Alleati"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Borgo Roma Parcheggio"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Piazza Bacanal"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Giardini San Zeno"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Corte Molon "
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Corso Milano (Rot. Rossetto)"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Via Albere, 90"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Via Albere, 20"
                ],
                [
                    "Giro" => "Giro 3",
                    "Tappa" => "Parcheggio Porta Palio"
                ],
                [
                    "Giro" => "Colazioni",
                    "Tappa" => "Colazioni"
                ]
            ];
            foreach ($stages as $stage) {
                $newStage = new Stage();
                $newStage->reference = $stage['Giro'];
                $newStage->value = $stage['Tappa'];
                $newStage->save();
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
        Schema::table('stages', function (Blueprint $table) {
            //
        });
    }
}
