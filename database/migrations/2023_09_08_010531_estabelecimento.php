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
        Schema::create('estabelecimento', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('filial_id')->nullable();
            $table->string('nome_estabelecimento');
            $table->string('cnpj')->unique();
            $table->string('telefone')->unique();
            $table->timestamps();

            $table->foreign('filial_id')->references('id')->on('filial');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estabelecimento');
        
    }
};

