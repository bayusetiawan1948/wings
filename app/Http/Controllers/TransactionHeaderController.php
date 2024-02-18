<?php

namespace App\Http\Controllers;

use App\Models\Login;
use App\Models\Product;
use Illuminate\Http\Request;
use Termwind\Components\Raw;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use Illuminate\Support\Facades\DB;

class TransactionHeaderController extends Controller
{
    function createTransaction(Request $request) {
        try {
            $token = $request->header('token');
            
            if(empty($token)){
                return $this->sendError('Token Needed');
            }
        
            $user = Login::where('token', $token)->first();
        
            if(empty($user)){
                return $this->sendError('Token Needed');
            }
        
            $input = $request->input('transaction');
            if(empty($input) && is_array($input) !== 1){
                return $this->sendError('transaction input is needed');
            }

            if(count($input) <= 0){
                return $this->sendError('transaction input is needed');
            }

            $groupingToInsertDetail = [];
            $documentCode = 'TRX';
            $templateDocumentNumber = '000';
            $sumAll = 0;
            $manyId = TransactionHeader::select('document_number')->count() + 1;
            $manyIdAsString = strlen((string) $manyId);
            $convertToFormat = substr($templateDocumentNumber, strlen($templateDocumentNumber) - $manyIdAsString);
            $documentNumber = $convertToFormat . (string) $manyId;
            foreach ($input as $key => $value) {
                // dd($value);
                $checkProduct = Product::select(DB::Raw('product_code, product_name, price, cast(price - ((price / 100) * discount) as UNSIGNED) as priceAfterDiscount, currency, discount, dimension, unit'))
                        ->where('product_code', $value['productCode'])
                        ->get();
                        // dd($checkProduct[0]->priceAfterDiscount);
                if(empty($checkProduct[0])){
                    return $this->sendError('Product not found', 400);
                }
                if($value['qty'] <= 0){
                    return $this->sendError('quantity only have more than zero');
                }
                
                $sumProduct = $checkProduct[0]->priceAfterDiscount * $value['qty'];
                $sumAll = $sumAll + $sumProduct;
                array_push($groupingToInsertDetail, [
                    'document_code' => $documentCode,
                    'document_number' => $documentNumber,
                    'product_code' => $checkProduct[0]->product_code,
                    'price'=> $checkProduct[0]->priceAfterDiscount,
                    'quantity' => $value['qty'],
                    'unit' => $value['unit'],
                    'subtotal' => $sumProduct,
                    'currency' => $checkProduct[0]->currency
                ]);
            }
        
            $insertHead = [
                'document_code' => $documentCode,
                'document_number' => $documentNumber,
                'user' => $user->user,
                'total' => $sumAll,
                'date' => date("Y-m-d")
            ];
        
            TransactionHeader::create($insertHead);
            TransactionDetail::insert($groupingToInsertDetail);
            return $this->sendResponse(200, 'Succesfull create transaction');
        } catch (\Throwable $th) {
            return $this->sendError($th);
        }
    }

    public function report(Request $request) {
        $data = TransactionHeader::getSalesReport();
        return $this->sendResponse(200, $data);
    }
}
