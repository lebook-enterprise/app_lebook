<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $organization = null;

        if ($user && $user->organization) {
            $organization = [
                'id' => $user->organization->id,
                'name' => $user->organization->name,
                'slug' => $user->organization->slug,
                'logo_url' => $user->organization->logo_url,
            ];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user ? [
                    ...$user->toArray(),
                    'is_super_admin' => $user->isSuperAdmin(),
                    'is_organization_admin' => $user->isOrganizationAdmin(),
                ] : null,
                'organization' => $organization,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
