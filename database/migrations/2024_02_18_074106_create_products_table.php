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
        Schema::create('product', function (Blueprint $table) {
            $table->string('product_code', 18);
            $table->string('product_name', 30);
            $table->bigInteger('price',false,true);
            $table->string('currency', 5);
            $table->integer('discount',false,true);
            $table->string('dimension', 50);
            $table->string('unit', 5);

            $table->primary('product_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
