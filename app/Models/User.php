<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'organization_id',
        'is_organization_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_organization_admin' => 'boolean',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (! $user->role_id) {
                $defaultRole = Role::firstOrCreate(['name' => 'user']);
                $user->role_id = $defaultRole->id;
            }
        });
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function isSuperAdmin(): bool
    {
        return $this->role->name === 'super_admin';
    }

    public function isOrganizationAdmin(): bool
    {
        return (bool) $this->is_organization_admin;
    }

    public function belongsToOrganization(int $organizationId): bool
    {
        return $this->organization_id === $organizationId;
    }
}
