<?php

namespace App\Http\Controllers;

use App\Models\InventoryMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
            ->orderBy('created_at', 'desc')
            ->limit(100) // or paginate
            ->get();

        return Inertia::render('dashboard', [
            'inventoryMovements' => $inventoryMovements
        ]);
    }
}
