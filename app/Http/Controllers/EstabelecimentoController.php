<?php

namespace App\Http\Controllers;

use App\Models\estabelecimento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Faker\Factory as Faker;
use Inertia\Response;

class EstabelecimentoController extends Controller
{
    public function index()
    {
        return response()->json(
            estabelecimento::all('*'),
        );
    }
    public function create()
    {
        return Inertia::render('Cadastro_Estabelecimento/Cad');

    }
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        // $faker = Faker::create();
        $dados = $request->all();
        // $dados = [
        //     'user_id' => $faker->numberBetween(1, 10),
        //     'nome_estabelecimento' => $faker->company,
        //     'cnpj' => $faker->numerify('##############'),
        //     'telefone' => $faker->phoneNumber,
        //     'created_at' => $faker->dateTimeBetween('2023-10-01', '2023-10-10')->format('Y-m-d\TH:i:s.u\Z'),
        //     'updated_at' => $faker->dateTimeBetween('2023-10-01', '2023-10-10')->format('Y-m-d\TH:i:s.u\Z'),
        // ];

        $estabelecimento = estabelecimento::create($dados);

        return response()->json([
            'message' => 'Estabelecimento criado com sucesso',
            'data' => $estabelecimento,
        ], 201);
    }
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}