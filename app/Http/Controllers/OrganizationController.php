<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\OrganizationInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    /**
     * Display the organization settings page.
     */
    public function index()
    {
        $user = Auth::user();
        $organization = $user->organization;

        if (! $organization) {
            return redirect()->route('dashboard');
        }

        $members = User::where('organization_id', $organization->id)
            ->where('id', '!=', $user->id)
            ->get();

        $pendingInvitations = OrganizationInvitation::where('organization_id', $organization->id)
            ->where('expires_at', '>', now())
            ->get();

        $pendingJoinRequests = JoinRequest::where('organization_id', $organization->id)
            ->where('status', 'pending')
            ->with('user')
            ->get();

        return Inertia::render('organization/settings', [
            'organization' => $organization,
            'members' => $members,
            'pendingInvitations' => $pendingInvitations,
            'pendingJoinRequests' => $pendingJoinRequests,
        ]);
    }

    /**
     * Update the organization settings.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        $organization = $user->organization;

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('organizations')->ignore($organization->id),
            ],
        ]);

        $organization->update($validated);

        return redirect()->route('organization.settings')
            ->with('success', 'Organization updated successfully.');
    }

    /**
     * Update the organization logo.
     */
    public function updateLogo(Request $request)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'logo' => ['required', 'image', 'max:2048'],
        ]);

        $organization = $user->organization;

        if ($organization->logo_path) {
            Storage::disk('public')->delete($organization->logo_path);
        }

        $path = $request->file('logo')->store('logos', 'public');
        $organization->update(['logo_path' => $path]);

        return redirect()->route('organization.settings')
            ->with('success', 'Logo updated successfully.');
    }

    /**
     * Delete the organization logo.
     */
    public function deleteLogo(Request $request)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        $organization = $user->organization;

        if ($organization->logo_path) {
            Storage::disk('public')->delete($organization->logo_path);
            $organization->update(['logo_path' => null]);
        }

        return redirect()->route('organization.settings')
            ->with('success', 'Logo removed successfully.');
    }

    /**
     * Update member role.
     */
    public function updateMemberRole(Request $request, User $member)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        if ($member->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        if ($member->id === $user->id) {
            return redirect()->route('organization.settings')
                ->with('error', 'You cannot modify your own role.');
        }

        $validated = $request->validate([
            'is_organization_admin' => ['required', 'boolean'],
        ]);

        $member->update($validated);

        return redirect()->route('organization.settings')
            ->with('success', 'Member role updated successfully.');
    }

    /**
     * Remove a member from the organization.
     */
    public function removeMember(Request $request, User $member)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        if ($member->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        if ($member->id === $user->id) {
            return redirect()->route('organization.settings')
                ->with('error', 'You cannot remove yourself from the organization.');
        }

        $member->update([
            'organization_id' => null,
            'is_organization_admin' => false,
        ]);

        return redirect()->route('organization.settings')
            ->with('success', 'Member removed successfully.');
    }

    /**
     * Show the create organization page (for users without org).
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->organization_id) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('organization/create');
    }

    /**
     * Store a newly created organization.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->organization_id) {
            return redirect()->route('dashboard');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:organizations'],
        ]);

        $organization = Organization::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'settings' => [],
        ]);

        $user->update([
            'organization_id' => $organization->id,
            'is_organization_admin' => true,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Organization created successfully.');
    }
}
