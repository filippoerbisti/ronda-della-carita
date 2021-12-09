<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class HistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $userId = DB::table('users')->pluck('id');

        for ($i = 0; $i < 20; $i++) {
            DB::table('histories')->insert([
                'ultimo_accesso' => $faker -> dateTimeBetween($startDate = '-30 years', $endDate = 'now', $timezone = null),
                'user_id' => $faker->randomElement($userId),
                'interno' => rand(0, 1)
            ]);
        }
    }
}
