import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\OrganizationController::role
 * @see app/Http/Controllers/OrganizationController.php:131
 * @route '/organization/members/{member}/role'
 */
export const role = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: role.url(args, options),
    method: 'put',
});

role.definition = {
    methods: ['put'],
    url: '/organization/members/{member}/role',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\OrganizationController::role
 * @see app/Http/Controllers/OrganizationController.php:131
 * @route '/organization/members/{member}/role'
 */
role.url = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { member: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { member: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            member: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        member: typeof args.member === 'object' ? args.member.id : args.member,
    };

    return (
        role.definition.url
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\OrganizationController::role
 * @see app/Http/Controllers/OrganizationController.php:131
 * @route '/organization/members/{member}/role'
 */
role.put = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: role.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\OrganizationController::role
 * @see app/Http/Controllers/OrganizationController.php:131
 * @route '/organization/members/{member}/role'
 */
const roleForm = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: role.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::role
 * @see app/Http/Controllers/OrganizationController.php:131
 * @route '/organization/members/{member}/role'
 */
roleForm.put = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: role.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

role.form = roleForm;

/**
 * @see \App\Http\Controllers\OrganizationController::remove
 * @see app/Http/Controllers/OrganizationController.php:161
 * @route '/organization/members/{member}'
 */
export const remove = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
});

remove.definition = {
    methods: ['delete'],
    url: '/organization/members/{member}',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\OrganizationController::remove
 * @see app/Http/Controllers/OrganizationController.php:161
 * @route '/organization/members/{member}'
 */
remove.url = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { member: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { member: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            member: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        member: typeof args.member === 'object' ? args.member.id : args.member,
    };

    return (
        remove.definition.url
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\OrganizationController::remove
 * @see app/Http/Controllers/OrganizationController.php:161
 * @route '/organization/members/{member}'
 */
remove.delete = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\OrganizationController::remove
 * @see app/Http/Controllers/OrganizationController.php:161
 * @route '/organization/members/{member}'
 */
const removeForm = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: remove.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::remove
 * @see app/Http/Controllers/OrganizationController.php:161
 * @route '/organization/members/{member}'
 */
removeForm.delete = (
    args:
        | { member: number | { id: number } }
        | [member: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: remove.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

remove.form = removeForm;

const members = {
    role: Object.assign(role, role),
    remove: Object.assign(remove, remove),
};

export default members;
