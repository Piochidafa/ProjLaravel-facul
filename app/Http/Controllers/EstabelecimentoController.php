<?php

namespace App\Http\Controllers;

use App\Models\endereco;
use App\Models\estabelecimento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
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
        return Inertia::render('CadastroEstabelecimento/CadEstabelecimento');

    }
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $estabelecimento = estabelecimento::create([
                'razao_social' => $request->razao_social,
                'nome_fantasia' => $request->nome_fantasia,
                'cnpj' => $request->cnpj,
                'telefone' => $request->telefone,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $endereco = endereco::create([
                'estabelecimento_id' => $estabelecimento->id,
                'bairro' => $request->bairro,
                'cep' => $request->cep,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Estabelecimento criado com sucesso',
                'data' => [
                    'estabelecimento' => $estabelecimento,
                    'endereco' => $endereco,
                ],
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'Erro ao cadastrar estabelecimento e endereço: ' . $e->getMessage(),
            ], 500);
        }

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