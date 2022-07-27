<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Clothe;
use App\Models\ClotheStatus;
use App\Models\ClotheType;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Stage;
use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;
use stdClass;

class OrderController extends Controller
{

    public function list()
    {
        $orders = Order::with('client')
            ->orderBy("updated_at", "desc")
            ->with(['user', 'status'])
            ->get();

        return $orders;
        // return $this->setOrdersStatus($orders);
    }

    public function id($id)
    {
        return Order::with('client')
            ->with('user')
            ->with('clothes')
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
            $orders = Order::with('client')
                ->orderBy("updated_at", "desc")
                ->with(['user', 'status'])
                ->get();

            // $orders = $this->setOrdersStatus($ordersQuery->get());

            if ($status == "all") {
                return $orders;
            }

            // TODO : change with array_filter
            Log::info("FILTER RESULT");
            Log::info($orders);

            $temp = [];
            for ($i = 0; $i < count($orders); $i++) {
                if ($orders[$i]->status->name == $status) {
                    $temp[count($temp)] = $orders[$i];
                }
            }
            return $temp;
        } else if ($search != "nu") {
            $orders = Order::with('client')
                ->orderBy("updated_at", "desc")
                ->with(['user', 'status'])
                ->where('n_ordine', 'LIKE', "%$search%")
                ->orWhere('p_ritiro', 'LIKE', "%$search%")
                ->orWhere('note', 'LIKE', "%$search%")
                ->get();


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
        $newOrder->giro = $newOrderData->giro;
        //$newOrder->livello = $newOrderData->livello;
        $newOrder->note = $newOrderData->note;
        $newOrder->n_ordine = $newOrder->n_ordine ?? Order::max("n_ordine") + 1;

        $newOrder->client_id = $newOrderData->client->id;
        $newOrder->status_id = $newOrderData->status_id ?? OrderStatus::where("name", "to_be_prepared")->first()->id;

        Log::info("pairing order");
        $newOrder->save();
        Log::info("order paired");

        Log::info("pairing clothes");
        $newClothes = $newOrderData->clothes ?? [];
        $newClothesId = [];
        $clothesId = $newOrder->clothes->pluck("id")->toArray();

        foreach ($newClothes as $clothe) {
            if (property_exists($clothe, "order_id")) {
                $newClothesId[] = $clothe->id;
                $newClothe = Clothe::find($clothe->id);
            } else {
                $newClothe = new Clothe();
            }

            $newClothe->t_vestiario = $clothe->t_vestiario;
            $newClothe->reference = $clothe->reference;
            $newClothe->status_id = ClotheStatus::where("name", "preparing")->first()->id;
            $newClothe->quantita = 1;
            $newClothe->order_id = $newOrder->id;
            $newClothe->save();
        }
        $deleteIds = array_diff($clothesId, $newClothesId);
        foreach ($deleteIds as $id) {
            Log::info("deleting " . $id);
        }
        Clothe::whereIn("id", $deleteIds)->delete();

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
        $order = Order::with('clothes')->find($id);
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
        $order = Order::where("id", $id)->update(["status_id" => OrderStatus::where("name", "delivered")->first()->id]);

        return $order;
    }

    public function deliver($id)
    {
        $order = Order::with(['clothes', 'clothes.status'])->where("id", $id)->first();
        foreach ($order->clothes as $clothe) {

            if ($clothe->status->name == 'preparing') {
                Clothe::where("id", $clothe->id)->update(["status_id" => ClotheStatus::where("name", "available")->first()->id]);
            }
        }

        $order->update(["status_id" => OrderStatus::where("name", "to_be_delivered")->first()->id]);

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

    public function getStatuses($object)
    {
        switch ($object) {
            case 'orders':
                return OrderStatus::all();
                break;

            case 'clothes':
                return ClotheStatus::all();
                break;

            default:
                return Status::all();
                break;
        }
    }

    public function notificationsCount()
    {
        $orders = Order::with('client')
            ->with(['user', 'status'])
            ->get();


        $count = [];

        // $count = new stdClass();
        foreach ($orders as $order) {
            $count[$order->status->value][] = $order;
        }

        return $count;
    }

    public function getLastNumber() {
        return Order::max("n_ordine") +1;
    }

    // public function setOrdersStatus($orders)
    // {
    //     $statuses = Status::pluck('name');
    //     for ($i = 0; $i < count($orders); $i++) {

    //         $priorita = [];

    //         foreach ($statuses as $status) {
    //             $priorita[$status] = 0;
    //         }


    //         for ($y = 0; $y < count($orders[$i]->clothes); $y++) {
    //             $priorita[$orders[$i]->clothes[$y]->status->name] = $priorita[$orders[$i]->clothes[$y]->status->name] + 1;
    //         }

    //         foreach ($priorita as $key => $item) {
    //             if ($item > 0) {
    //                 $orders[$i]->setAttribute("status", Status::where('name', $key)->first());
    //                 break;
    //             }
    //         }
    //     }
    //     return $orders;
    // }
}
