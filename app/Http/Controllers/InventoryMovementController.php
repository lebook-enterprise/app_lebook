<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductStock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryMovementController extends Controller
{
    /**
     * Display the inventory page with forms
     */
    public function index(): Response
    {
        $inventoryMovements = InventoryMovement::with(['user', 'product.stock'])
            ->orderBy('created_at', 'desc')
            ->limit(6) // or paginate
            ->get();

        return Inertia::render('inventory', [
            'products' => Product::select('id', 'name', 'sku', 'category_id')->get(),
            'categories' => Category::select('id', 'name')->get(),
            'inventoryMovements' => $inventoryMovements,
            'stats' => [
                'total_skus' => Product::count(),
                'in_stock' => ProductStock::sum('stock'),
                'checked_out_today' => InventoryMovement::whereDate('created_at', today())
                    ->where('type', 'out')
                    ->sum('quantity'),
                'low_stock' => ProductStock::where('stock', '<=', 10)->count(),
            ],
        ]);
    }

    /**
     * Handle check-in (add stock)
     *
     * @parma Request $request
     */
    public function checkIn(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        // Try to find the product by name
        $product = Product::where('name', $data['name'])->first();

        // If not found — create it automatically
        if (! $product) {
            $product = Product::create([
                'name' => $data['name'],
                'category_id' => $data['category_id'], // can be null
            ]);
        }

        // Increase stock + create movement
        $product->increaseStock(
            amount: $data['quantity'],
            userId: auth()->id(),
            note: $data['note']
        );

        return redirect()->back()->with('success', 'Stock added successfully.');
    }

    /**
     * Handle check-out (remove stock)
     */
    public function checkOut(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        $product = Product::with('stock')->findOrFail($data['product_id']);

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
            note: $data['note']
        );

        return redirect()->back()->with('success', 'Stock removed successfully.');
    }
}
