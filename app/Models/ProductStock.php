<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    // I made the table name wrong
    // my bad
    protected $table = 'product_stock';

    protected $fillable = [
        'product_id',
        'stock',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
