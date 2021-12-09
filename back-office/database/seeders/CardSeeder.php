<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $clientId = DB::table('clients')->pluck('id');
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('cards')->insert([
                'n_tessera' => Str::random(10),
                'created_at' => now(),
                'client_id' => $faker->randomElement($clientId)
            ]);
        }
    }
}
