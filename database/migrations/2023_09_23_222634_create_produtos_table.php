<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produto', function (Blueprint $table) {
            $table->id();
            $table->string('produto_nome');
            $table->string('produto_preco');
            $table->string('produto_descricao');
            $table->string('produto_peso');
            $table->string('produto_tamanho');
            $table->string('produto_material');
            $table->string('produto_categoria');
            $table->string('produto_fornecedor');
            $table->string('produto_descricao');
            $table->string('produto_material');
            $table->string('produto_peso');
            $table->string('produto_tamanho');
            $table->string('categoria_id');
            $table->string('fornecedor_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto');
    }
};
