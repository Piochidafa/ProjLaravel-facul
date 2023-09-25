<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

    class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos';
    protected fillable = [
        'id';
        'produto_nome';
        'produto_descricao';
        'produto_preco';
        'produto_material';
        'produto_tamanho';
        'produto_peso';
        ]
}
