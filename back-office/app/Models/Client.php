<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public $with = [];
    protected $appends = ['full_name'];

    public function card()
    {
        return $this->belongsTo(Card::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function param()
    {
        return $this->belongsTo(Param::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function getFullNameAttribute()
    {
        return $this->nome . ' ' . $this->cognome;
    }
}
