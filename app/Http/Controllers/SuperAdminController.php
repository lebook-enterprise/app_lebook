<?php

namespace App\Http\Controllers;

use App\Models\InventoryMovement;
use App\Models\Organization;
use App\Models\ProductStock;
use App\Models\Role;
use App\Models\User;
use App\Scopes\OrganizationScope;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    public function index()
    {
        $organizations = Organization::withCount(['users', 'products', 'categories'])
            ->with('users', function ($query) {
                $query->latest()->take(5);
            })
            ->latest()
            ->get();

        return Inertia::render('super-admin/organizations', [
            'organizations' => $organizations,
        ]);
    }

    public function show(Organization $organization)
    {
        $organization->load(['users', 'categories', 'products.stock']);

        $recentMovements = InventoryMovement::withoutGlobalScope(OrganizationScope::class)
            ->where('organization_id', $organization->id)
            ->with(['user', 'product'])
            ->latest()
            ->limit(50)
            ->get();

        $stats = [
            'total_users' => $organization->users()->count(),
            'total_products' => $organization->products()->count(),
            'total_categories' => $organization->categories()->count(),
            'total_stock' => ProductStock::whereHas('product', function ($query) use ($organization) {
                $query->where('organization_id', $organization->id);
            })->sum('stock'),
            'movements_today' => InventoryMovement::withoutGlobalScope(OrganizationScope::class)
                ->where('organization_id', $organization->id)
                ->whereDate('created_at', today())
                ->count(),
        ];

        return Inertia::render('super-admin/organization-details', [
            'organization' => $organization,
            'recentMovements' => $recentMovements,
            'stats' => $stats,
        ]);
    }

    public function destroyOrganization(Organization $organization)
    {
        $organization->delete();

        return redirect()->route('super-admin.organizations')
            ->with('success', 'Organization deleted successfully.');
    }

    public function users()
    {
        $users = User::with(['organization', 'role'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('super-admin/users', [
            'users' => $users,
        ]);
    }

    public function makeSuperAdmin(User $user)
    {
        $superAdminRole = Role::where('name', 'super_admin')->first();

        $user->update([
            'role_id' => $superAdminRole->id,
            'organization_id' => null,
            'is_organization_admin' => false,
        ]);

        return redirect()->back()->with('success', 'User is now a super admin.');
    }

    public function removeSuperAdmin(User $user)
    {
        $userRole = Role::where('name', 'user')->first();

        $user->update([
            'role_id' => $userRole->id,
        ]);

        return redirect()->back()->with('success', 'Super admin privileges removed.');
    }

    public function activity()
    {
        $recentMovements = InventoryMovement::withoutGlobalScope(OrganizationScope::class)
            ->with(['user', 'product', 'organization'])
            ->latest()
            ->limit(100)
            ->get();

        return Inertia::render('super-admin/activity', [
            'recentMovements' => $recentMovements,
        ]);
    }
}
