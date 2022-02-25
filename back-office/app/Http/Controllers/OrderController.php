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
            $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
            for($y = 0; $y < count($orders[$i]->clothes); $y++){
                $priorita[$orders[$i]->clothes[$y]->param->value] = $priorita[$orders[$i]->clothes[$y]->param->value] + 1;
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

    public function id($id) 
    {
        return Order::with('client')
                    ->with('user')
                    ->where('id', $id)
                    ->first();
    }

    public function countOrderInAttesa() 
    {
        return Clothe::join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'attesa')
                        ->count();
    }

    public function orderInAttesa() 
    {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'attesa')
                        ->get();
    }

    public function countOrderNonDisp() 
    {
        return Clothe::join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'no_disp')
                        ->count();
    }

    public function orderNonDisp() 
    {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'no_disp')
                        ->get();
    }

    public function countOrderDaConf() 
    {
        return Clothe::join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'da_conf')
                        ->count();
    }

    public function orderDaConf() 
    {
        return Clothe::with('order')
                        ->with('inventory')
                        ->with('param')
                        ->join('params', 'clothes.param_id', '=', 'params.id')
                        ->where('params.value', 'da_conf')
                        ->get();
    }

    public function filter($status, $search) 
    {
        if($search=="nu"){
            $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
            $search = "";
            $orders= Order::with('client') 
                            ->with('user')
                            ->get();
            if($status == "all"){
                for($i = 0; $i < count($orders); $i++){
                    $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
                    for($y = 0; $y < count($orders[$i]->clothes); $y++){
                        $priorita[$orders[$i]->clothes[$y]->param->value] = $priorita[$orders[$i]->clothes[$y]->param->value] + 1;
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
                $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
                for($y = 0; $y < count($orders[$i]->clothes); $y++){
                    $priorita[$orders[$i]->clothes[$y]->param->value] = $priorita[$orders[$i]->clothes[$y]->param->value] + 1;
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
            $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
            $orders= Order::with('client') 
                            ->with('user')
                            ->where('n_ordine','LIKE',"%$search%")
                            ->orWhere('p_ritiro','LIKE',"%$search%")
                            ->orWhere('note','LIKE',"%$search%")
                            ->get();
            if($status == "all"){
                for($i = 0; $i < count($orders); $i++){
                    $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
                    for($y = 0; $y < count($orders[$i]->clothes); $y++){
                        $priorita[$orders[$i]->clothes[$y]->param->value] = $priorita[$orders[$i]->clothes[$y]->param->value] + 1;
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
                $priorita = ['da_conf' => 0,'attesa' => 0,'cons' => 0,'no_disp' => 0];
                for($y = 0; $y < count($orders[$i]->clothes); $y++){
                    $priorita[$orders[$i]->clothes[$y]->param->value] = $priorita[$orders[$i]->clothes[$y]->param->value] + 1;
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

        // $ids = explode(",", $clothe);
        // Clothe::destroy($ids);

        // $ids = explode(",", $id);
        // $org->clothes()->whereIn('id', $ids)->delete();

        $order->delete();
    }

    public function showLabel($id) {
        $order = Order::find($id);
        
    }
}
