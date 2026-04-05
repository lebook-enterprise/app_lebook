<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryMovementController;
use App\Http\Controllers\JoinOrganizationController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\OrganizationInvitationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Organization creation (for users without org)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('organization/create', [OrganizationController::class, 'create'])
        ->name('register.organization');
    Route::post('organization', [OrganizationController::class, 'store'])
        ->name('organization.store');
});

// Invitation acceptance routes (no auth required)
Route::get('/invitation/accept', [OrganizationInvitationController::class, 'showAccept'])
    ->name('invitation.show');
Route::post('/invitation/accept/existing', [OrganizationInvitationController::class, 'acceptExisting'])
    ->name('invitation.accept.existing');
Route::post('/invitation/accept/new', [OrganizationInvitationController::class, 'acceptNew'])
    ->name('invitation.accept.new');

// Join organization by code (for users not getting email)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('organization/join', [JoinOrganizationController::class, 'show'])
        ->name('organization.join.show');
    Route::post('organization/join', [JoinOrganizationController::class, 'join'])
        ->name('organization.join');
});

// Join request routes (auth required but no organization required)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('organization/join-request', [JoinRequestController::class, 'store'])
        ->name('organization.join-request.store');
});

// Join request management routes (org admin only)
Route::middleware(['auth', 'verified', 'organization', 'org_admin'])->group(function () {
    Route::get('organization/join-requests', [JoinRequestController::class, 'index'])
        ->name('organization.join-requests.index');
    Route::put('organization/join-requests/{joinRequest}/accept', [JoinRequestController::class, 'accept'])
        ->name('organization.join-requests.accept');
    Route::put('organization/join-requests/{joinRequest}/reject', [JoinRequestController::class, 'reject'])
        ->name('organization.join-requests.reject');
});

// Authenticated routes requiring organization
Route::middleware(['auth', 'verified', 'organization'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('inventory', [InventoryMovementController::class, 'index'])->name('inventory');
    Route::post('/inventory/check-in', [InventoryMovementController::class, 'checkIn'])
        ->name('inventory.checkin');
    Route::post('/inventory/check-out', [InventoryMovementController::class, 'checkOut'])
        ->name('inventory.checkout');

    Route::get('/organization/settings', [OrganizationController::class, 'index'])
        ->name('organization.settings');
    Route::put('/organization/settings', [OrganizationController::class, 'update'])
        ->name('organization.update');
    Route::post('/organization/logo', [OrganizationController::class, 'updateLogo'])
        ->name('organization.logo.update');
    Route::delete('/organization/logo', [OrganizationController::class, 'deleteLogo'])
        ->name('organization.logo.delete');

    Route::put('/organization/members/{member}/role', [OrganizationController::class, 'updateMemberRole'])
        ->name('organization.members.role');
    Route::delete('/organization/members/{member}', [OrganizationController::class, 'removeMember'])
        ->name('organization.members.remove');

    Route::post('/organization/invitations', [OrganizationInvitationController::class, 'store'])
        ->name('organization.invitations.store');
    Route::delete('/organization/invitations/{invitation}', [OrganizationInvitationController::class, 'destroy'])
        ->name('organization.invitations.destroy');
});

// Admin Routes (org admin OR super admin can manage products/categories)
Route::middleware(['auth', 'verified', 'organization', 'org_admin'])->group(function () {
    Route::get('products', [ProductController::class, 'index'])
        ->name('products');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

// Super Admin Routes
Route::middleware(['auth', 'verified', 'super_admin'])->group(function () {
    Route::get('super-admin', [SuperAdminController::class, 'index'])
        ->name('super-admin.dashboard');
    Route::get('super-admin/organizations', [SuperAdminController::class, 'index'])
        ->name('super-admin.organizations');
    Route::get('super-admin/organizations/{organization}', [SuperAdminController::class, 'show'])
        ->name('super-admin.organizations.show');
    Route::delete('super-admin/organizations/{organization}', [SuperAdminController::class, 'destroyOrganization'])
        ->name('super-admin.organizations.destroy');

    Route::get('super-admin/users', [SuperAdminController::class, 'users'])
        ->name('super-admin.users');
    Route::post('super-admin/users/{user}/make-super-admin', [SuperAdminController::class, 'makeSuperAdmin'])
        ->name('super-admin.users.make-super-admin');
    Route::post('super-admin/users/{user}/remove-super-admin', [SuperAdminController::class, 'removeSuperAdmin'])
        ->name('super-admin.users.remove-super-admin');

    Route::get('super-admin/activity', [SuperAdminController::class, 'activity'])
        ->name('super-admin.activity');
});

require __DIR__.'/settings.php';
