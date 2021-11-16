<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function list() {
        $history = History::with('user')->orderBy('ultimo_accesso', 'desc')->get();
        return $history;
    }
}
