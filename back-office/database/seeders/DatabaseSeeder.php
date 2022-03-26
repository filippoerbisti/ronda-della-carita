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
            DocumentSeeder::class,
            StatusSeeder::class,
            UserSeeder::class,
            ClientSeeder::class,
            OrderSeeder::class,
            ClotheSeeder::class,
            HistorySeeder::class,
        ]);
    }
}
