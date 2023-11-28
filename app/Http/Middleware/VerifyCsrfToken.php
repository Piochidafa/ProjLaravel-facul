<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'a/estabelecimento',
        'a/estabelecimento/*',
        'a/*',
        'a/estabelecimento/endereco',
        "c/*",
        'b/produto',
        'b/*',
        'a/estabelecimentoAtualizar/{id}',
        'a/estabelecimentoDelete/{id}',
    ];
}
