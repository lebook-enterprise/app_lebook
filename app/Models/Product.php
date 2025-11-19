<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'sku',
        'description',
    ];

    protected static function booted()
    {
        static::creating(
            function ($product) {
                if (empty($product->sku)) {
                    $product->sku = self::generateSku($product);
                }
            }
        );

        static::created(function (Product $product) {
            $product->stock()->create(['stock' => 0]);
        });
    }

    public static function generateSku($product)
    {
        $prefix = strtoupper(substr($product->name, 0, 3));
        $unique = strtoupper(Str::random(4));
        $lastId = static::query()->max('id') ?? 0;
        $idPart = str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);

        return "$prefix-$idPart-$unique";
    }

    public function stock()
    {
        return $this->hasOne(ProductStock::class);
    }

    public function movements()
    {
        return $this->hasMany(InventoryMovement::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function increaseStock(int $amount, $userId, $note = null)
    {
        $stock = $this->stock()->firstOrCreate(
            ['product_id' => $this->id],
            ['stock' => 0]
        );

        $stock->increment('stock', $amount);

        $this->movements()->create([
            'product_id' => $this->id,
            'user_id' => $userId,
            'type' => 'in',
            'quantity' => $amount,
            'note' => $note,
        ]);
    }

    public function decreaseStock(int $amount, $userId, $note = null)
    {
        $stock = $this->stock()->firstOrCreate(
            ['product_id' => $this->id],
            ['stock' => 0]
        );

        $stock->decrement('stock', $amount);

        $this->movements()->create([
            'product_id' => $this->id,
            'user_id' => $userId,
            'type' => 'out',
            'quantity' => $amount,
            'note' => $note,
        ]);
    }
}
