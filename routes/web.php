<?php

use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\EstabelecimentoController;
use App\Http\Controllers\FilialController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FornecedorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware('auth')->group(function () {
 
    //Estabelecimento
    Route::get('/a', [EstabelecimentoController::class, 'index'])->name('estabelecimento.index');
    Route::post('/a/estabelecimento', [EstabelecimentoController::class, 'store'])->name('estabelecimento.store');
    Route::get('a/estabelecimento/{id}', [EstabelecimentoController::class,'show'])->name('estabelecimento.show');

    
    //Endereço Estabelecimento
    Route::get('/a/estabelecimento/enderecoget', [EnderecoController::class, 'index'])->name('endereco.index');
    Route::post('/a/estabelecimento/endereco', [EnderecoController::class, 'store'])->name('estabelecimento.store');
    
    
    //Produto
    Route::post('b/produto', [ProdutoController::class, 'store'])->name('Produto.store');
    Route::post('b/produto', [ProdutoController::class, 'store'])->name('Produto.store');
    Route::delete('b/delete/{id}', [ProdutoController::class, 'destroy'])->name('Produto.destroy');


    //Fornecedor
    Route::get('/c', [FornecedorController::class, 'index'])->name('fornecedor.index');
    Route::post('/c/fornecedor', [FornecedorController::class, 'store'])->name('fornecedor.store');
    Route::get('/c/fornecedor/{id}', [FornecedorController::class, 'show'])->name('fornecedor.show');
    
    
});

Route::get('/b', [ProdutoController::class, 'index'])->name('Produto.index');
Route::get('a/estabelecimento/user/{id}', [EstabelecimentoController::class,'showByUserId'])->name('estabelecimento.showByUserId');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/Initial', function () {
    return Inertia::render('Initial/telaBasica');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/CadastroEstabelecimento', function () {
    return Inertia::render('CadastroEstabelecimento/CadEstabelecimento');
})->middleware(['auth', 'verified'])->name('CadastroEstabelecimento');

Route::get('/CadastroProduto', function () {
    return Inertia::render('CadastroProduto/CadProd');
})->middleware(['auth', 'verified'])->name('CadastroProduto');

Route::get('/MeuEstabelecimento', function () {
    return Inertia::render('MeuEstabelecimento/MyEstabelecimento');
})->middleware(['auth', 'verified'])->name('MeuEstabelecimento');

Route::get('/CadastroFornecedor', function (){
    return Inertia::render('CadastroFornecedor/cadastrofornecedor');
})->middleware(['auth', 'verified'])->name('CadastroFornecedor');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
