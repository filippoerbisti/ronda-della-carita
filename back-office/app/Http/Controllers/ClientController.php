<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function list() 
    {
        return Client::with('user')
                    ->with('document')
                    ->get();
    }

    public function id($id) 
    {
        return Client::where('id', $id)
                    ->with('user')
                    ->with('document')
                    ->first();
    }

    public function filter($search) 
    {
        $client = Client::with('user')
                        ->with('document')
                        ->where('nome', 'LIKE', "%$search%")
                        ->orWhere('cognome', 'LIKE', "%$search%")
                        ->orWhere('nazionalita', 'LIKE', "%$search%")
                        ->orWhere('genere', 'LIKE', "%$search%")
                        ->orWhere('n_tessera', 'LIKE', "%$search%")
                        ->join('documents', 'clients.document_id', '=', 'documents.id')
                        ->orWhere('n_documento', 'LIKE', "%$search%")
                        ->get();
        return $client;
    }

    private function pairing($newClient, $newClientData) 
    {        

        $newClient->nome = $newClientData->nome;
        $newClient->cognome = $newClientData->cognome;
        $newClient->n_tessera = $newClientData->n_tessera;
        $newClient->genere = $newClientData->genere;
        // $newClient->altezza = $newClientData->altezza;
        $newClient->nazionalita = $newClientData->nazionalita;
        $newClient->t_maglietta = $newClientData->t_maglietta;
        $newClient->t_pantaloni = $newClientData->t_pantaloni;
        $newClient->t_scarpe = $newClientData->t_scarpe;
        $newClient->note = $newClientData->note;
        // $newClient->created_at = $newClientData->created_at;
        // $newClient->updated_at = $newClientData->updated_at;
        $newClient->user_id = $newClientData->user_id;


        $newClient->save();
        return $newClient;
    }

    public function create(Request $request) 
    {
        $newClientData = json_decode($request->getContent());
        // $newClientData->created_at = Carbon::now();
        // $newClientData->updated_at = Carbon::now();
        $newClient = new Client();

        $newClient = $this->pairing($newClient, $newClientData);
        return $newClient;
    }

    public function edit(Request $request, $id) 
    {
        $client = Client::find($id);
        $newClientData = json_decode($request->getContent());   

        $client = $this->pairing($client, $newClientData);
        return $client;
    }

    public function delete($id) 
    {
        $client = Client::where("id", $id)->delete();

        return $client;
    }
}
