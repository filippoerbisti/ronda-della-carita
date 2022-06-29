<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $order_status = [
            [
                "name" => "delivered",
                "value" => "Consegnato",
                "icon" => "done",
                "class" => "text-green-800"
            ],
            [
                "name" => "not_available",
                "value" => "Non disponibile",
                "icon" => "close",
                "class" => "text-red-800"
            ],
            [
                "name" => "to_be_delivered",
                "value" => "Da consegnare",
                "icon" => "local_shipping",
                "class" => "text-blue-800"
            ],
            [
                "name" => "to_be_prepared",
                "value" => "Da preparare",
                "icon" => "inventory_2",
                "class" => "text-yellow-800"
            ],
            [
                "name" => "breakfast",
                "value" => "Colazioni",
                "icon" => "local_cafe",
                "class" => "text-yellow-500"
            ],

        ];

        DB::table('statuses')->insert($order_status);
    }
}
