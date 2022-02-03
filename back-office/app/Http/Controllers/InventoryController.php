<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function id($id) 
    {
        return Inventory::where('id', $id)
                    ->with('param')
                    ->first();
    }
}
