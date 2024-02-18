<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    function getProduct() {
        try {
            $data = Product::select(DB::raw('product_code as productCode, product_name as productName, price, cast(price - ((price / 100) * discount) as UNSIGNED) as priceAfterDiscount, discount, dimension, unit'))
                ->get();
        return $this->sendResponse(200, $data);
        } catch (\Throwable $th) {
            return $this->sendError($th);
        }
    }
}
