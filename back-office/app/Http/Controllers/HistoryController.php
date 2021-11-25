<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\User;
use Carbon\Carbon;
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
                        //->where('interno', '=', $search)
                        //->whereDate('created_at', '2016-12-31')
                        ->orderBy('ultimo_accesso', 'desc')
                        ->get();
        return $history;
    }

    public function countAccessi() {
        return History::with('user')->where('ultimo_accesso', '>=', Carbon::today())->count(); 
    }
}
