<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function sendResponse($code = 200, $result)
    {
        $response = [
            'data' => $result,
        ];
        return response()->json($response, $code);
    }

    public function sendError($errorMessage, $code = 500)
    {
        $response = [
            'message' => $errorMessage,
        ];
        return response()->json($response, $code);
    }

    public function generateToken() 
    {
        $randomString = Str::random(10);
        $mixTime = rand(1, 9999) . date("Ymdhis") . rand(1, 9999) . $randomString;
        $hash = hash('sha256', $mixTime);
        $result = base64_encode($hash);

        return $result;
    }
}
