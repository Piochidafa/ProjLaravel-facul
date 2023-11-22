<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class estabelecimento extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "estabelecimentos";
    protected $fillable = [
        'user_id',
        'endereco_id',
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'telefone',
        'inactivated_at',
        'updated_at',
        'created_at'
    ];

    public function endereco()
    {
        return $this->hasOne(endereco::class, 'endereco_id');
    }

}
