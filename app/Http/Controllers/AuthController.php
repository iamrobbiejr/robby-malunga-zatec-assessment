<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(SignUpRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(LogInRequest $request)
    {

        $credentials = $request->validated();
        $rememberMe = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $rememberMe)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token
        ]);


    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        // Revoke the token
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
