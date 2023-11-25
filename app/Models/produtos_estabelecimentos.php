<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produtos_estabelecimentos extends Model
{
    use HasFactory;

    protected $table = "produtos_estabelecimento";
    protected $fillable = [
        'produto_id',
        'estabelecimento_id',
        'preco',
        'fornecedor_id',
        'updated_at',
        'created_at',
    ];
}