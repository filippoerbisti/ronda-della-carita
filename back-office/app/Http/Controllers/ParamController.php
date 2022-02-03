<?php

namespace App\Http\Controllers;

use App\Models\Param;
use Illuminate\Http\Request;

class ParamController extends Controller
{
    public function gender() 
    {
        $gender = Param::whereBetween('id', [2, 3])
                        ->get();
        return $gender;
    }

    public function type_doc() 
    {
        $type_doc = Param::whereBetween('id', [4, 6])
                        ->get();
        return $type_doc;
    }

    public function order_status() 
    {
        $order_status = Param::whereBetween('id', [7, 10])
                        ->get();
        return $order_status;
    }
    
}
