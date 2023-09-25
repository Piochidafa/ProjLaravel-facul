<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

    class Produto extends Model
{
    use HasFactory;

    protected $table = "produto";
    protected $fillable = [
        'produto_nome',
        'produto_preco',
        'produto_descricao',
        'produto_peso',
        'produto_tamanho',
        'produto_material',
        'produto_categoria',
        'produto_fornecedor',
    ];
}
