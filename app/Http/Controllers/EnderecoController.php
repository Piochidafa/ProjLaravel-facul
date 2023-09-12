<?php

namespace App\Http\Controllers;

use App\Models\endereco;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Faker\Factory as Faker;


class EnderecoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            endereco::all('*')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CadastroEndereco/CadEndereco');
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
        //     "filial_id" => 1,
        //     'bairro' => $faker->company,
        //     'cep' => $faker->numerify('#######'),
        //     'cidade' => $faker->city,
        //     'estado' => $faker->state,
        //     'created_at' => $faker->dateTimeBetween('2023-10-01', '2023-10-10')->format('Y-m-d\TH:i:s.u\Z'),
        //     'updated_at' => $faker->dateTimeBetween('2023-10-01', '2023-10-10')->format('Y-m-d\TH:i:s.u\Z'),
        // ];

        $endereco = endereco::create($dados);

        return response()->json([
            'message' => 'Deu certo',
            'data' => $endereco,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
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