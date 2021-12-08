<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $userId = DB::table('users')->pluck('id');
        $documentId = DB::table('documents')->pluck('id');
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('clients')->insert([
                'nome' => $faker -> firstName,
                'cognome' => $faker -> lastName,
                'nazionalita' => $faker -> state,
                'param_id' => rand(2, 3),
                't_maglietta' => 'M',
                't_pantaloni' => rand(42, 56),
                't_scarpe' => rand(36, 48),
                'created_at' => now(),
                'document_id' => $faker->randomElement($documentId),
                'user_id' => $faker->randomElement($userId)
            ]);
        }
    }
}
