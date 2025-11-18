<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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
    Route::get('inventory', function () {
        return Inertia::render('inventory');
    })->name('inventory');
});

// just admin stuff
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
});

require __DIR__.'/settings.php';
