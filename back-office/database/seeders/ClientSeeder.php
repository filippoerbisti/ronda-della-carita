<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        $file = Storage::disk("public")->get("assistiti.csv");

        $users = explode("\n", $file);
        // DELETE LAST ARRAY DATA (EMPTY)
        array_pop($users);


        foreach ($users as $user) {
            $userData = explode(",", $user);
            Log::info("USER: " . $userData[1] . " " . $userData[2]);

            DB::table('clients')->insert([
                'nome' => trim($userData[2]),
                'cognome' => trim($userData[1]),
                'n_tessera' => trim($userData[0]),
                'genere' => null,
                'nazionalita' => trim($userData[4]),
                'altezza' => null, 
                't_maglietta' => null,
                't_pantaloni' => null,
                't_scarpe' => null,
                'created_at' => now(),
                'document_id' => null,
                'user_id' => null
            ]);

            // Tessera          0  
            // Cognome          1     
            // Nome             2    
            // Data di nascita  3     
            // Nazionalità      4

        }
    }
}
