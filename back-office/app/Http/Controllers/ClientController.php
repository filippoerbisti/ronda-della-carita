<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function list() {
        return Client::with('user')->get();
    }

    public function id($id) {
        return Client::with('user')
                        ->where('id', '=', $id)
                        ->get();
    }

    public function filter($search) {
        $client = Client::with('user')
                            ->where('nome', 'LIKE', "%$search%")
                            ->orWhere('cognome', 'LIKE', "%$search%")
                            ->orWhere('n_documento', 'LIKE', "%$search%")
                            ->orWhere('nazionalita', 'LIKE', "%$search%")
                            ->get();
        return $client;
    }

    private function pairing($newClient, $newClientData) {
        $newClient->nome = $newClientData->nome;
        $newClient->cognome = $newClientData->cognome;
        $newClient->genere = $newClientData->genere;
        $newClient->n_documento = $newClientData->n_documento;
        $newClient->t_documento = $newClientData->t_documento;
        $newClient->nazionalita = $newClientData->nazionalita;
        $newClient->t_maglietta = $newClientData->t_maglietta;
        $newClient->t_pantaloni = $newClientData->t_pantaloni;
        $newClient->t_scarpe = $newClientData->t_scarpe;
        $newClient->note = $newClientData->note;
        $newClient->created_at = $newClientData->created_at;
        $newClient->update_at = $newClientData->update_at;
        $newClient->user_id = $newClientData->user_id;

        $newClient->save();
        return $newClient;
    }

    public function create(Request $request) {
        $newClientData = json_decode($request->getContent());
        $newClient = new Client();   

        $newClient = $this->pairing($newClient, $newClientData);
        return $newClient;
    }

    public function modify(Request $request, $id) {
        $client = Client::find($id);
        $newClientData = json_decode($request->getContent());   

        $client = $this->pairing($client, $newClientData);
        return $client;
    }

    public function delete(Request $request, $id) {
        $client = Client::where("id", $id)->delete();

        return $client;
    }
}
