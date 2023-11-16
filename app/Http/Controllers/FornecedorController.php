<?php

namespace App\Http\Controllers;


use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use App\Models\fornecedor;
use App\Models\endereco;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FornecedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            fornecedor::all('*'),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CadastroFornecedor/cadastrofornecedor');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       // try {

            DB::beginTransaction();
            $fornecedor = fornecedor::create([
                // 'user_id' => $request->user_id,
                'user_id' => Auth::user()->getAuthIdentifier(),
                'razao_social' => $request->razao_social,
                'cnpj' => $request->cnpj,
                'web_site' => $request->web_site,                
                'marca' => $request->marca,
                'email' => $request->email,               
                'inactivated_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $endereco = endereco::create([
                // 'fornecedor_id' => $fornecedor->id,
                'bairro' => $request->bairro,
                'cep' => $request->cep,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
            ]);


            DB::commit();

            return response()->json([
                'error' => 'Erro ao cadastrar fornecedor: '
            ], 200);
            // return Inertia::location(route('dashboard'))->with('success', 'Estabelecimento criado com sucesso');

            // return redirect(RouteServiceProvider::HOME);

    //    } catch (\Exception $e) {
         //   DB::rollback();

            //echo $e;

            // return redirect(RouteServiceProvider::HOME);

            
     //   }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
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
