<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Scopes\OrganizationScope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->isSuperAdmin()) {
            $products = Product::withoutGlobalScope(OrganizationScope::class)->with(['category', 'stock'])->get();
            $categories = Category::withoutGlobalScope(OrganizationScope::class)->get();
        } else {
            $products = Product::with(['category', 'stock'])->where('organization_id', $user->organization_id)->get();
            $categories = Category::where('organization_id', $user->organization_id)->get();
        }

        return Inertia::render('products', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|unique:products,sku',
            'description' => 'nullable|string',
        ]);

        $data['organization_id'] = $user->organization_id;

        $product = Product::create($data);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $user = Auth::user();

        if (! $user->isSuperAdmin() && $product->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,'.$product->id,
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->update($validated);

        return redirect()->back();
    }

    public function destroy(Product $product)
    {
        $user = Auth::user();

        if (! $user->isSuperAdmin() && $product->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $product->delete();

        return redirect()->back();
    }
}
