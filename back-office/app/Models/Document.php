<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    public function param() {
        return $this->belongsTo(Param::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
