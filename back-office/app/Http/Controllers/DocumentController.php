<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function id($id) {
        return Document::where('id', $id)
                    ->with('param')
                    ->get();
    }
}
