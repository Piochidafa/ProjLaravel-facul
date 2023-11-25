<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fornecedor extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = "fornecedores";
    protected $fillable = [
        'razao_social',
        'telefone',
        'marca',
        'web_site',
        'cnpj',
        'email',
        'updated_at',
        'created_at',
        'inactivated_at',
        'endereco_id'
    ];

    public function endereco()
    {
        return $this->hasOne(endereco::class);
    }
}