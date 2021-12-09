<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Param extends Model
{
    use HasFactory;

    public $with = [
        'users',
        'clients',
        'documents',
        'clothes',
        'inventories'
    ];

    public function users() {
        return $this->hasMany(User::class);
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

    public function inventories() {
        return $this->hasMany(Inventory::class);
    }
}
