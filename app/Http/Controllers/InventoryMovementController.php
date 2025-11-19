<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use function pcov\waiting;

class InventoryMovementController extends Controller
{
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
}
