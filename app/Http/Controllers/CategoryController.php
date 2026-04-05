<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Scopes\OrganizationScope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->isSuperAdmin()) {
            $categories = Category::withoutGlobalScope(OrganizationScope::class)->get();
        } else {
            $categories = Category::where('organization_id', $user->organization_id)->get();
        }

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['organization_id'] = $user->organization_id;

        Category::create($validated);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, Category $category)
    {
        $user = Auth::user();

        if (! $user->isSuperAdmin() && $category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        $user = Auth::user();

        if (! $user->isSuperAdmin() && $category->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Category removed.');
    }
}
