<?php

namespace App\Http\Controllers;

use App\Models\Clothe;
use App\Models\Order;
use Illuminate\Foundation\Bus\PendingClosureDispatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function list() {
        $order= Order::with('client')
                    ->with('user')
                    ->get();
        for($i=0;$i<count($order);$i++){
            $id=$order[$i]->id;
            $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
            $order[$i]->setAttribute("n_clothes",$n_clothes);
        }
        return $order;
    }

    public function id($id) {
        return Order::with('client')
                    ->with('user')
                    ->where('id', $id)
                    ->first();
    }

    public function countOrderInAttesa() {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->where('param_id', 9)
                        ->count();
    }

    public function countOrderNonDisp() {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->where('param_id', 8)
                        ->count();
    }

    public function countOrderDaConf() {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->where('param_id', 10)
                        ->count();
    }

    public function filter($status) {
        $search = "";
        $status = json_decode($status);
        /*return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->join('params','clothes.param_id','=','params.id')
                        ->where('value',"cons")
                        ->get();*/
        if ($status != "all" ) {
            $order = Clothe::with('order')
                            ->with('inventory')
                            ->with('param')
                            ->join('params', 'clothes.param_id', '=', 'params.id')
                            ->where('value', $status)
                            ->get();
        } else if ($search != null) {
            $order = Order::with('client')
                            ->with('user') 
                            ->with('param')
                            ->with('clothe')
                            ->where('p_ritiro', 'LIKE', "%$search%")
                            ->orWhere('n_ordine', '=', "%$search%")
                            ->join('params', 'orders.param_id', '=', 'params.id')
                            ->orwhere('value', 'LIKE', "%$search%")
                            ->join('clothes', 'orders.param_id', '=', 'clothes.id')
                            ->orWhere('taglia', '=', "$search")
                            ->get();
        } else {
            $order = Order::with('client')
                            ->with('user')
                            ->with('param')
                            ->with('clothe')
                            ->get();
        }
        return $order;
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

    public function edit(Request $request, $id) {
        $order = Order::find($id);
        $newOrderData = json_decode($request->getContent());   

        $order = $this->pairing($order, $newOrderData);
        return $order;
    }

    public function delete($id) {
        $order = Order::where("id", $id)
                        ->foreign('user_id')
                        ->references('id')->on('users')
                        ->foreign('client_id')
                        ->references('id')->on('clients')
                        ->onDelete('cascade');
        return $order;
    }
}
