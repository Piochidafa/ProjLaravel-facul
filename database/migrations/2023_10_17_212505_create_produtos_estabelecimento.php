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
        Schema::create("produtos_estabelecimento", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("preco")->default(0);
            $table->string("descricao");
            $table->dateTime("updated_at");
            $table->dateTime("created_at");
            $table->dateTime('inactivated_at')->nullable();
            // $table->unsignedBigInteger('produto_id');
            // $table->unsignedBigInteger('estabelecimento_id')->nullable();
            // $table->unsignedBigInteger('fornecedor_id');
            // $table->foreign("produto_id")->references("id")->on("produtos");
            // $table->foreign("estabelecimento_id")->references("id")->on("estabelecimentos");
            // $table->foreign("fornecedor_id")->references("id")->on("fornecedores");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos_estabelecimento');
    }
};
