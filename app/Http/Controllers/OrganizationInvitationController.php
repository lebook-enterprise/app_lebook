<?php

namespace App\Http\Controllers;

use App\Models\OrganizationInvitation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OrganizationInvitationController extends Controller
{
    /**
     * Store a newly created invitation.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'role' => ['required', 'in:admin,member'],
        ]);

        $organization = $user->organization;

        // Check if user already exists in the organization
        if (User::where('email', $validated['email'])
            ->where('organization_id', $organization->id)
            ->exists()) {
            return redirect()->route('organization.settings')
                ->with('error', 'User is already a member of this organization.');
        }

        // Check if there's already a pending invitation
        if (OrganizationInvitation::where('email', $validated['email'])
            ->where('organization_id', $organization->id)
            ->where('expires_at', '>', now())
            ->exists()) {
            return redirect()->route('organization.settings')
                ->with('error', 'An invitation has already been sent to this email.');
        }

        $plainToken = OrganizationInvitation::generateToken();

        OrganizationInvitation::create([
            'organization_id' => $organization->id,
            'email' => $validated['email'],
            'token' => $plainToken,
            'role' => $validated['role'],
            'expires_at' => now()->addDays(7),
        ]);

        // TODO: Send invitation email with token
        // The email should include a link to /register/invite?token={plainToken}&email={email}

        return redirect()->route('organization.settings')
            ->with('success', 'Invitation sent successfully.');
    }

    /**
     * Cancel an invitation.
     */
    public function destroy(OrganizationInvitation $invitation)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        // Ensure the invitation belongs to the user's organization
        if ($invitation->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        $invitation->delete();

        return redirect()->route('organization.settings')
            ->with('success', 'Invitation cancelled successfully.');
    }

    /**
     * Show the accept invitation page.
     */
    public function showAccept(Request $request)
    {
        $token = $request->query('token');
        $email = $request->query('email');

        if (! $token || ! $email) {
            return redirect()->route('login')
                ->with('error', 'Invalid invitation link.');
        }

        // Find the invitation
        $invitation = OrganizationInvitation::where('email', $email)
            ->where('expires_at', '>', now())
            ->first();

        if (! $invitation || ! $invitation->checkToken($token)) {
            return redirect()->route('login')
                ->with('error', 'Invalid or expired invitation link.');
        }

        // Check if user already exists
        $existingUser = User::where('email', $email)->first();

        if ($existingUser) {
            // If user exists but is not in this organization, they need to accept
            if (! $existingUser->organization_id) {
                return Inertia::render('auth/accept-invitation', [
                    'invitation' => [
                        'organization_name' => $invitation->organization->name,
                        'email' => $email,
                        'token' => $token,
                    ],
                    'has_account' => true,
                ]);
            }

            return redirect()->route('login')
                ->with('error', 'You are already associated with an organization.');
        }

        return Inertia::render('auth/accept-invitation', [
            'invitation' => [
                'organization_name' => $invitation->organization->name,
                'email' => $email,
                'token' => $token,
            ],
            'has_account' => false,
        ]);
    }

    /**
     * Accept an invitation (for existing users).
     */
    public function acceptExisting(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (! Auth::attempt($credentials)) {
            return back()->withErrors(['password' => 'Invalid credentials.']);
        }

        $user = Auth::user();

        // User is already in an organization
        if ($user->organization_id) {
            Auth::logout();

            return redirect()->route('login')
                ->with('error', 'You are already associated with an organization.');
        }

        // Find and validate the invitation
        $invitation = OrganizationInvitation::where('email', $request->email)
            ->where('expires_at', '>', now())
            ->first();

        if (! $invitation || ! $invitation->checkToken($request->token)) {
            Auth::logout();

            return redirect()->route('login')
                ->with('error', 'Invalid or expired invitation.');
        }

        // Attach user to organization
        $user->update([
            'organization_id' => $invitation->organization_id,
            'is_organization_admin' => $invitation->role === 'admin',
        ]);

        // Delete the invitation
        $invitation->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Welcome to '.$user->organization->name.'!');
    }

    /**
     * Accept an invitation (for new users).
     */
    public function acceptNew(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Find and validate the invitation
        $invitation = OrganizationInvitation::where('email', $request->email)
            ->where('expires_at', '>', now())
            ->first();

        if (! $invitation || ! $invitation->checkToken($request->token)) {
            return redirect()->route('login')
                ->with('error', 'Invalid or expired invitation.');
        }

        // Check if user already exists
        if (User::where('email', $request->email)->exists()) {
            return redirect()->route('login')
                ->with('error', 'An account with this email already exists. Please log in to accept the invitation.');
        }

        // Create the user
        $defaultRole = Role::firstOrCreate(['name' => 'user']);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $defaultRole->id,
            'organization_id' => $invitation->organization_id,
            'is_organization_admin' => $invitation->role === 'admin',
        ]);

        // Delete the invitation
        $invitation->delete();

        // Log in the user
        Auth::login($user);

        return redirect()->route('dashboard')
            ->with('success', 'Welcome to '.$user->organization->name.'!');
    }
}
