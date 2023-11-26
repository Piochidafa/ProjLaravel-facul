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
        $estabelecimentos = estabelecimento::with('endereco')->get();
        return response()->json($estabelecimentos);
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

            $endereco = endereco::create([
                'bairro' => $request->bairro,
                'cep' => $request->cep,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
            ]);

            $estabelecimento = estabelecimento::create([

                'user_id' => Auth::user()->getAuthIdentifier(),
                'endereco_id' => $endereco->id,
                'razao_social' => $request->razao_social,
                'nome_fantasia' => $request->nome_fantasia,
                'cnpj' => $request->cnpj,
                'telefone' => $request->telefone,
                'inactivated_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::commit();
            return Redirect()->route('dashboard')->with('success', 'Estabelecimento Cadastrado com susexo');

        } catch (\Exception $e) {
            DB::rollback();
            return redirect(RouteServiceProvider::HOME);
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
        try {

            DB::beginTransaction();

            $estabelecimento = estabelecimento::findOrFail($id);
            $estabelecimento->update($request->all());

            $endereco = endereco::findOrFail($estabelecimento->endereco_id);
            $endereco->update($request->all());

            DB::commit();
            return response()->json(['message' => 'Estabelecimento atualizado com sucesso']);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            DB::beginTransaction();

            $estabelecimento = estabelecimento::findOrFail($id);
            $endereco = endereco::findOrFail($estabelecimento->endereco_id);

            $endereco->delete();
            $estabelecimento->delete();

            DB::commit();

            return response()->json(['message' => 'Estabelecimento exlcluido com sucesso']);

        } catch (\Throwable $th) {
            throw $th;
        }






    }
}