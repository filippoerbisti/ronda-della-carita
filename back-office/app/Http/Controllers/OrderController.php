<?php

namespace App\Http\Controllers;

use App\Models\Clothe;
use App\Models\Order;
use Illuminate\Http\Request;
use Mockery\Undefined;

class OrderController extends Controller
{
    public function list() 
    {
        $orders = Order::with('client')
            ->with('user')
            ->get();
        for($i = 0; $i < count($orders); $i++){
            $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
            for($y = 0; $y < count($orders[$i]->clothes); $y++){
                $priorita[$orders[$i]->clothes[$y]->status] = $priorita[$orders[$i]->clothes[$y]->status] + 1;
            }
            foreach($priorita as $key=> $item){
                if($item > 0){
                    $orders[$i]->setAttribute("status", $key);
                    break;
                }
            }
            $id = $orders[$i]->id;
            $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
            $orders[$i]->setAttribute("n_clothes",$n_clothes);
        }
        return $orders;
    }

    public function id($n_ordine) 
    {
        return Order::with('client')
                    ->with('user')
                    ->where('n_ordine', $n_ordine)
                    ->first();
    }
    public function history($id){
        return Order::with('client')
                    ->where('client_id',$id)
                    ->get();
    }

    public function countOrderInAttesa() 
    {
        $status = 'Attesa';

        return Clothe::where('status', $status)
                        ->count();
    }

    public function orderInAttesa() 
    {
        $status = 'Attesa';

        return Clothe::with('order')
                        ->where('status', $status)
                        ->get();
    }

    public function countOrderNonDisp() 
    {
        $status = 'Non disponibile';

        return Clothe::where('status', $status)
                        ->count();
    }

    public function orderNonDisp() 
    {
        $status = 'Non disponibile';

        return Clothe::with('order')
                        ->where('status', $status)
                        ->get();
    }

    public function countOrderDaConf() 
    {
        $status = 'Da confermare';

        return Clothe::where('status', $status)
                        ->count();
    }

    public function orderDaConf() 
    {
        $status = 'Da confermare';

        return Clothe::with('order')
                        ->where('status', $status)
                        ->get();
    }

    public function filter($status, $search) 
    {
        if($search=="nu"){
            $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
            $search = "";
            $orders= Order::with('client') 
                            ->with('user')
                            ->get();
            if($status == "all"){
                for($i = 0; $i < count($orders); $i++){
                    $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
                    for($y = 0; $y < count($orders[$i]->clothes); $y++){
                        $priorita[$orders[$i]->clothes[$y]->status] = $priorita[$orders[$i]->clothes[$y]->status] + 1;
                    }
                    foreach($priorita as $key=> $item){
                        if($item > 0){
                            $orders[$i]->setAttribute("status", $key);
                            break;
                        }
                    }
                    $id = $orders[$i]->id;
                    $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
                    $orders[$i]->setAttribute("n_clothes",$n_clothes);
                }
                return $orders;
            }
            for($i = 0; $i < count($orders); $i++){
                $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
                for($y = 0; $y < count($orders[$i]->clothes); $y++){
                    $priorita[$orders[$i]->clothes[$y]->status] = $priorita[$orders[$i]->clothes[$y]->status] + 1;
                }
                foreach($priorita as $key=> $item){
                    if($item > 0){
                        $orders[$i]->setAttribute("status", $key);
                        break;
                    }
                }
            }
            for($i = 0; $i < count($orders); $i++){
                $id = $orders[$i]->id;
                $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
                $orders[$i]->setAttribute("n_clothes",$n_clothes);
            }
            $temp = [];
            for($i = 0; $i < count($orders); $i++){
                if($orders[$i]->status == $status){
                    $temp[count($temp)] = $orders[$i];
                }
            }
            return $temp;
        }else if($search!="nu"){
            $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
            $orders= Order::with('client') 
                            ->with('user')
                            ->where('n_ordine','LIKE',"%$search%")
                            ->orWhere('p_ritiro','LIKE',"%$search%")
                            ->orWhere('note','LIKE',"%$search%")
                            ->get();
            if($status == "all"){
                for($i = 0; $i < count($orders); $i++){
                    $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
                    for($y = 0; $y < count($orders[$i]->clothes); $y++){
                        $priorita[$orders[$i]->clothes[$y]->status] = $priorita[$orders[$i]->clothes[$y]->status] + 1;
                    }
                    foreach($priorita as $key=> $item){
                        if($item > 0){
                            $orders[$i]->setAttribute("status", $key);
                            break;
                        }
                    }
                    $id = $orders[$i]->id;
                    $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
                    $orders[$i]->setAttribute("n_clothes",$n_clothes);
                }
                return $orders;
            }
            for($i = 0; $i < count($orders); $i++){
                $priorita = ['Da confermare' => 0,'Attesa' => 0,'Consegnato' => 0,'Non disponibile' => 0];
                for($y = 0; $y < count($orders[$i]->clothes); $y++){
                    $priorita[$orders[$i]->clothes[$y]->status] = $priorita[$orders[$i]->clothes[$y]->status] + 1;
                }
                foreach($priorita as $key=> $item){
                    if($item > 0){
                        $orders[$i]->setAttribute("status", $key);
                        break;
                    }
                }
            }
            for($i = 0; $i < count($orders); $i++){
                $id = $orders[$i]->id;
                $n_clothes = Clothe::where('order_id',$id)->sum('quantita');
                $orders[$i]->setAttribute("n_clothes",$n_clothes);
            }
            $temp = [];
            for($i = 0; $i < count($orders); $i++){
                if($orders[$i]->status == $status){
                    $temp[count($temp)] = $orders[$i];
                }
            }
            return $temp;
        }
    }

    private function pairing($newOrder, $newOrderData) 
    {
        $newOrder->n_ordine = $newOrderData->n_ordine;
        $newOrder->p_ritiro = $newOrderData->p_ritiro;
        $newOrder->livello = $newOrderData->livello;
        $newOrder->note = $newOrderData->note;
        $newOrder->created_at = $newOrderData->created_at;
        $newOrder->update_at = $newOrderData->update_at;
        $newOrder->user_id = $newOrderData->user_id;
        $newOrder->client_id = $newOrderData->client_id;

        $newOrder->save();
        return $newOrder;
    }

    public function create(Request $request) 
    {
        $newOrderData = json_decode($request->getContent());
        $newOrder = new Order();   

        $newOrder = $this->pairing($newOrder, $newOrderData);
        return $newOrder;
    }

    public function edit(Request $request, $id) 
    {
        $order = Order::find($id);
        $newOrderData = json_decode($request->getContent());   

        $order = $this->pairing($order, $newOrderData);
        return $order;
    }

    public function delete($id) 
    {
        $order = Order::where("id", $id)->first();

        Clothe::where("order_id", $id)->delete();

        $order->delete();
    }

    public function showLabel($id) {
        $order = Order::find($id);
        
    }
}
