<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
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
        $clotheId = DB::table('clothes')->pluck('id');

        for ($i = 0; $i < 20; $i++) {
            DB::table('orders')->insert([
                'n_ordine' => $faker -> unique() -> numberBetween(1, 100000),
                'p_ritiro' => $faker -> streetName,
                'clothe_id' => $faker->randomElement($clotheId),
                'param_id' => rand(7, 10),
                'quantita' => rand(1, 5),
                'created_at' => now(),
                'user_id' => $faker->randomElement($userId),
                'client_id' => $faker->randomElement($clientId)
            ]);
        }
    }
}
