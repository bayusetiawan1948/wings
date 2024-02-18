<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionHeaderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(LoginController::class)->group(function(){
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
});
Route::controller(ProductController::class)->group(function(){
    Route::get('/product', 'getProduct');
});
Route::controller(TransactionHeaderController::class)->group(function(){
    Route::post('/transaction', 'createTransaction');
    Route::get('/report', 'report');
});