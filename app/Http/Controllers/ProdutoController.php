<?php

namespace App\Http\Controllers;

use App\Models\endereco;
use App\Models\Produto;
use App\Models\ProdutoEstabelecimento;
use App\Models\produtosestabelecimentos;
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
            Produto::all('*'),
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
            $produto = Produto::create([
                // 'user_id' => $request->user_id,
                'nome_produto' => "$request->nome_produto",
                'preco' => $request->preco,
                'descricao' => $request->descricao,
                'peso' => $request->peso,
                'unidade' => '1',
                'tamanho' => $request->tamanho,
                'material' => $request->material,
                'categoria' => $request->categoria,
                'fornecedor_id' => $request->id,
                'estabelecimento_id' => $request->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

           if (!$produto->save()) {
               DB::rollBack();
               return response()->json([
                    'error' => 'Erro ao cadastrar Produto',
               ], 500);
           }

            DB::commit();

            // return Inertia::location(route('dashboard'))->with('success', 'Estabelecimento criado com sucesso');

            return response()->json([
                'message' => 'Produto cadastrado com sucesso',
                'data' => [
                    'produto' => $produto
                ],
            ], 201);
            // return redirect(RouteServiceProvider::HOME);
        } catch (\Exception $e) {
            DB::rollback();

            // return redirect(RouteServiceProvider::HOME);

            return response()->json([
                'error' => 'Erro ao cadastrar Produto: ' . $e->getMessage(),
            ], 500);
        }
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
