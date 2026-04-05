import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
export const show = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
});

show.definition = {
    methods: ['get', 'head'],
    url: '/super-admin/organizations/{organization}',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
show.url = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { organization: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            organization: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        organization:
            typeof args.organization === 'object'
                ? args.organization.id
                : args.organization,
    };

    return (
        show.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
show.get = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
show.head = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
const showForm = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
showForm.get = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:29
 * @route '/super-admin/organizations/{organization}'
 */
showForm.head = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

show.form = showForm;

/**
 * @see \App\Http\Controllers\SuperAdminController::destroy
 * @see app/Http/Controllers/SuperAdminController.php:60
 * @route '/super-admin/organizations/{organization}'
 */
export const destroy = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

destroy.definition = {
    methods: ['delete'],
    url: '/super-admin/organizations/{organization}',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::destroy
 * @see app/Http/Controllers/SuperAdminController.php:60
 * @route '/super-admin/organizations/{organization}'
 */
destroy.url = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { organization: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            organization: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        organization:
            typeof args.organization === 'object'
                ? args.organization.id
                : args.organization,
    };

    return (
        destroy.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\SuperAdminController::destroy
 * @see app/Http/Controllers/SuperAdminController.php:60
 * @route '/super-admin/organizations/{organization}'
 */
destroy.delete = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::destroy
 * @see app/Http/Controllers/SuperAdminController.php:60
 * @route '/super-admin/organizations/{organization}'
 */
const destroyForm = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::destroy
 * @see app/Http/Controllers/SuperAdminController.php:60
 * @route '/super-admin/organizations/{organization}'
 */
destroyForm.delete = (
    args:
        | { organization: number | { id: number } }
        | [organization: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

destroy.form = destroyForm;

const organizations = {
    show: Object.assign(show, show),
    destroy: Object.assign(destroy, destroy),
};

export default organizations;
