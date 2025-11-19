<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Inertia\Inertia;

class InventoryMovement extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'type',
        'quantity',
        'note',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function index()
    {
        return Inertia::render('Inventory/Inventory', [
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }
}
