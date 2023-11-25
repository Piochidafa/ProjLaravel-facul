<?php

namespace App\Http\Controllers;


use App\Models\Produto;
use App\Models\ProdutoEstabelecimento;
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
                'nome_produto' => $request->nome_produto,
                'peso' => $request->peso,
                'unidade' => '1',
                'tamanho' => $request->tamanho,
                'material' => $request->material,
                'categoria' => $request->categoria,
                'created_at' => now(),
                'updated_at' => now(),
            ]);


            $produtoEstabelecimento = ProdutoEstabelecimento::create([
                'valor' => $request->valor,
                'descricao' => $request->descricao,
                'created_at' => now(),
                'updated_at' => now(),
                'produto_id' => $produto->id,
                // 'estabelecimento_id' => null,
                'fornecedor_id' => '2',
            ]);

            // DB::beginTransaction();
            // $produto = Produto::firstOrCreate([
            //     'nome_produto' => 'esponja bob',
            //     'peso' => '32',
            //     'unidade' => '1',
            //     'tamanho' => '13',
            //     'material' => 'polímero',
            //     'categoria' => 'limpeza',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ]);


            // $produtoEstabelecimento = ProdutoEstabelecimento::create([
            //     'preco' => '2.00',
            //     'descricao' => 'massa pra ela',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            //     'produto_id' => $produto->id,
            //     'estabelecimento_id' => 1,
            //     'fornecedor_id' => 2,
            // ]);




            DB::commit();

            // return Inertia::location(route('dashboard'))->with('success', 'Produto criado com sucesso');

            return response()->json([
                'message' => 'Produto criado com sucesso',
                'data' => [
                    'produto' => $produtoEstabelecimento
                ],
            ], 201);

            // return redirect(RouteServiceProvider::HOME);

        } catch (\Exception $e) {
            DB::rollback();

            // return redirect(RouteServiceProvider::HOME);

            return response()->json([
                'error' => 'Erro ao cadastrar Produto e ProdutoEstabelecimento: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produtoEstabelecimento = ProdutoEstabelecimento::find($id);

        if (!$produtoEstabelecimento) {
            return response()->json(['error' => 'Recurso não encontrado'], 404);
        }
        return response()->json(['data' => $produtoEstabelecimento], 200);
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
