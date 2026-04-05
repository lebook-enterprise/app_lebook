<?php

namespace App\Models;

use App\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'organization_id',
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

        static::addGlobalScope(new OrganizationScope);
    }

    /**
     * Generate a unique SKU for a product.
     */
    public static function generateSku($product)
    {
        $prefix = strtoupper(substr($product->name, 0, 3));
        $unique = strtoupper(Str::random(4));
        $lastId = static::query()->max('id') ?? 0;
        $idPart = str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);

        return "$prefix-$idPart-$unique";
    }

    public function stock(): HasOne
    {
        return $this->hasOne(ProductStock::class);
    }

    public function movements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function increaseStock(int $amount, $userId, $note = null): void
    {
        $stock = $this->stock()->firstOrCreate(
            ['product_id' => $this->id],
            ['stock' => 0]
        );

        $stock->increment('stock', $amount);

        $this->movements()->create([
            'organization_id' => $this->organization_id,
            'product_id' => $this->id,
            'user_id' => $userId,
            'type' => 'in',
            'quantity' => $amount,
            'note' => $note,
        ]);
    }

    public function decreaseStock(int $amount, $userId, $note = null): void
    {
        $stock = $this->stock()->firstOrCreate(
            ['product_id' => $this->id],
            ['stock' => 0]
        );

        $stock->decrement('stock', $amount);

        $this->movements()->create([
            'organization_id' => $this->organization_id,
            'product_id' => $this->id,
            'user_id' => $userId,
            'type' => 'out',
            'quantity' => $amount,
            'note' => $note,
        ]);
    }
}
