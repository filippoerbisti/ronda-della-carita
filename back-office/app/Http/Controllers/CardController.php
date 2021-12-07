<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function list() {
        return Card::all();
    }

    private function pairing($newCard, $newCardData) {
        $newCard->n_tessera = $newCardData->n_tessera;
        $newCard->created_at = $newCardData->created_at;
        $newCard->update_at = $newCardData->update_at;
        $newCard->user_id = $newCardData->user_id;
        $newCard->client_id = $newCardData->client_id;

        $newCard->save();
        return $newCard;
    }

    public function create(Request $request) {
        $newCardData = json_decode($request->getContent());
        $newCard = new Card();   

        $newCard = $this->pairing($newCard, $newCardData);
        return $newCard;
    }

    public function edit(Request $request, $id) {
        $card = Card::find($id);
        $newCardData = json_decode($request->getContent());   

        $card = $this->pairing($card, $newCardData);
        return $card;
    }

    public function delete($id) {
        $card = Card::where("id", $id)
                    ->foreign('user_id')
                    ->references('id')->on('users')
                    ->foreign('client_id')
                    ->references('id')->on('clients')
                    ->onDelete('cascade');

        return $card;
    }
}
