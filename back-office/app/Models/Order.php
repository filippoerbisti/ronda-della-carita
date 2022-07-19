<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDF;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "status_id"
    ];

    public $with = [
        'clothes',
        //'clothes.param',
        'client'
    ];

    public $withCount = [
        'clothes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function clothes()
    {
        return $this->hasMany(Clothe::class);
    }

    public function status() {
        return $this->belongsTo(OrderStatus::class);
    }
}
