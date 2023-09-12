<?php

namespace App\Http\Controllers;

use App\Models\filial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Faker\Factory as Faker;

class FilialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            filial::all('*'),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CadastroFilial/CadFilial');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $faker = Faker::create();
        $dados = $request->all();
        // $dados = [
        //     'estabelecimento_id' => 1,
        //     'nome_filial' => $faker->company,
        //     'telefone' => $faker->phoneNumber,
        // ];
        $filial = filial::create($dados);

        return response()->json([
            'message' => "Deu certo",
            'data' => $filial,
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