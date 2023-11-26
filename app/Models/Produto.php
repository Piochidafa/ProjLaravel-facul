<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\fornecedor;
use App\Models\estabelecimento;
use App\Models\produtosestabelecimentos;


class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos';
    protected $fillable = [
        'id',
        'nome_produto',
        'preco',
        'descricao',
        'peso',
        'material',
        'tamanho',
        'variacao',
        'unidade',
        'categoria',
        'fornecedor_id',
        'estabelecimento_id',
        'updated_at',
        'created_at',
    ];

    public function fornecedor()
    {
        return $this->belongsTo(fornecedor::class);
    }

    public function estabelecimento()
    {
        return $this->belongsTo(estabelecimento::class);
    }
}
