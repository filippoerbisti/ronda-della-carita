<?php

namespace App\Http\Controllers;

use App\Models\Clothe;
use Illuminate\Http\Request;

class ClotheController extends Controller
{
    public function id($id) {
        return Clothe::where('id', $id)
                    ->with('param')
                    ->with('order')
                    ->with('inventory')
                    ->get();
    }
}
