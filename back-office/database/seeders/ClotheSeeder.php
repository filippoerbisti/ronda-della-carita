<?php

namespace Database\Seeders;

use App\Models\Status;
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
            $status = $faker->randomElement(['delivered', 'not_available', 'to_be_delivered', 'to_be_prepared']);
            DB::table('clothes')->insert([
                't_vestiario' => 'Maglietta',
                'status_id' => Status::where('name', $status)->first()->id,
                'quantita' => 1,
                'created_at' => now(),
                'order_id' => $faker->randomElement($orderId),
            ]);
        }
    }
}
