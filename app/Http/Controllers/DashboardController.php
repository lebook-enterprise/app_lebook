<?php

namespace App\Http\Controllers;

use App\Models\InventoryMovement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Super admin sees all movements, others see only their organization's
        if ($user->isSuperAdmin()) {
            $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
                ->orderBy('created_at', 'desc')
                ->limit(100)
                ->get();
        } else {
            $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
                ->where('organization_id', $user->organization_id)
                ->orderBy('created_at', 'desc')
                ->limit(100)
                ->get();
        }

        return Inertia::render('dashboard', [
            'inventoryMovements' => $inventoryMovements,
        ]);
    }
}
