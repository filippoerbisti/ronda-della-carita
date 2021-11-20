<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function list() {
        return Order::with('client')->with('user')->get();
    }

    public function countOrderInAttesa() {
        return Order::with('client')->with('user')->where('status', '=', 'In attesa')->count();
    }

    public function countOrderNonDisp() {
        return Order::with('client')->with('user')->where('status', '=', 'Non disponibile')->count();
    }

    // public function fastSearch($fastsearch) {
    //     $search = Order::with('client')
    //                     ->with('user')
    //                     ->where('p_ritiro', '=', $fastsearch)
    //                     ->orWhere('n_ordine', '=', $fastsearch)
    //                     ->orWhere('t_vestiario', '=', $fastsearch)
    //                     ->orWhere('taglia', '=', $fastsearch)
    //                     ->get();
    //     return $search;
    // }

    public function filter($search, $status) {
        $order = Order::query()
                        ->when(!empty($search), function ($query) use ($search) {
                            $query->with('client')
                                    ->with('user')
                                    ->where('p_ritiro', 'LIKE', "%$search%")
                                    ->orWhere('n_ordine', 'LIKE', "%$search%")
                                    ->orWhere('t_vestiario', 'LIKE', "%$search%")
                                    ->orWhere('taglia', '=', "$search")
                                    ->get();
                        })
                        ->when(!empty($search), function ($query) use ($status) {
                            $query->with('client')
                                    ->with('user')
                                    ->where('status', '=', $status)
                                    ->get();
                        })
                        ->orderBy('created_at', 'DESC')
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
        // if ($search == "" && $status == "") {
        //     $order = Order::with('client')
        //                     ->with('user')
        //                     ->get();
        //     return $order;
        // }
        // else {
        //     $order = Order::with('client')
        //                     ->with('user')
        //                     ->get();
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
