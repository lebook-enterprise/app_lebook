<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductStock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InventoryMovementController extends Controller
{
    /**
     * Display the inventory page with forms
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Super admin sees all data, others see only their organization's
        if ($user->isSuperAdmin()) {
            $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
                ->orderBy('created_at', 'desc')
                ->limit(6)
                ->get();
            $products = Product::with('stock')->select('id', 'name', 'sku', 'category_id')->get();
            $categories = Category::select('id', 'name')->get();
            $stats = [
                'total_skus' => Product::count(),
                'in_stock' => ProductStock::sum('stock'),
                'checked_out_today' => InventoryMovement::whereDate('created_at', today())
                    ->where('type', 'out')
                    ->sum('quantity'),
                'low_stock' => ProductStock::where('stock', '<=', 10)->count(),
            ];
        } else {
            $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
                ->where('organization_id', $user->organization_id)
                ->orderBy('created_at', 'desc')
                ->limit(6)
                ->get();
            $products = Product::with('stock')
                ->where('organization_id', $user->organization_id)
                ->select('id', 'name', 'sku', 'category_id')
                ->get();
            $categories = Category::where('organization_id', $user->organization_id)
                ->select('id', 'name')
                ->get();
            $stats = [
                'total_skus' => Product::where('organization_id', $user->organization_id)->count(),
                'in_stock' => ProductStock::whereHas('product', function ($query) use ($user) {
                    $query->where('organization_id', $user->organization_id);
                })->sum('stock'),
                'checked_out_today' => InventoryMovement::where('organization_id', $user->organization_id)
                    ->whereDate('created_at', today())
                    ->where('type', 'out')
                    ->sum('quantity'),
                'low_stock' => ProductStock::whereHas('product', function ($query) use ($user) {
                    $query->where('organization_id', $user->organization_id);
                })->where('stock', '<=', 10)->count(),
            ];
        }

        return Inertia::render('inventory', [
            'products' => $products,
            'categories' => $categories,
            'inventoryMovements' => $inventoryMovements,
            'stats' => $stats,
        ]);
    }

    public function checkIn(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $data = $request->validate([
            'name' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        // Try to find the product by name within the organization
        if ($user->isSuperAdmin()) {
            $product = Product::where('name', $data['name'])->first();
        } else {
            $product = Product::where('name', $data['name'])
                ->where('organization_id', $user->organization_id)
                ->first();
        }

        // If not found — create it automatically
        if (! $product) {
            // Verify category belongs to the same organization
            if ($data['category_id'] && ! $user->isSuperAdmin()) {
                $category = Category::find($data['category_id']);
                if (! $category || $category->organization_id !== $user->organization_id) {
                    abort(403, 'Unauthorized');
                }
            }

            $product = Product::create([
                'name' => $data['name'],
                'category_id' => $data['category_id'],
                'organization_id' => $user->isSuperAdmin() ? null : $user->organization_id,
            ]);
        }

        // Increase stock + create movement
        $product->increaseStock(
            amount: $data['quantity'],
            userId: auth()->id(),
            note: $data['note'] ?? null
        );

        return redirect()->back()->with('success', 'Stock added successfully.');
    }

    /**
     * Handle check-out (remove stock)
     */
    public function checkOut(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        $product = Product::with('stock')->findOrFail($data['product_id']);

        // Check if user has access to this product
        if (! $user->isSuperAdmin() && $product->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        // Ensure stock exists
        if (! $product->stock || $product->stock->stock <= 0) {
            return redirect()->back()->withErrors([
                'stock' => 'This product has no stock available.',
            ]);
        }

        // Ensure enough stock
        if ($product->stock->stock < $data['quantity']) {
            return redirect()->back()->withErrors([
                'stock' => "Not enough stock. Available: {$product->stock->stock}",
            ])->withInput();
        }

        // Decrease stock + create movement
        $product->decreaseStock(
            amount: $data['quantity'],
            userId: auth()->id(),
            note: $data['note'] ?? null
        );

        return redirect()->back()->with('success', 'Stock removed successfully.');
    }
}
