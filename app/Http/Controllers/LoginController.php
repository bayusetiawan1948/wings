<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    function login(Request $request) {
        try {
            $validated = Validator::make($request->all(), [
                'username' => 'required|string|max:50',
                'password' => 'required|string|max:255'
            ]);
    
            if($validated->fails()){
                return $this->sendError($validated->errors(), 400);
            }
    
            $username = $request->input('username');
            $password = $request->input('password');
    
            $checkData = Login::where('user', $username)->first();
    
            if(empty($checkData)){
                return $this->sendError('Username or password wrong, please try again', 400);
            }
    
            if($checkData->password !== $password){
                return $this->sendError('Username or password wrong, please try again', 400);
            }
    
            $token = $this->generateToken();
            $data = [
                'user' => $checkData->user,
                'password' => $checkData->password,
                'token' => $token
            ];
            Login::where('user', $checkData->user)->update($data);
            return $this->sendResponse(200, [
                'token' => $token
            ]);
        } catch (\Throwable $th) {
            return $this->sendError('internal error');
        }
    }

    function logout(Request $request) {
        try {
            $token = $request->header('token');
            if(empty($token)){
                return $this->sendError('Token required', 400);
            }
            $checkData = Login::where('token', $token)->first();
    
            if(empty($checkData)){
                return $this->sendError('Username or password wrong, please try again', 400);
            }

            $data = [
                'user' => $checkData->user,
                'password' => $checkData->password,
                'token' => ''
            ];
    
            Login::where('user', $checkData->user)->update($data);
    
            return $this->sendResponse(200, 'Susscefully logout');
        } catch (\Throwable $th) {
            return $this->sendError('internal error');
        }
    }
}
