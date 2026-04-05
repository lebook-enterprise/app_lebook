import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\SuperAdminController::makeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:79
 * @route '/super-admin/users/{user}/make-super-admin'
 */
export const makeSuperAdmin = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: makeSuperAdmin.url(args, options),
    method: 'post',
});

makeSuperAdmin.definition = {
    methods: ['post'],
    url: '/super-admin/users/{user}/make-super-admin',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::makeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:79
 * @route '/super-admin/users/{user}/make-super-admin'
 */
makeSuperAdmin.url = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        user: typeof args.user === 'object' ? args.user.id : args.user,
    };

    return (
        makeSuperAdmin.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\SuperAdminController::makeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:79
 * @route '/super-admin/users/{user}/make-super-admin'
 */
makeSuperAdmin.post = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: makeSuperAdmin.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::makeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:79
 * @route '/super-admin/users/{user}/make-super-admin'
 */
const makeSuperAdminForm = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: makeSuperAdmin.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::makeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:79
 * @route '/super-admin/users/{user}/make-super-admin'
 */
makeSuperAdminForm.post = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: makeSuperAdmin.url(args, options),
    method: 'post',
});

makeSuperAdmin.form = makeSuperAdminForm;

/**
 * @see \App\Http\Controllers\SuperAdminController::removeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:92
 * @route '/super-admin/users/{user}/remove-super-admin'
 */
export const removeSuperAdmin = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: removeSuperAdmin.url(args, options),
    method: 'post',
});

removeSuperAdmin.definition = {
    methods: ['post'],
    url: '/super-admin/users/{user}/remove-super-admin',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::removeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:92
 * @route '/super-admin/users/{user}/remove-super-admin'
 */
removeSuperAdmin.url = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        user: typeof args.user === 'object' ? args.user.id : args.user,
    };

    return (
        removeSuperAdmin.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\SuperAdminController::removeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:92
 * @route '/super-admin/users/{user}/remove-super-admin'
 */
removeSuperAdmin.post = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: removeSuperAdmin.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::removeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:92
 * @route '/super-admin/users/{user}/remove-super-admin'
 */
const removeSuperAdminForm = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: removeSuperAdmin.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::removeSuperAdmin
 * @see app/Http/Controllers/SuperAdminController.php:92
 * @route '/super-admin/users/{user}/remove-super-admin'
 */
removeSuperAdminForm.post = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: removeSuperAdmin.url(args, options),
    method: 'post',
});

removeSuperAdmin.form = removeSuperAdminForm;

const users = {
    makeSuperAdmin: Object.assign(makeSuperAdmin, makeSuperAdmin),
    removeSuperAdmin: Object.assign(removeSuperAdmin, removeSuperAdmin),
};

export default users;
