<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function param() {
        return $this->belongsTo(Param::class);
    }

    public function clothe() {
        return $this->belongsTo(Clothe::class);
    }
}
