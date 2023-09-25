<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Faker\Factory as Faker;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Produto::all('*'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pages/Produto');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

     try {
            DB::beginTransaction();

            $produto = Produto::create([
                'produto_nome' => $request->produto_nome,
                'produto_preco' => $request->produto_preco,
                'produto_descricao' => $request->produto_descricao,
                'produto_peso' => $request->produto_peso,
                'produto_tamanho' => $request->produto_tamanho,
                'produto_material' => $request->produto_material,
                'produto_categoria' => $request->produto_categoria,
                'produto_fornecedor' => $request->produto_fornecedor,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Estabelecimento criado com sucesso',
                'data' => $produto,
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'erro' => 'Erro ao cadastrar prod: ' . $e->getMessage(),
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
        //
    }
}
