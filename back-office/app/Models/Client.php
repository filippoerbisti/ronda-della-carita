<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public $with = [];

    protected $appends = ['full_name'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function getFullNameAttribute()
    {
        return $this->nome . ' ' . $this->cognome;
    }

    public function history() {
        $from = Carbon::now()->subMonth(1);
        return $this->hasMany(Order::class)->where("created_at", ">=", $from);
    }
}
