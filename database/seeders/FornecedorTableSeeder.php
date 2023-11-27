<?php

namespace Database\Seeders;

use App\Models\fornecedor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class FornecedorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('fornecedores')->insert([
            [
                'razao_social' => 'Red Dragon',
                'telefone' => '5555555555',
                'marca' => 'Red Dragon',
                'web_site' => 'www.reddragon.com',
                'cnpj' => '1234567890055',
                'email' => 'contato@reddragon.com',
                'updated_at' => NOW(),
                'created_at' => NOW(),
                'endereco_id' => 1
            ],
            [
                'razao_social' => 'Corsair',
                'telefone' => '6666666666',
                'marca' => 'Corsair',
                'web_site' => 'www.corsair.com',
                'cnpj' => '1234567890066',
                'email' => 'contato@corsair.com',
                'updated_at' => now(),
                'created_at' => now(),
                'endereco_id' => 2
            ],
            [
                'razao_social' => 'Vaxee',
                'telefone' => '9999999999',
                'marca' => 'Vaxee',
                'web_site' => 'www.vaxee.com',
                'cnpj' => '1234567890099',
                'email' => 'contato@vaxee.com',
                'updated_at' => now(),
                'created_at' => now(),
                'endereco_id' => 3
            ],
            [
                'razao_social' => 'Logitech',
                'telefone' => '1010101010',
                'marca' => 'Logitech',
                'web_site' => 'www.logitech.com',
                'cnpj' => '1234567890101',
                'email' => 'contato@logitech.com',
                'updated_at' => now(),
                'created_at' => now(),
                'endereco_id' => 4
            ]
        ]);


    }
}
