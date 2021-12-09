<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clothe extends Model
{
    use HasFactory;

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function inventory() {
        return $this->belongsTo(Inventory::class);
    }

    public function param() {
        return $this->belongsTo(Param::class);
    }
}
