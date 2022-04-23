<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Clothe;
use App\Models\ClotheType;
use App\Models\Order;
use App\Models\Stage;
use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{

    public function list()
    {
        $orders = Order::with('client')
            ->with('user')
            ->get();
        return $this->setOrdersStatus($orders);
    }

    public function id($id)
    {
        return Order::with('client')
            ->with('user')
            ->where('id', $id)
            ->first();
    }

    // public function n_ordine($n_ordine)
    // {
    //     return Order::with('client')
    //         ->with('user')
    //         ->where('n_ordine', $n_ordine)
    //         ->first();
    // }

    // Generate PDF
    public function createPDF($id)
    {
        $orderPDF = Order::with(['user', 'client'])->where('id', $id)->first();
        $clothe = Clothe::where('order_id', $id)->get();
        $client = Client::where('id', $orderPDF->client_id)->first();
        $formatted_date = substr($orderPDF->created_at, 0, -9);

        $data = [
            'order' => $orderPDF,
            'clothe' => $clothe,
            'client' => $client,
            // 'size' => $size
            'date' => $formatted_date
        ];

        // share data to view
        $pdf = PDF::loadView('myPDF', $data);
        Log::info('pallone');
        $pdf->save(storage_path() . '_test.pdf');
        return $pdf->download('N_' . $orderPDF->n_ordine . '_Date_' . $formatted_date . '.pdf');
    }

    public function history($id)
    {
        $start = Carbon::now()->subMonth(1)->format('Y-m-d');
        $end = Carbon::now()->format('Y-m-d');
        Log::info("NOW: " . $start);
        return Order::with('client')
            // ->whereBetween('created_at', [$start, $end])
            ->whereDate('created_at', '>=', $start)
            ->whereDate('created_at', '<=', $end)
            ->where('client_id', $id)
            ->get();
    }

    public function countOrderToBeDelivered()
    {
        $status = 3; //'to_be_delivered'

        return Clothe::with('status')
            ->where('status_id', $status)
            ->count();
    }

    public function orderToBeDelivered()
    {
        $status = 3; //'to_be_delivered'

        return Clothe::with('status')
            ->where('status_id', $status)
            ->get();
    }

    public function countOrderNotAvailable()
    {
        $status = 2; //'not_available'

        return Clothe::where('status_id', $status)
            ->count();
    }

    public function orderNotAvailable()
    {
        $status = 2; //'not_available'

        return Clothe::with('status')
            ->where('status_id', $status)
            ->get();
    }

    public function countOrderToBePrepared()
    {
        $status = 4; //'to_be_prepared'

        return Clothe::where('status_id', $status)
            ->count();
    }

    public function orderToBePrepared()
    {
        $status = 4; //'to_be_prepared'

        return Clothe::with('status')
            ->where('status_id', $status)
            ->get();
    }

    public function filter($status, $search)
    {
        if ($search == "nu") {
            $search = "";
            $ordersQuery = Order::with('client')
                ->with('user');

            $orders = $this->setOrdersStatus($ordersQuery->get());

            if ($status == "all") {
                return $orders;
            }

            // TODO : change with array_filter
            Log::info("AOH SO QUI");
            Log::info($orders);
            $temp = [];
            for ($i = 0; $i < count($orders); $i++) {
                if ($orders[$i]->status->name == $status) {
                    $temp[count($temp)] = $orders[$i];
                }
            }
            return $temp;
        } else if ($search != "nu") {
            $ordersQuery = Order::with('client')
                ->with('user')
                ->where('n_ordine', 'LIKE', "%$search%")
                ->orWhere('p_ritiro', 'LIKE', "%$search%")
                ->orWhere('note', 'LIKE', "%$search%");

            $orders = $this->setOrdersStatus($ordersQuery->get());

            if ($status == "all") {
                return $orders;
            }

            $temp = [];
            for ($i = 0; $i < count($orders); $i++) {
                if ($orders[$i]->status->name == $status) {
                    $temp[count($temp)] = $orders[$i];
                }
            }
            return $temp;
        }
    }

    private function pairing($newOrder, $newOrderData)
    {
        //$newOrder->n_ordine = $newOrderData->n_ordine;
        $newOrder->p_ritiro = $newOrderData->p_ritiro;
        //$newOrder->livello = $newOrderData->livello;
        $newOrder->note = $newOrderData->note;
        $newOrder->n_ordine = rand(1, 100000);
        //$newOrder->created_at = $newOrderData->created_at;
        //$newOrder->update_at = $newOrderData->update_at;

        $newOrder->client_id = $newOrderData->user->id;

        Log::info("pairing order");
        $newOrder->save();
        Log::info("order paired");

        Log::info("pairing clothes");
        for ($i = 0; $i < count($newOrderData->clothes); $i++) {
            $newClothe = new Clothe();
            $newClothe->t_vestiario = $newOrderData->clothes[$i]->value;
            // switch($newOrderData->clothes[$i]->type){
            //     case "Maglietta":
            //         $newClothe->taglia=$client->t_maglietta;
            //         break;
            //     case "Pantaloni":
            //         $newClothe->taglia=$client->t_pantaloni;
            //         break;
            //     case "Scarpe":
            //         $newClothe->taglia=$client->t_scarpe;
            //         break;
            // }
            $newClothe->status = "Attesa";
            // $newClothe->status = "to_be_prepared";
            $newClothe->quantita = 1;
            $newClothe->order_id = $newOrder->id;
            $newClothe->save();
        }
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

    public function confirm($id)
    {
        $order = Order::with('clothes')->where("id", $id)->first();

        foreach ($order->clothes as $clothe) {
            $clothe = Clothe::find($clothe->id);
            $clothe->status = "Attesa";
            $clothe->save();
            Log::info("CLOTHE" . $clothe);
        }

        return $order;
    }

    public function showLabel($id)
    {
        $order = Order::find($id);
    }

    public function getOptions()
    {
        return ClotheType::all();
    }

    public function getStagesOptions()
    {
        return Stage::all();
    }

    public function getStatuses()
    {
        return Status::all();
    }

    public function setOrdersStatus($orders)
    {
        for ($i = 0; $i < count($orders); $i++) {
            // TODO: get all statuses and map an array
            $priorita = ['delivered' => 0, 'not_available' => 0, 'to_be_delivered' => 0, 'to_be_prepared' => 0];

            for ($y = 0; $y < count($orders[$i]->clothes); $y++) {
                $priorita[$orders[$i]->clothes[$y]->status->name] = $priorita[$orders[$i]->clothes[$y]->status->name] + 1;
            }
            foreach ($priorita as $key => $item) {
                if ($item > 0) {
                    $orders[$i]->setAttribute("status", Status::where('name', $key)->first());
                    // $orders[$i]->setAttribute("status", $key);
                    break;
                }
            }
        }
        return $orders;
    }
}
