<?php

namespace App\Http\Controllers;

use App\Models\Clothe;
use Illuminate\Http\Request;

class ClotheController extends Controller
{
    public function list() {
        $clothe = Clothe::with('param')
                        ->with('order')
                        ->with('inventory')
                        ->get();
        return $clothe;
    }

    public function id($id) {
        $clothe = Clothe::where('id', $id)
                        ->with('param')
                        ->with('order')
                        ->with('inventory')
                        ->get();
        return $clothe;
    }

    public function totPezzi($id) {
        $clothe = Clothe::groupBy('order_id')
                        ->sum('quantita')
                        ->where('order_id', $id);
        return $clothe;
    }
}
