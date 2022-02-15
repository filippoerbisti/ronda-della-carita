<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function list() 
    {
        $history = History::with('user')
                            ->orderBy('ultimo_accesso', 'desc')
                            ->get();
        return $history;
    }

    public function id($id)
    {
        return History::with('user')
                        ->where('user_id', $id)
                        ->first();
    }

    public function filter($search) 
    {
        $history = History::with('user')
                        //->where('users', 'nome', '=', $search)
                        //->where('interno', '=', $search)
                        //->whereDate('created_at', '2016-12-31')
                        ->orderBy('ultimo_accesso', 'desc')
                        ->get();
        return $history;
    }

    public function countAccessi() 
    {
        $history = History::with('user')
                            ->where('ultimo_accesso', '>=', Carbon::today())
                            ->count();
        return $history; 
    }

    public function todayAccessi() 
    {
        $history = History::with('user')
                            ->where('ultimo_accesso', '>=', Carbon::today())
                            ->get();
        return $history; 
    }

    public function create(Request $request) 
    {
        $newHistoryData = json_decode($request->getContent());

        $newHistory = new History();
        // $ultimo_accesso = Carbon::now();

        $newHistory->interno = $newHistoryData->interno;
        $newHistory->ultimo_accesso = $newHistoryData->ultimo_accesso;
        $newHistory->user_id = $newHistoryData->user_id;

        $newHistory->save();

        return $newHistory;
    }
}
