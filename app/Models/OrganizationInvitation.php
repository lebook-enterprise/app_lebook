<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OrganizationInvitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'email',
        'token',
        'role',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public static function generateToken(): string
    {
        return Str::random(32);
    }

    public function setTokenAttribute($value): void
    {
        $this->attributes['token'] = Hash::make($value);
    }

    public function checkToken(string $plainToken): bool
    {
        return Hash::check($plainToken, $this->token);
    }
}
