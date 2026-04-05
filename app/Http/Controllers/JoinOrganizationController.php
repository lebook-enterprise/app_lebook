<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\OrganizationInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JoinOrganizationController extends Controller
{
    public function show()
    {
        return Inertia::render('organization/join');
    }

    public function join(Request $request)
    {
        $request->validate([
            'invite_code' => 'required|string',
        ]);

        $inviteCode = trim($request->invite_code);

        // Find organization by slug (using invite code as slug)
        $organization = Organization::where('slug', $inviteCode)->first();

        if (! $organization) {
            return back()->withErrors(['invite_code' => 'Invalid invite code.']);
        }

        $user = Auth::user();

        if ($user->organization_id) {
            return back()->withErrors(['invite_code' => 'You are already in an organization.']);
        }

        // Check if there's a pending invitation for this user
        $pendingInvitation = OrganizationInvitation::where('email', $user->email)
            ->where('organization_id', $organization->id)
            ->where('expires_at', '>', now())
            ->first();

        $role = 'member';
        if ($pendingInvitation) {
            $role = $pendingInvitation->role;
            $pendingInvitation->delete();
        }

        $user->update([
            'organization_id' => $organization->id,
            'is_organization_admin' => $role === 'admin',
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Welcome to '.$organization->name.'!');
    }
}
