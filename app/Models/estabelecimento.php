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
    protected $table = "estabelecimento";
    protected $fillable = [
        'filial_id',
        'nome_estabelecimento',
        'cnpj',
        'telefone',
    ];

    public function filial()
    {
        return $this->hasMany(filial::class);
    }

}