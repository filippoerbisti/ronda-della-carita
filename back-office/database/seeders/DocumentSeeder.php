<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for ($i = 0; $i < 50; $i++) {
            DB::table('documents')->insert([
                'n_doc' => Str::random(10),
                't_doc' =>  $faker->randomElement(['Patente', 'Passaporto', "Carta d'identità"]),
                'created_at' => now()
            ]);
        }
    }
}
