<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $with = [
        'clothes',
        'clothes.inventory',
        'clothes.param',
        'clothes.inventory.param',
        'client'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }


    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function clothes() {
        return $this->hasMany(Clothe::class);
    }
}
