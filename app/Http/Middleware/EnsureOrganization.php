<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureOrganization
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Super admins don't need to belong to an organization
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // Check if user belongs to an organization
        if (! $user->organization_id) {
            // Redirect to create organization page
            return redirect()->route('register.organization');
        }

        return $next($request);
    }
}
