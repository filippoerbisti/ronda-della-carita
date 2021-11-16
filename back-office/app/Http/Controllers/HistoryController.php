<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\User;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function list() {
        $history = History::with('user')->orderBy('ultimo_accesso', 'desc')->get();
        return $history;
    }

    public function filter($search) {
        $history = History::with('user')
                        //->where('users', 'nome', '=', $search)
                        ->orderBy('ultimo_accesso', 'desc')
                        ->get();
        return $history;
    }
}
