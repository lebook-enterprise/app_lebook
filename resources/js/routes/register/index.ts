import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route '/register'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/register',
} satisfies RouteDefinition<['post']>;

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route '/register'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route '/register'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route '/register'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route '/register'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
export const organization = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
});

organization.definition = {
    methods: ['get', 'head'],
    url: '/organization/create',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
organization.url = (options?: RouteQueryOptions) => {
    return organization.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
organization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organization.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
organization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organization.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
const organizationForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organization.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
organizationForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organization.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::organization
 * @see app/Http/Controllers/OrganizationController.php:190
 * @route '/organization/create'
 */
organizationForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organization.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

organization.form = organizationForm;

const register = {
    store: Object.assign(store, store),
    organization: Object.assign(organization, organization),
};

export default register;
