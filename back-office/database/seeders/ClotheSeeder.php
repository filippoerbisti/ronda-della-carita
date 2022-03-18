<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;


class ClotheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $orderId = DB::table('orders')->pluck('id');
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('clothes')->insert([
                't_vestiario' => 'Maglietta',
                // 'taglia' => 'XXX',
                'status' => $faker->randomElement(['Da consegnare', 'Non disponibile', 'Da preparare', 'Consegnato']),
                'quantita' => 1,
                'created_at' => now(),
                'order_id' => $faker->randomElement($orderId),
            ]);
        }
    }
}
