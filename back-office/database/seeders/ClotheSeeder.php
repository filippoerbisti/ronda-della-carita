<?php

namespace Database\Seeders;

use App\Models\ClotheStatus;
use App\Models\ClotheType;
use App\Models\Order;
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
        $orders = Order::all();
        $clothes = ClotheType::all();
        $statusId = ClotheStatus::pluck('id');

        foreach ($orders as $order) {

            for ($i = 0; $i < rand(1,4); $i++) {
                $clothe = $faker->randomElement($clothes);
                DB::table('clothes')->insert([
                    't_vestiario' => $clothe->t_vestiario,
                    'reference' => $clothe->reference,
                    'status_id' => $faker->randomElement($statusId),
                    'quantita' => 1,
                    'created_at' => now(),
                    'order_id' => $order->id,
                ]);
            }
        }
        
        
    }
}
