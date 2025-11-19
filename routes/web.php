<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\InventoryMovementController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    /* Route::get('inventory', function () { */
    /*     return Inertia::render('inventory'); */
    /* })->name('inventory'); */

    Route::get('inventory', [InventoryMovementController::class, 'index'])->name('inventory');

    Route::post('/inventory/check-in', [InventoryMovementController::class, 'checkIn'])
        ->name('inventory.checkin');

    Route::post('/inventory/check-out', [InventoryMovementController::class, 'checkOut'])
        ->name('inventory.checkout');
});

// just admin stuff
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
});

require __DIR__ . '/settings.php';
