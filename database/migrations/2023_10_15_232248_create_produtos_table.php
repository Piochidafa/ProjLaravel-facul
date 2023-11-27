<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('nome_produto');
            $table->unsignedBigInteger("estabelecimento_id");
            $table->unsignedBigInteger("fornecedor_id");
            $table->integer('preco');
            $table->string("descricao")->nullable();
            $table->string('categoria');
            $table->string('peso')->nullable();
            $table->string('material')->nullable();
            $table->string('tamanho')->nullable();
            $table->string('variacao')->nullable();
            $table->integer('unidade')->nullable();
            $table->dateTime('updated_at');
            $table->dateTime('created_at');
            $table->foreign('estabelecimento_id')->references('id')->on('estabelecimento');
            $table->foreign('fornecedor_id')->references('id')->on('fornecedores');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
