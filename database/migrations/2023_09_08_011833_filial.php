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
        Schema::create('filial', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('endereco_id')->nullable();
            $table->string('telefone')->unique();
            $table->timestamps();

            $table->foreign('endereco_id')->references('id')->on('endereco');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filial');
    }
};
