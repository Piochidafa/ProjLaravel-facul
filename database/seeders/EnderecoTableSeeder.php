<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnderecoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('endereco')->insert([
            [
                'bairro' => 'Bairro1',
                'cep' => '11111-111',
                'cidade' => 'Cidade1',
                'estado' => 'Estado1',
            ],
            [
                'bairro' => 'Bairro2',
                'cep' => '22222-222',
                'cidade' => 'Cidade2',
                'estado' => 'Estado2',
            ],
            [
                'bairro' => 'Bairro3',
                'cep' => '33333-333',
                'cidade' => 'Cidade3',
                'estado' => 'Estado3',
            ],
            [
                'bairro' => 'Bairro4',
                'cep' => '44444-444',
                'cidade' => 'Cidade4',
                'estado' => 'Estado4',
            ]
        
        ]);
    }
}
