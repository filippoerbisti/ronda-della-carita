<?php

namespace Database\Seeders;

use App\Models\Stage;
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
        $stages = Stage::all();

        for ($i = 0; $i < 20; $i++) {
            $stage = $faker->randomElement($stages);
            DB::table('orders')->insert([
                'n_ordine' => $faker -> unique() -> numberBetween(1, 100000),
                'p_ritiro' => $stage->value,
                'giro' => $stage->reference,
                'livello' => rand(1, 2),
                'created_at' => now(),
                'user_id' => $faker->randomElement($userId),
                'client_id' => $faker->randomElement($clientId)
            ]);
        }
    }
}
