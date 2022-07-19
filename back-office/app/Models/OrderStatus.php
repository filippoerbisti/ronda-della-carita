<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;

    protected $table = 'statuses';


    protected static function boot() {
        parent::boot();
        static::addGlobalScope('filter', function (Builder $builder) {
            $builder->where('object', 'order');
        });

        // static::creating(function($query) {
        // });
    }
}
