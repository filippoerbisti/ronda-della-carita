<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => 'required | email',
            "password" => 'required | min:8',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            return response()->json([
                "user" => $user,
                "status" => "logged_in"
            ], 200);
        }

        return response()->json("Wrong credentials", 401);
    }

    public function register(Request $request)
    {
        $validator = FacadesValidator::make($request->all(), [
            'nome' => 'required | string | between:2,100',
            'cognome' => 'required | string | between:2,100',
            'email' => 'required | string | email | max:100',
            'password' => 'required | string | min:8',
            // 'ruolo' => 'required | string',
            // 'n_tessera' => 'required | number'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $n_tessera = count(User::get());

        $user = User::create(array_merge(
            $validator->validated(),
            ['ruolo' => 'Interno'],
            ['n_tessera' => $n_tessera++],
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return "Logged out";
    }

    public function me(Request $request)
    {
        return $request->user();
        // $request->session()->regenerate();
        // $user = Auth::user();

        //     return response()->json([
        //         "user" => $user,
        //         "status" => "logged_in"
        //     ], 200);
    }
}
