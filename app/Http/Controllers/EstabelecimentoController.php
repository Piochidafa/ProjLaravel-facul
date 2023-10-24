<?php

namespace App\Http\Controllers;

use App\Models\endereco;
use App\Models\estabelecimento;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
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

    public function store(Request $request): RedirectResponse
    {
        try {

            DB::beginTransaction();
            $estabelecimento = estabelecimento::create([
                // 'user_id' => $request->user_id,
                'user_id' => Auth::user()->getAuthIdentifier(),
                'razao_social' => $request->razao_social,
                'nome_fantasia' => $request->nome_fantasia,
                'cnpj' => $request->cnpj,
                'telefone' => $request->telefone,
                'inactivated_at' => null,
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

            // return Inertia::location(route('dashboard'))->with('success', 'Estabelecimento criado com sucesso');

            return redirect(RouteServiceProvider::HOME);

        } catch (\Exception $e) {
            DB::rollback();

            return redirect(RouteServiceProvider::HOME);

            // return response()->json([
            //     'error' => 'Erro ao cadastrar estabelecimento e endereço: ' . $e->getMessage(),
            // ], 500);
        }
    }

    public function show(string $id)
    {
        $estabelecimento = estabelecimento::find($id);

        if (!$estabelecimento) {
            return response()->json(['error' => 'Recurso não encontrado'], 404);
        }
        return response()->json(['data' => $estabelecimento]);
    }

    /**
     * Show the form for editing the specified resource.
     */

    
     public function showByUserId($id)
     {
         $recurso = estabelecimento::where('user_id', $id)->first();
     
         if (!$recurso) {
             return response()->json(['error' => 'Recurso não encontrado'], 404);
         }
         return response()->json(['data' => $recurso]);
     }



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