<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list()
    {
        return User::get();
    }

    public function id($id) 
    {
        return User::where('id', $id)
                    ->first();
    }

    public function anagrafica() 
    {
        return User::first();
    }

    public function filter($search)
    {
        $user = User::where('nome', 'LIKE', "%$search%")
                    ->orWhere('cognome', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('ruolo', 'LIKE', "%$search%")
                    ->orWhere('n_tessera', 'LIKE', "%$search%")
                    ->get();
        return $user;
    }

    private function pairing($newUser, $newUserData) 
    {
        $newUser->nome = $newUserData->nome ?? null;
        $newUser->cognome = $newUserData->cognome ?? null;
        $newUser->ruolo = $newUserData->ruolo ?? null;
        $newUser->n_tessera = $newUserData->n_tessera ?? null;
        $newUser->email = $newUserData->email ?? null;
        // $newUser->email_verified_at = $newUserData->email_verified_at ?? null;
        $newUser->password = $newUserData->password ?? null;
        // $newUser->remember_token = $newUserData->remember_token ?? null;

        $newUser->save();
        return $newUser;
    }

    public function create(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'cognome' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $newUserData = json_decode($request->getContent());
        $newUser = new User();

        $newUser = $this->pairing($newUser, $newUserData);
        return $newUser;
    }

    public function edit(Request $request, $id)
    {
        $user = User::find($id);
        $newUserData = json_decode($request->getContent());

        $user = $this->pairing($user, $newUserData);
        return $user;
    }

    public function delete($id)
    {
        $user = User::where("id", $id)->delete();

        return $user;
    }
}
