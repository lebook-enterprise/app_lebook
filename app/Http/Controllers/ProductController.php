<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    public function store(Request $request)
{
    $data = $request->validate([
        'category_id' => 'required|exists:categories,id',
        'name' => 'required|string|max:255',
        'sku' => 'nullable|string|unique:products,sku',
        'description' => 'nullable|string',
    ]);

    $product = Product::create($data);

    return redirect()->back()->with('success', 'Product created successfully.');
}
}
