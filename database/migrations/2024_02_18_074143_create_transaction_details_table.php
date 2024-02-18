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
        Schema::create('transaction_detail', function (Blueprint $table) {
            $table->string('document_code', 3);
            $table->string('document_number', 10);
            $table->string('product_code', 18);
            $table->bigInteger('price',false,true);
            $table->bigInteger('quantity',false,true);
            $table->string('unit', 5);
            $table->integer('subtotal', false, true);
            $table->string('currency', 5);
            
            $table->foreign('document_code')->references('document_code')->on('transaction_header')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('document_number')->references('document_number')->on('transaction_header')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('product_code')->references('product_code')->on('product')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_detail');
    }
};
