<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    public $timestamps = false;
    protected $primarykey = 'product_code';
    public $incrementing = false;

    protected $fillable = [
        "product_code",
"product_name",
"price",
"currency",
"discount",
"dimension",
"unit",
    ];
}
