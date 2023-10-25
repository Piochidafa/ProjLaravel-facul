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
        Schema::create("fornecedor", function (Blueprint $table) {
            $table->id();
            $table->string("razao_social");
            $table->string("cnpj");
            $table->string("email");
            $table->string("web_site");
            $table->dateTime("updated_at");
            $table->dateTime("created_at");
            $table->dateTime('inactivated_at')->nullable();
            $table->string("endereco_id")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fornecedor');
    }
};