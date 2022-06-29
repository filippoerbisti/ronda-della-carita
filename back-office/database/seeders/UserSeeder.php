<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        $file = Storage::disk("public")->get("volontari.csv");

        $users = explode("\n", $file);
        // DELETE LAST ARRAY DATA (EMPTY)
        array_pop($users);

        DB::table('users')->insert([
            'nome' => 'Admin',
            'cognome' => 'Admin',
            'n_tessera' => '0000',
            'ruolo' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'created_at' => now()
        ]);

        foreach ($users as $user) {
            $userData = explode(",", $user);
            // Log::info("USER: " . $userData[1] . " " . $userData[2]);

            DB::table('users')->insert([
                'nome' => trim($userData[2]),
                'cognome' => trim($userData[1]),
                'n_tessera' => trim($userData[0]),
                'ruolo' => 'Esterno',
                'email' => null,
                'password' => Hash::make('password'),
                'created_at' => now()
            ]);

        }
    }
}
