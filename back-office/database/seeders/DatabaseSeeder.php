<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ParamSeeder::class,
            DocumentSeeder::class,
            InventorySeeder::class,
            UserSeeder::class,
            ClientSeeder::class,
            OrderSeeder::class,
            CardSeeder::class,
            ClotheSeeder::class,
            HistorySeeder::class,
        ]);
    }
}
