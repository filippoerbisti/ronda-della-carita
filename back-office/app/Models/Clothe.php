<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clothe extends Model
{
    use HasFactory;

    public $with = [
        'orders'
    ];

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function param() {
        return $this->belongsTo(Param::class);
    }
}
