<?php

namespace App\Http\Controllers;

use App\Models\endereco;
use App\Models\estabelecimento;
use App\Models\Produto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Inertia\Response;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            // Produto::all('*'),
            Produto::with('estabelecimento', 'fornecedor')->get(),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CadastroProduto/CadProd');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            // $esta = estabelecimento::find

            $produto = Produto::create([
                'nome_produto' => "$request->nome_produto",
                'preco' => $request->preco,
                'descricao' => $request->descricao,
                'peso' => $request->peso,
                'unidade' => '1',
                'tamanho' => $request->tamanho,
                'material' => $request->material,
                'categoria' => $request->categoria,
                'fornecedor_id' => $request->fornecedor_id,
                'estabelecimento_id' => $request->estabelecimento_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::commit();
            return response()->json([
                'message' => 'Produto cadastrado com sucesso',
                'data' => [
                    'produto' => $produto
                ],
            ], 200);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'Erro ao cadastrar Produto: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function showByDesc(string $desc){

        $produto = Produto::where('nome_produto', 'like', $desc . '%')->get();

        return $produto;
    }

    public function showByEstabelecimentoID(string $id){

        $produto = Produto::where('estabelecimento_id', $id )->with('estabelecimento', 'fornecedor')->get();

        return $produto;
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
        try {

            DB::beginTransaction();

            $Produto = Produto::findOrFail($id);
            $Produto->update($request->all());

            DB::commit();
            return response()->json(['message' => 'Produto atualizado com sucesso']);

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

            $Produto = Produto::findOrFail($id);
            $Produto->delete();

            DB::commit();

            return response()->json(['message' => 'Produto exlcluido com sucesso']);

        } catch (\Throwable $th) {
            throw $th;
        }
}











}
