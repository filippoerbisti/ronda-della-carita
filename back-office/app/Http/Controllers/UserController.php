<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list() {
        return User::all();
    }

    public function anagrafica() {
        //$id = 1;
        //return User::where('id', $id)->get();
        return User::first();
    }

    private function pairing($newUser, $newUserData) {
        $newUser->nome = $newUserData->nome;
        $newUser->cognome = $newUserData->cognome;
        $newUser->ruolo = $newUserData->ruolo;
        $newUser->interno = $newUserData->interno;
        $newUser->email = $newUserData->email;
        $newUser->email_verified_at = $newUserData->email_verified_at;
        $newUser->password = $newUserData->password;
        $newUser->remember_token = $newUserData->remember_token;
        $newUser->created_at = $newUserData->created_at;
        $newUser->update_at = $newUserData->update_at;

        $newUser->save();
        return $newUser;
    }

    public function create(Request $request) {
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

    public function modify(Request $request, $id) {
        $user = User::find($id);
        $newUserData = json_decode($request->getContent());   

        $user = $this->pairing($user, $newUserData);
        return $user;
    }

    public function delete(Request $request, $id) {
        $user = User::where("id", $id)->delete();

        return $user;
    }
}
