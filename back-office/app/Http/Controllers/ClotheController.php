<?php

namespace App\Http\Controllers;

use App\Models\Clothe;
use App\Models\ClotheStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function updateClothesStatus(Request $req)
    {
        Log::info("AOH SO QUI");
        $clothesData = json_decode($req->getContent());

        foreach ($clothesData as $clotheId => $statusName) {
            Clothe::find($clotheId)->update(
                [
                    "status_id" => ClotheStatus::where("name", $statusName)->first()->id,

                ]
            );
        }

        return true;
    }
}
