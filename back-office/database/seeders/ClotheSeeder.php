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
        $inventoryId = DB::table('inventories')->pluck('id');
        $paramId = DB::table('params')->pluck('id');
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('clothes')->insert([
                'quantita' => rand(1, 5),
                'created_at' => now(),
                'order_id' => $faker->randomElement($orderId),
                'inventory_id' => $faker->randomElement($inventoryId),
                'param_id' => $faker->randomElement($paramId)
            ]);
        }
    }
}
