<?php

namespace App\Http\Controllers;

use App\Models\Param;
use Illuminate\Http\Request;

class ParamController extends Controller
{
    public function gender() {
        $gender = Param::where('id', 2)
                        ->orwhere('id', 3)
                        ->get();
        return $gender;
    }

    public function type_doc() {
        $type_doc = Param::where('id', 4)
                        ->orwhere('id', 5)
                        ->orwhere('id', 6)
                        ->get();
        return $type_doc;
    }

    public function order_status() {
        $order_status = Param::where('id', 7)
                        ->orwhere('id', 8)
                        ->orwhere('id', 9)
                        ->orwhere('id', 10)
                        ->get();
        return $order_status;
    }
    
}
