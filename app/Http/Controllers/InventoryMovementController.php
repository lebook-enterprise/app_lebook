<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class InventoryMovementController extends Controller
{
    /**
     * Display the inventory page with forms
     */
    public function index(): Response
    {
        return Inertia::render('inventory', [
            'products' => Product::select('id', 'name', 'sku')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }
    /**
     * Handle check-in (add stock)
     */
    public function checkIn(Request $request)
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
    public function checkOut(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        $product = Product::findOrFail($data['product_id']);

        // Decrease stock + create movement
        $product->decreaseStock(
            amount: $data['quantity'],
            userId: auth()->id(),
            note: $data['note']
        );

        return redirect()->back()->with('success', 'Stock removed successfully.');
    }
}
