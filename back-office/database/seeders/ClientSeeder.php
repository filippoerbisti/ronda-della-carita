<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('clients')->insert([
                'nome' => $faker -> firstName,
                'cognome' => $faker -> lastName,
                'genere' => 'M',
                'n_documento' => Str::random(10),
                't_documento' => "Carta d'identità",
                'nazionalita' => $faker -> state,
                't_maglietta' => 'M',
                't_pantaloni' => rand(42, 56),
                't_scarpe' => rand(36, 48),
                'created_at' => now(),
                'user_id' => $faker->randomElement($userId)
            ]);
        }
    }
}
