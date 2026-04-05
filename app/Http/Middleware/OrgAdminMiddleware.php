<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class OrgAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check()) {
            abort(403, 'Unauthorized');
        }

        $user = Auth::user();

        // Allow if user has admin role OR is organization admin OR is super admin
        if ($user->role->name !== 'admin' && ! $user->isOrganizationAdmin() && ! $user->isSuperAdmin()) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
