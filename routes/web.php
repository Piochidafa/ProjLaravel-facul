<?php

use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\EstabelecimentoController;
use App\Http\Controllers\FilialController;
use App\Http\Controllers\ProfileController;
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
    Route::get('/a', [EstabelecimentoController::class, 'index'])->name('estabelecimento.index');
    Route::post('/a/estabelecimento', [EstabelecimentoController::class, 'store'])->name('estabelecimento.store');

    Route::get('/a/filial/enderecoget', [EnderecoController::class, 'index'])->name('endereco.index');
    Route::post('/a/filial/endereco', [EnderecoController::class, 'store'])->name('endereco.store');

    Route::get('/a/filialget', [FilialController::class, 'index'])->name('filial.index');
    Route::post('/a/filial', [FilialController::class, 'store'])->name('filial.store');
});


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

Route::get('/Estabelecimento', function () {
    return Inertia::render('CadastroEstabelecimento/CadEstabelecimento');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';