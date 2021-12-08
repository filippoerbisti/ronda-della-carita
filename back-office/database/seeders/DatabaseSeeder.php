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
            ClotheSeeder::class,
            UserSeeder::class,
            ClientSeeder::class,
            OrderSeeder::class,
            CardSeeder::class,
            HistorySeeder::class,
        ]);
    }
}
