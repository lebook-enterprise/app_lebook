<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;

beforeEach(function () {
    $this->adminRole = Role::firstOrCreate(['name' => 'admin']);
    $this->admin = User::factory()->create(['role_id' => $this->adminRole->id]);
    $this->category = Category::create(['name' => 'Electronics', 'description' => 'Electronic items']);
});

describe('ProductController - Index', function () {
    test('guests cannot access products page', function () {
        $this->get(route('products'))->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot access products page', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->actingAs($user)
            ->get(route('products'))
            ->assertStatus(403);
    });

    test('admin can access products page', function () {
        $this->actingAs($this->admin)
            ->get(route('products'))
            ->assertOk();
    });

    test('products page returns products and categories', function () {
        Product::create([
            'name' => 'Laptop',
            'sku' => 'LAP-001',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($this->admin)
            ->get(route('products'))
            ->assertInertia(fn ($page) => $page
                ->has('products')
                ->has('categories')
            );
    });
});

describe('ProductController - Store', function () {
    test('guests cannot create products', function () {
        $this->post(route('products.store'), [
            'name' => 'New Product',
            'category_id' => $this->category->id,
        ])->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot create products', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->actingAs($user)
            ->post(route('products.store'), [
                'name' => 'New Product',
                'category_id' => $this->category->id,
            ])->assertStatus(403);
    });

    test('admin can create product with valid data', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'name' => 'New Product',
                'category_id' => $this->category->id,
                'description' => 'Test product',
            ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('products', [
            'name' => 'New Product',
            'description' => 'Test product',
        ]);
    });

    test('admin can create product with custom SKU', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'name' => 'New Product',
                'sku' => 'CUSTOM-SKU-001',
                'category_id' => $this->category->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('products', [
            'name' => 'New Product',
            'sku' => 'CUSTOM-SKU-001',
        ]);
    });

    test('product stock is created automatically', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'name' => 'New Product',
                'category_id' => $this->category->id,
            ])
            ->assertRedirect();

        $product = Product::where('name', 'New Product')->first();
        $this->assertNotNull($product->stock);
        $this->assertDatabaseHas('product_stock', [
            'product_id' => $product->id,
            'stock' => 0,
        ]);
    });

    test('admin cannot create product without name', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'category_id' => $this->category->id,
            ])
            ->assertSessionHasErrors('name');
    });

    test('admin cannot create product without category', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'name' => 'New Product',
            ])
            ->assertSessionHasErrors('category_id');
    });

    test('admin cannot create product with invalid category', function () {
        $this->actingAs($this->admin)
            ->post(route('products.store'), [
                'name' => 'New Product',
                'category_id' => 99999,
            ])
            ->assertSessionHasErrors('category_id');
    });
});

describe('ProductController - Update', function () {
    test('guests cannot update products', function () {
        $product = Product::create([
            'name' => 'Product',
            'category_id' => $this->category->id,
        ]);

        $this->put("/products/{$product->id}", [
            'name' => 'Updated Product',
            'sku' => $product->sku,
            'category_id' => $this->category->id,
        ])->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot update products', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);
        $product = Product::create([
            'name' => 'Product',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($user)
            ->put("/products/{$product->id}", [
                'name' => 'Updated Product',
                'sku' => $product->sku,
                'category_id' => $this->category->id,
            ])->assertStatus(403);
    });

    test('admin can update product with valid data', function () {
        $product = Product::create([
            'name' => 'Product',
            'sku' => 'TEST-001',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($this->admin)
            ->put("/products/{$product->id}", [
                'name' => 'Updated Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product',
        ]);
    });

    test('admin cannot update product without name', function () {
        $product = Product::create([
            'name' => 'Product',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($this->admin)
            ->put("/products/{$product->id}", [
                'name' => '',
                'sku' => $product->sku,
                'category_id' => $this->category->id,
            ])
            ->assertSessionHasErrors('name');
    });
});

describe('ProductController - Destroy', function () {
    test('guests cannot delete products', function () {
        $product = Product::create([
            'name' => 'Product',
            'category_id' => $this->category->id,
        ]);

        $this->delete("/products/{$product->id}")
            ->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot delete products', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);
        $product = Product::create([
            'name' => 'Product',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($user)
            ->delete("/products/{$product->id}")
            ->assertStatus(403);
    });

    test('admin can delete product', function () {
        $product = Product::create([
            'name' => 'Product to Delete',
            'category_id' => $this->category->id,
        ]);

        $this->actingAs($this->admin)
            ->delete("/products/{$product->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    });
});
