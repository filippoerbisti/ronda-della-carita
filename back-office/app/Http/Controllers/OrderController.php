<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function list() {
        return Order::with('client')->with('user')->get();
    }

    public function filter($search) {
        $order = Order::with('client')
                            ->with('user')
                            ->where('p_ritiro', '=', $search)
                            ->orWhere('n_ordine', '=', $search)
                            ->orWhere('t_vestiario', '=', $search)
                            ->orWhere('taglia', '=', $search)
                            ->where('status', '=', $search)
                            ->get();
            return $order;
        // if ($status == "" && $search != "") {
        //     $order = Order::with('client')
        //                     ->with('user')
        //                     ->where('p_ritiro', '=', $search)
        //                     ->orWhere('n_ordine', '=', $search)
        //                     ->orWhere('t_vestiario', '=', $search)
        //                     ->orWhere('taglia', '=', $search)
        //                     ->get();
        //     return $order;
        // }
        // if ($search == "" && $status != "") {
        //     $order = Order::with('client')
        //                     ->with('user')
        //                     ->where('status', '=', $status)
        //                     ->get();
        //     return $order;
        // }
    }

    private function pairing($newOrder, $newOrderData) {
        $newOrder->n_ordine = $newOrderData->n_ordine;
        $newOrder->p_ritiro = $newOrderData->p_ritiro;
        $newOrder->genere = $newOrderData->genere;
        $newOrder->t_vestiario = $newOrderData->t_vestiario;
        $newOrder->taglia = $newOrderData->taglia;
        $newOrder->quantita = $newOrderData->quantita;
        $newOrder->status = $newOrderData->status;
        $newOrder->note = $newOrderData->note;
        $newOrder->created_at = $newOrderData->created_at;
        $newOrder->update_at = $newOrderData->update_at;
        $newOrder->user_id = $newOrderData->user_id;
        $newOrder->client_id = $newOrderData->client_id;

        $newOrder->save();
        return $newOrder;
    }

    public function create(Request $request) {
        $newOrderData = json_decode($request->getContent());
        $newOrder = new Order();   

        $newOrder = $this->pairing($newOrder, $newOrderData);
        return $newOrder;
    }

    public function modify(Request $request, $id) {
        $order = Order::find($id);
        $newOrderData = json_decode($request->getContent());   

        $order = $this->pairing($order, $newOrderData);
        return $order;
    }

    public function delete(Request $request, $id) {
        $order = Order::where("id", $id)->delete();

        return $order;
    }
}
