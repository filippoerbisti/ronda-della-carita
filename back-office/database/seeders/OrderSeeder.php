<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Stage;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Log;

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
        $statusId = OrderStatus::pluck('id');

        for ($i = 0; $i < 20; $i++) {
            $stage = $faker->randomElement($stages);
            $status = $faker->randomElement($statusId);
            DB::table('orders')->insert([
                'n_ordine' => Order::max("n_ordine") +1,
                'p_ritiro' => $stage->value,
                'giro' => $stage->reference,
                'livello' => rand(1, 2),
                'created_at' => now(),
                'user_id' => $faker->randomElement($userId),
                'client_id' => $faker->randomElement($clientId),
                'status_id' => $status
            ]);
            Log::info($status);
        }
    }
}
