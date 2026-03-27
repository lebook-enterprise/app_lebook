<?php

use App\Models\Category;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
use Illuminate\Database\Eloquent\Collection;

describe('Category Model', function () {
    test('has many products relationship', function () {
        $category = Category::create(['name' => 'Electronics', 'description' => 'Electronic items']);

        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $category->id,
        ]);

        expect($category->products)->toHaveCount(1);
        expect($category->products->first()->name)->toBe('Laptop');
    });
});

describe('Product Model', function () {
    beforeEach(function () {
        $this->category = Category::create(['name' => 'Electronics']);
    });

    test('auto-generates SKU on creation if not provided', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        expect($product->sku)->not->toBeNull();
        expect($product->sku)->toMatch('/^[A-Z]{3}-\d{6}-[A-Z0-9]{4}$/');
    });

    test('uses provided SKU if given', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'sku' => 'CUSTOM-SKU-123',
            'category_id' => $this->category->id,
        ]);

        expect($product->sku)->toBe('CUSTOM-SKU-123');
    });

    test('creates ProductStock with stock=0 on creation', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        expect($product->stock)->not->toBeNull();
        expect($product->stock->stock)->toBe(0);
    });

    test('has many movements relationship', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        expect($product->movements)->toBeInstanceOf(Collection::class);
    });

    test('has category relationship', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        expect($product->category->name)->toBe('Electronics');
    });

    test('increaseStock creates inventory movement and increments stock', function () {
        $user = User::factory()->create();
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        $product->increaseStock(10, $user->id, 'Initial stock');

        expect($product->stock->fresh()->stock)->toBe(10);
        expect($product->movements)->toHaveCount(1);
        expect($product->movements->first()->type)->toBe('in');
        expect($product->movements->first()->quantity)->toBe(10);
    });

    test('decreaseStock creates inventory movement and decrements stock', function () {
        $user = User::factory()->create();
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        $product->increaseStock(10, $user->id);
        $product->decreaseStock(3, $user->id, 'Sold');

        expect($product->stock->fresh()->stock)->toBe(7);
        expect($product->movements)->toHaveCount(2);
        expect($product->movements->last()->type)->toBe('out');
        expect($product->movements->last()->quantity)->toBe(3);
    });
});

describe('ProductStock Model', function () {
    beforeEach(function () {
        $this->category = Category::create(['name' => 'Electronics']);
    });

    test('belongs to product relationship', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        expect($product->stock->product->name)->toBe('Laptop');
    });
});

describe('Role Model', function () {
    test('has many users relationship', function () {
        $role = Role::create(['name' => 'admin']);
        $user = User::factory()->create(['role_id' => $role->id]);

        expect($role->users)->toHaveCount(1);
        expect($role->users->first()->name)->toBe($user->name);
    });
});

describe('User Model', function () {
    test('has role relationship', function () {
        $role = Role::create(['name' => 'admin']);
        $user = User::factory()->create(['role_id' => $role->id]);

        expect($user->role->name)->toBe('admin');
    });

    test('auto-assigns default user role if role_id not provided', function () {
        $user = User::factory()->create(['role_id' => null]);

        expect($user->role)->not->toBeNull();
        expect($user->role->name)->toBe('user');
    });
});

describe('InventoryMovement Model', function () {
    beforeEach(function () {
        $this->category = Category::create(['name' => 'Electronics']);
        $this->user = User::factory()->create();
    });

    test('belongs to product relationship', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        $movement = InventoryMovement::create([
            'product_id' => $product->id,
            'user_id' => $this->user->id,
            'type' => 'in',
            'quantity' => 5,
        ]);

        expect($movement->product->name)->toBe('Laptop');
    });

    test('belongs to user relationship', function () {
        $product = Product::create([
            'name' => 'Laptop',
            'category_id' => $this->category->id,
        ]);

        $movement = InventoryMovement::create([
            'product_id' => $product->id,
            'user_id' => $this->user->id,
            'type' => 'in',
            'quantity' => 5,
        ]);

        expect($movement->user->id)->toBe($this->user->id);
    });
});
