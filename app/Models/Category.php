<?php

namespace App\Models;

use App\Scopes\OrganizationScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'organization_id',
        'name',
        'description',
    ];

    protected static function booted()
    {
        static::addGlobalScope(new OrganizationScope);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
