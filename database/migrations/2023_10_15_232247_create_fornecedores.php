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
        Schema::create('fornecedores', function (Blueprint $table) {
            $table->id('id');
            $table->string('razao_social');
            $table->string('telefone');
            $table->string('cnpj');
            $table->string('marca');
            $table->string('email');
            $table->string('web_site');
            $table->unsignedBigInteger('endereco_id');
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('created_at')->now();
            $table->dateTime('inactivated_at')->nullable();
            $table->foreign('endereco_id')->references('id')->on('endereco');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fornecedores');
    }
};