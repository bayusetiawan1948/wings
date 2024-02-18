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
        Schema::create('transaction_header', function (Blueprint $table) {
            $table->string('document_code', 3);
            $table->string('document_number', 10);
            $table->string('user', 50);
            $table->integer('total', false,true);
            $table->date('date', 10);

            $table->index('document_code');
            $table->index('document_number');
            $table->primary(['document_code', 'document_number']);

            $table->foreign('user')->references('user')->on('login')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_header');
    }
};
