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
                    $product->sku = static::generateSku($product);
                }
            }
        );

        static::created(function (Product $product) {
            $product->stock()->create(['stock' => 0]);
        });
    }

    /**
     * Generate a unique SKU for a product.
     *
     * The SKU format is:
     * PREFIX-ID-UNIQUE
     *
     * Example:
     * PRO-000123-ABCD
     *
     * PREFIX  -> first 3 characters of the product name
     * ID      -> incremental padded ID
     * UNIQUE  -> random 4 character string
     *
     * @param \App\Models\Product $product
     * @return string
     */
    public static function generateSku($product)
    {
        $prefix = strtoupper(substr($product->name, 0, 3));
        $unique = strtoupper(Str::random(4));
        $lastId = static::query()->max('id') ?? 0;
        $idPart = str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);

        return "$prefix-$idPart-$unique";
    }

    /**
     * Get the stock value of the product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function stock()
    {
        return $this->hasOne(ProductStock::class);
    }

    /**
     * Get the movements of the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function movements()
    {
        return $this->hasMany(InventoryMovement::class);
    }

    /**
     * Get the category that the product belongs to
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Increase the stock quantity for this product.
     *
     * Creates a stock record if one does not exist, increments the quantity,
     * and logs the movement in the movements table.
     *
     * @param int         $amount
     * @param int|string  $userId
     * @param int|null    $note
     * @return void
     */
    public function increaseStock(int $amount, $userId, $note = null): void
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

    /**
     * Decreases the stock quantity for this product.
     *
     * Creates a stock record if one does not exist, decreases the quantity,
     * and logs the movement in the movements table. the exception is not
     * needed cause it's being handled in the checkOut() at InventoryMovement
     * controller.
     *
     * @param int         $amount
     * @param int|string  $userId
     * @param int|null    $note
     * @return void
     */
    public function decreaseStock(int $amount, $userId, $note = null): void
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
