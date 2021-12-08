<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Param extends Model
{
    use HasFactory;

    public $with = [
        'users',
        'orders',
        'clients',
        'documents',
        'clothes'
    ];

    public function users() {
        return $this->hasMany(User::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function clients() {
        return $this->hasMany(Client::class);
    }

    public function documents() {
        return $this->hasMany(Document::class);
    }

    public function clothes() {
        return $this->hasMany(Clothe::class);
    }
}
