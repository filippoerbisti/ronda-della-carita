<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clothe extends Model
{
    use HasFactory;
    
    public $with = [
        "status"
    ];

    public $fillable = [
        "status_id"
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function status() {
        return $this->belongsTo(ClotheStatus::class);
    }
}
