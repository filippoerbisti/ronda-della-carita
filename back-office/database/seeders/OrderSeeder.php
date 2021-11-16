<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $userId = DB::table('users')->pluck('id');
        $clientId = DB::table('clients')->pluck('id');

        for ($i = 0; $i < 20; $i++) {
            DB::table('orders')->insert([
                'n_ordine' => $faker -> unique() -> numberBetween(1, 100000),
                'p_ritiro' => $faker -> streetName,
                'genere' => 'M',
                't_vestiario' => 'Pantaloni',
                'taglia' => rand(36, 50),
                'quantita' => rand(1, 5),
                'status' => 'In attesa',
                'created_at' => now(),
                'user_id' => $faker->randomElement($userId),
                'client_id' => $faker->randomElement($clientId)
            ]);
        }
    }
}
