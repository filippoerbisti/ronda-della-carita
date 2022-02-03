<?php

namespace App\Http\Controllers;

use App\Models\Document;

class DocumentController extends Controller
{
    public function id($id) 
    {
        return Document::where('id', $id)
                    ->with('param')
                    ->first();
    }
}
