<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $params = [
            [
                'id' => 1,
                'type' => 'rule',
                'name' => 'Volontario',
                'value' => 'vol',
                'created_at' => now()
            ],
            [
                'id' => 11,
                'type' => 'rule',
                'name' => 'Admin',
                'value' => 'admin',
                'created_at' => now()
            ],
            [
                'id' => 2,
                'type' => 'gender',
                'name' => 'Maschio',
                'value' => 'M',
                'created_at' => now()
            ],
            [
                'id' => 3,
                'type' => 'gender',
                'name' => 'Femmina',
                'value' => 'F',
                'created_at' => now()
            ],
            [
                'id' => 4,
                'type' => 'id_card',
                'name' => "Carta d'identità",
                'value' => 'carta_id',
                'created_at' => now()
            ],
            [
                'id' => 5,
                'type' => 'id_card',
                'name' => 'Patente',
                'value' => 'patente',
                'created_at' => now()
            ],
            [
                'id' => 6,
                'type' => 'id_card',
                'name' => 'Passaporto',
                'value' => 'passaporto',
                'created_at' => now()
            ],
            [
                'id' => 7,
                'type' => 'status',
                'name' => 'Consegnato',
                'value' => 'cons',
                'created_at' => now()
            ],
            [
                'id' => 8,
                'type' => 'status',
                'name' => 'Non disponibile',
                'value' => 'no_disp',
                'created_at' => now()
            ],
            [
                'id' => 9,
                'type' => 'status',
                'name' => 'In attesa',
                'value' => 'attesa',
                'created_at' => now()
            ],
            [
                'id' => 10,
                'type' => 'status',
                'name' => 'Da confermare',
                'value' => 'da_conf',
                'created_at' => now()
            ]
        ];

        DB::table('params')->insert(
            $params
        );
    }
}
