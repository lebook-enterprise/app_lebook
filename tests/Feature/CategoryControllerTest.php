<?php

use App\Models\Category;
use App\Models\Role;
use App\Models\User;

beforeEach(function () {
    $this->adminRole = Role::firstOrCreate(['name' => 'admin']);
    $this->admin = User::factory()->create(['role_id' => $this->adminRole->id]);
    $this->category = Category::create(['name' => 'Electronics', 'description' => 'Electronic items']);
});

describe('CategoryController - Store', function () {
    test('guests cannot create categories', function () {
        $this->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'Test description',
        ])->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot create categories', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->actingAs($user)
            ->post(route('categories.store'), [
                'name' => 'New Category',
                'description' => 'Test description',
            ])->assertStatus(403);
    });

    test('admin can create category with valid data', function () {
        $this->actingAs($this->admin)
            ->post(route('categories.store'), [
                'name' => 'New Category',
                'description' => 'Test description',
            ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('categories', [
            'name' => 'New Category',
            'description' => 'Test description',
        ]);
    });

    test('admin cannot create category without name', function () {
        $this->actingAs($this->admin)
            ->post(route('categories.store'), [
                'description' => 'Test description',
            ])
            ->assertSessionHasErrors('name');
    });

    test('admin cannot create category with duplicate name', function () {
        $this->actingAs($this->admin)
            ->post(route('categories.store'), [
                'name' => 'Electronics',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('categories', ['name' => 'Electronics']);
    });
});

describe('CategoryController - Update', function () {
    test('guests cannot update categories', function () {
        $this->put(route('categories.update', $this->category), [
            'name' => 'Updated Category',
        ])->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot update categories', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->actingAs($user)
            ->put(route('categories.update', $this->category), [
                'name' => 'Updated Category',
            ])->assertStatus(403);
    });

    test('admin can update category with valid data', function () {
        $this->actingAs($this->admin)
            ->put(route('categories.update', $this->category), [
                'name' => 'Updated Category',
                'description' => 'Updated description',
            ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('categories', [
            'id' => $this->category->id,
            'name' => 'Updated Category',
            'description' => 'Updated description',
        ]);
    });

    test('admin cannot update category without name', function () {
        $this->actingAs($this->admin)
            ->put(route('categories.update', $this->category), [
                'name' => '',
            ])
            ->assertSessionHasErrors('name');
    });
});

describe('CategoryController - Destroy', function () {
    test('guests cannot delete categories', function () {
        $this->delete(route('categories.destroy', $this->category))
            ->assertRedirect(route('login'));
    });

    test('non-admin authenticated users cannot delete categories', function () {
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->actingAs($user)
            ->delete(route('categories.destroy', $this->category))
            ->assertStatus(403);
    });

    test('admin can delete category', function () {
        $category = Category::create(['name' => 'To Delete']);

        $this->actingAs($this->admin)
            ->delete(route('categories.destroy', $category))
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    });
});
