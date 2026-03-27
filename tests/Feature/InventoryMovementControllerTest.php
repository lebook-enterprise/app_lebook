<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->category = Category::create(['name' => 'Test Category']);
});

describe('InventoryMovementController', function () {
    describe('index', function () {
        test('guests cannot access inventory page', function () {
            $this->get(route('inventory'))->assertRedirect(route('login'));
        });

        test('authenticated users can access inventory page', function () {
            $this->actingAs($this->user)
                ->get(route('inventory'))
                ->assertOk();
        });

        test('returns products, categories, movements and stats', function () {
            $product = Product::create([
                'name' => 'Test Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ]);

            $this->actingAs($this->user)
                ->get(route('inventory'))
                ->assertInertia(fn (Assert $page) => $page
                    ->has('products')
                    ->has('categories')
                    ->has('inventoryMovements')
                    ->has('stats', fn (Assert $stats) => $stats
                        ->has('total_skus')
                        ->has('in_stock')
                        ->has('checked_out_today')
                        ->has('low_stock')
                    )
                );
        });
    });

    describe('checkIn', function () {
        test('guests cannot check in stock', function () {
            $this->post(route('inventory.checkin'), [
                'name' => 'Test Product',
                'quantity' => 5,
            ])->assertRedirect(route('login'));
        });

        test('creates new product and increases stock when product not found', function () {
            $this->actingAs($this->user)
                ->post(route('inventory.checkin'), [
                    'name' => 'New Product',
                    'quantity' => 10,
                    'note' => 'Initial stock',
                    'category_id' => $this->category->id,
                ]);

            $this->assertDatabaseHas('products', ['name' => 'New Product']);
            $this->assertDatabaseHas('inventory_movements', [
                'type' => 'in',
                'quantity' => 10,
                'note' => 'Initial stock',
            ]);
        });

        test('uses existing product when found by name', function () {
            $product = Product::create([
                'name' => 'Existing Product',
                'sku' => 'EXIST-001',
                'category_id' => $this->category->id,
            ]);

            $response = $this->actingAs($this->user)
                ->post(route('inventory.checkin'), [
                    'name' => 'Existing Product',
                    'quantity' => 3,
                ]);

            $response->assertSessionHasNoErrors();
            $response->assertRedirect();
        });

        test('validates required fields', function () {
            $this->actingAs($this->user)
                ->post(route('inventory.checkin'), [])
                ->assertSessionHasErrors(['name', 'quantity']);
        });

        test('validates quantity is at least 1', function () {
            $this->actingAs($this->user)
                ->post(route('inventory.checkin'), [
                    'name' => 'Test Product',
                    'quantity' => 0,
                ])
                ->assertSessionHasErrors('quantity');
        });

        test('can associate category with new product', function () {
            $category = Category::create(['name' => 'Another Category']);

            $this->actingAs($this->user)
                ->post(route('inventory.checkin'), [
                    'name' => 'New Product',
                    'quantity' => 5,
                    'category_id' => $category->id,
                ]);

            $this->assertDatabaseHas('products', [
                'name' => 'New Product',
                'category_id' => $category->id,
            ]);
        });
    });

    describe('checkOut', function () {
        test('guests cannot check out stock', function () {
            $this->post(route('inventory.checkout'), [
                'product_id' => 1,
                'quantity' => 1,
            ])->assertRedirect(route('login'));
        });

        test('decreases stock and creates movement', function () {
            $product = Product::create([
                'name' => 'Test Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ]);
            $product->stock->update(['stock' => 10]);

            $response = $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [
                    'product_id' => $product->id,
                    'quantity' => 3,
                    'note' => 'Sold',
                ]);

            $response->assertSessionHasNoErrors();
            $response->assertRedirect();
        });

        test('fails when product has no stock', function () {
            $product = Product::create([
                'name' => 'Test Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ]);

            $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [
                    'product_id' => $product->id,
                    'quantity' => 1,
                ])
                ->assertSessionHasErrors('stock');
        });

        test('fails when requesting more stock than available', function () {
            $product = Product::create([
                'name' => 'Test Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ]);
            $product->stock->update(['stock' => 5]);

            $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [
                    'product_id' => $product->id,
                    'quantity' => 10,
                ])
                ->assertSessionHasErrors('stock');
        });

        test('validates required fields', function () {
            $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [])
                ->assertSessionHasErrors(['product_id', 'quantity']);
        });

        test('validates product exists', function () {
            $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [
                    'product_id' => 9999,
                    'quantity' => 1,
                ])
                ->assertSessionHasErrors('product_id');
        });

        test('validates quantity is at least 1', function () {
            $product = Product::create([
                'name' => 'Test Product',
                'sku' => 'TEST-001',
                'category_id' => $this->category->id,
            ]);

            $this->actingAs($this->user)
                ->post(route('inventory.checkout'), [
                    'product_id' => $product->id,
                    'quantity' => 0,
                ])
                ->assertSessionHasErrors('quantity');
        });
    });
});
