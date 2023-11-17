<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class endereco extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'enderecos';
    protected $fillable = [
        'estabelecimento_id',        
        'fornecedor_id',        
        'bairro',
        'cep',
        'cidade',
        'estado',
    ];

}