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
        $statuses = [
            [
                "name" => "delivered",
                "value" => "Consegnato",
                "icon" => "done",
                "class" => "text-green-800",
                "object" => "order"
            ],
            [
                "name" => "deleted",
                "value" => "Eliminato",
                "icon" => "delete",
                "class" => "text-red-800",
                "object" => "order"
            ],
            [
                "name" => "to_be_delivered",
                "value" => "Da consegnare",
                "icon" => "local_shipping",
                "class" => "text-blue-800",
                "object" => "order"
            ],
            [
                "name" => "to_be_prepared",
                "value" => "In preparazione",
                "icon" => "inventory_2",
                "class" => "text-yellow-800",
                "object" => "order"
            ],
            [
                "name" => "breakfast",
                "value" => "Colazioni",
                "icon" => "local_cafe",
                "class" => "text-yellow-500",
                "object" => "order"
            ],
            [
                "name" => "available",
                "value" => "Pronto",
                "icon" => "done",
                "class" => "text-green-800",
                "object" => "clothe"
            ],
            [
                "name" => "not_available",
                "value" => "Non disponibile",
                "icon" => "close",
                "class" => "text-red-800",
                "object" => "clothe"
            ],
            [
                "name" => "preparing",
                "value" => "In preparazione",
                "icon" => "schedule",
                "class" => "text-blue-800",
                "object" => "clothe"
            ],
        ];

        // [
        //     "name" => "delivered",
        //     "value" => "Consegnato",
        //     "icon" => "done",
        //     "class" => "text-green-800"
        // ],
        // [
        //     "name" => "not_available",
        //     "value" => "Non disponibile",
        //     "icon" => "close",
        //     "class" => "text-red-800"
        // ],
        // [
        //     "name" => "to_be_delivered",
        //     "value" => "Da consegnare",
        //     "icon" => "local_shipping",
        //     "class" => "text-blue-800"
        // ],
        // [
        //     "name" => "to_be_prepared",
        //     "value" => "In preparazione",
        //     "icon" => "inventory_2",
        //     "class" => "text-yellow-800"
        // ],
        // [
        //     "name" => "breakfast",
        //     "value" => "Colazioni",
        //     "icon" => "local_cafe",
        //     "class" => "text-yellow-500"
        // ],

        DB::table('statuses')->insert($statuses);
    }
}
