<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class filial extends Model
{
    use HasFactory;

    protected $fillable = [
        'endereco_id',
        'telefone',
    ];

    public function endereco(){
        return $this->hasOne(endereco::class);
    }

}
