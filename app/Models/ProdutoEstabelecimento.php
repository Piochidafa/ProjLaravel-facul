<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoEstabelecimento extends Model
{
    use HasFactory;

    protected $table = "produtos_estabelecimento";
    protected $fillable = [
        'descricao',
        'preco',
        'produto_id',
        // 'estabelecimento_id',
        'fornecedor_id',
        'updated_at',
        'created_at',
    ];
}
