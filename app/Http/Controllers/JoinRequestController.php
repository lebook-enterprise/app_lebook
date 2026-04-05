<?php

namespace App\Http\Controllers;

use App\Models\JoinRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JoinRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'exists:organizations,slug'],
        ]);

        $organization = Organization::where('slug', $validated['slug'])->firstOrFail();

        $user = Auth::user();

        if ($user->organization_id) {
            return back()->with('error', 'You are already in an organization.');
        }

        $existingRequest = JoinRequest::where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return back()->with('error', 'You have already requested to join this organization.');
        }

        JoinRequest::create([
            'organization_id' => $organization->id,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Join request submitted successfully.');
    }

    public function index()
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        $organization = $user->organization;

        $pendingRequests = JoinRequest::where('organization_id', $organization->id)
            ->where('status', 'pending')
            ->with('user')
            ->get();

        return back()->with('pendingJoinRequests', $pendingRequests);
    }

    public function accept(JoinRequest $joinRequest)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        if ($joinRequest->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        if ($joinRequest->status !== 'pending') {
            return back()->with('error', 'This request has already been processed.');
        }

        $joinRequest->user->update([
            'organization_id' => $joinRequest->organization_id,
            'is_organization_admin' => false,
        ]);

        $joinRequest->update(['status' => 'accepted']);

        return back()->with('success', 'Join request accepted.');
    }

    public function reject(JoinRequest $joinRequest)
    {
        $user = Auth::user();

        if (! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        if ($joinRequest->organization_id !== $user->organization_id) {
            abort(403, 'Unauthorized');
        }

        if ($joinRequest->status !== 'pending') {
            return back()->with('error', 'This request has already been processed.');
        }

        $joinRequest->update(['status' => 'rejected']);

        return back()->with('success', 'Join request rejected.');
    }
}
