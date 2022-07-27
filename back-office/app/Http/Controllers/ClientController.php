<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Document;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function list() 
    {
        return Client::with('user')
                    ->with([
                        'document',
                        'history'
                        ])
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
        $client = Client::with(['user', 'document', 'history'])
                        ->where('nome', 'LIKE', "%$search%")
                        ->orWhere('cognome', 'LIKE', "%$search%")
                        ->orWhere('nazionalita', 'LIKE', "%$search%")
                        ->orWhere('genere', 'LIKE', "%$search%")
                        ->orWhere('n_tessera', 'LIKE', "%$search%")
                        // ->join('documents', 'clients.document_id', '=', 'documents.id')
                        // ->orWhere('n_doc', 'LIKE', "%$search%")
                        ->get();
        return $client;
    }

    private function pairing($newClient, $newClientData, $newDocument) 
    {        

        $newClient->nome = $newClientData->nome;
        $newClient->cognome = $newClientData->cognome;
        $newClient->n_tessera = $newClientData->n_tessera;
        $newClient->genere = $newClientData->genere;
        $newClient->altezza = $newClientData->altezza;
        $newClient->nazionalita = $newClientData->nazionalita;
        $newClient->t_maglietta = $newClientData->t_maglietta;
        $newClient->t_pantaloni = $newClientData->t_pantaloni;
        $newClient->t_scarpe = $newClientData->t_scarpe;
        $newClient->note = $newClientData->note;
        // $newClient->created_at = $newClientData->created_at;
        // $newClient->updated_at = $newClientData->updated_at;
        $newClient->user_id = $newClientData->user_id;

        $newDocument->n_doc = $newClientData->n_documento ?? null;
        $newDocument->t_doc = $newClientData->t_documento ?? null;
        $newDocument->save();

        $newClient->document_id = $newDocument->id;
        $newClient->save();
        return $newClient;
    }

    public function create(Request $request) 
    {
        $newClientData = json_decode($request->getContent());
        // $newClientData->created_at = Carbon::now();
        // $newClientData->updated_at = Carbon::now();
        $newClient = new Client();
        $newDocument = new Document();

        $newClient = $this->pairing($newClient, $newClientData, $newDocument);
        return $newClient;
    }

    public function edit(Request $request, $id) 
    {
        $client = Client::find($id);
        $document = Document::find($client->document_id) ?? new Document();
        $newClientData = json_decode($request->getContent());   

        $client = $this->pairing($client, $newClientData, $document);
        return $client;
    }

    public function getClientByTessera($n_tessera) {
        return Client::where('n_tessera', $n_tessera)
                    ->with('user')
                    ->with('document')
                    ->first();
    }

    public function delete($id) 
    {
        $client = Client::where("id", $id)->delete();

        return $client;
    }

    public function updateSizes($id, Request $req) {

        $data = json_decode($req->getContent());

        $client = Client::where("id", $id)->update([
            "t_maglietta" => $data->t_maglietta,
            "t_pantaloni" => $data->t_pantaloni,
            "t_scarpe" => $data->t_scarpe,
            "altezza" => $data->altezza
        ]);

        return $client;
    }

    public function getLastTessera() {
        return Client::max("n_tessera") +1;
    }
}
