import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\OrganizationInvitationController::store
 * @see app/Http/Controllers/OrganizationInvitationController.php:18
 * @route '/organization/invitations'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/organization/invitations',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::store
 * @see app/Http/Controllers/OrganizationInvitationController.php:18
 * @route '/organization/invitations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::store
 * @see app/Http/Controllers/OrganizationInvitationController.php:18
 * @route '/organization/invitations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::store
 * @see app/Http/Controllers/OrganizationInvitationController.php:18
 * @route '/organization/invitations'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::store
 * @see app/Http/Controllers/OrganizationInvitationController.php:18
 * @route '/organization/invitations'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::destroy
 * @see app/Http/Controllers/OrganizationInvitationController.php:70
 * @route '/organization/invitations/{invitation}'
 */
export const destroy = (
    args:
        | { invitation: number | { id: number } }
        | [invitation: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

destroy.definition = {
    methods: ['delete'],
    url: '/organization/invitations/{invitation}',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::destroy
 * @see app/Http/Controllers/OrganizationInvitationController.php:70
 * @route '/organization/invitations/{invitation}'
 */
destroy.url = (
    args:
        | { invitation: number | { id: number } }
        | [invitation: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        invitation:
            typeof args.invitation === 'object'
                ? args.invitation.id
                : args.invitation,
    };

    return (
        destroy.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::destroy
 * @see app/Http/Controllers/OrganizationInvitationController.php:70
 * @route '/organization/invitations/{invitation}'
 */
destroy.delete = (
    args:
        | { invitation: number | { id: number } }
        | [invitation: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::destroy
 * @see app/Http/Controllers/OrganizationInvitationController.php:70
 * @route '/organization/invitations/{invitation}'
 */
const destroyForm = (
    args:
        | { invitation: number | { id: number } }
        | [invitation: number | { id: number }]
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
 * @see \App\Http\Controllers\OrganizationInvitationController::destroy
 * @see app/Http/Controllers/OrganizationInvitationController.php:70
 * @route '/organization/invitations/{invitation}'
 */
destroyForm.delete = (
    args:
        | { invitation: number | { id: number } }
        | [invitation: number | { id: number }]
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

const invitations = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
};

export default invitations;
