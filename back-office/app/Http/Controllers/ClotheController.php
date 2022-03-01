<?php

namespace App\Http\Controllers;

use App\Models\Clothe;

class ClotheController extends Controller
{
    public function list() 
    {
        $clothe = Clothe::with('order')
                        ->get();
        return $clothe;
    }

    public function id($id) 
    {
        $clothe = Clothe::where('id', $id)
                        ->with('order')
                        ->first();
        return $clothe;
    }
}
