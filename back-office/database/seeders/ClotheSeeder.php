<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class ClotheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clothes = [
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'XXS',
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'XXS',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'XS',
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'XS',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'S',
                'created_at' => now()
            ],[
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'S',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'M',
                'created_at' => now()
            ],[
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'M',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'L',
                'created_at' => now()
            ],[
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'L',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'XL',
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'XL',
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Maglia',
                'taglia' => 'XXL',
                'created_at' => now()
            ],[
                'param_id' => 3,
                't_vestiario' => 'Maglia',
                'taglia' => 'XXL',
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 34,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 36,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 38,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 40,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 42,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 44,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 46,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 48,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 50,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 52,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Pantaloni',
                'taglia' => 54,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 40,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 42,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 44,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 46,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 48,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 50,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 52,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 54,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 56,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Pantaloni',
                'taglia' => 58,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 39,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 40,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 41,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 42,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 43,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 44,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 45,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 46,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 47,
                'created_at' => now()
            ],
            [
                'param_id' => 2,
                't_vestiario' => 'Scarpe',
                'taglia' => 48,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 36,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 37,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 38,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 39,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 40,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 41,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 42,
                'created_at' => now()
            ],
            [
                'param_id' => 3,
                't_vestiario' => 'Scarpe',
                'taglia' => 43,
                'created_at' => now()
            ]
        ];

        DB::table('clothes')->insert(
            $clothes
        );
    }
}
