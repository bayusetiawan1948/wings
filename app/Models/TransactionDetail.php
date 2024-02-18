<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;
    protected $table = 'transaction_detail';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
    "document_code",
    "document_number",
    "product_code",
    "price",
    "quantity",
    "unit",
    "subtotal",
    "currency"
];
}
