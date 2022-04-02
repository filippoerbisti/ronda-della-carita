<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $n = 1;

        DB::table('users')->insert([
            'nome' => "admin",
            'cognome' => "admin",
            'n_tessera' => $n++,
            'ruolo' => "Admin",
            'email' => "admin@gmail.com",
            'password' => Hash::make('Test1234.'),
            'created_at' => now()
        ]);

        for ($i = 0; $i < 30; $i++) {
            DB::table('users')->insert([
                'nome' => $faker -> firstName,
                'cognome' => $faker -> lastName,
                'n_tessera' => $n++,
                'ruolo' => $faker -> randomElement(['Interno', 'Esterno']),
                'email' => $faker -> unique()-> freeEmail,
                'password' => Hash::make('password'),
                'created_at' => now()
            ]);
        }
    }
}
