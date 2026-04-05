import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
import invitations from './invitations';
import joinRequest from './join-request';
import joinRequests from './join-requests';
import logo from './logo';
import members from './members';
/**
 * @see \App\Http\Controllers\OrganizationController::store
 * @see app/Http/Controllers/OrganizationController.php:204
 * @route '/organization'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/organization',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\OrganizationController::store
 * @see app/Http/Controllers/OrganizationController.php:204
 * @route '/organization'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::store
 * @see app/Http/Controllers/OrganizationController.php:204
 * @route '/organization'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::store
 * @see app/Http/Controllers/OrganizationController.php:204
 * @route '/organization'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::store
 * @see app/Http/Controllers/OrganizationController.php:204
 * @route '/organization'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;

/**
 * @see \App\Http\Controllers\JoinOrganizationController::join
 * @see app/Http/Controllers/JoinOrganizationController.php:18
 * @route '/organization/join'
 */
export const join = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: join.url(options),
    method: 'post',
});

join.definition = {
    methods: ['post'],
    url: '/organization/join',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\JoinOrganizationController::join
 * @see app/Http/Controllers/JoinOrganizationController.php:18
 * @route '/organization/join'
 */
join.url = (options?: RouteQueryOptions) => {
    return join.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\JoinOrganizationController::join
 * @see app/Http/Controllers/JoinOrganizationController.php:18
 * @route '/organization/join'
 */
join.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: join.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::join
 * @see app/Http/Controllers/JoinOrganizationController.php:18
 * @route '/organization/join'
 */
const joinForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: join.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::join
 * @see app/Http/Controllers/JoinOrganizationController.php:18
 * @route '/organization/join'
 */
joinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: join.url(options),
    method: 'post',
});

join.form = joinForm;

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
export const settings = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
});

settings.definition = {
    methods: ['get', 'head'],
    url: '/organization/settings',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
const settingsForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: settings.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
settingsForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: settings.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationController::settings
 * @see app/Http/Controllers/OrganizationController.php:19
 * @route '/organization/settings'
 */
settingsForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: settings.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

settings.form = settingsForm;

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:52
 * @route '/organization/settings'
 */
export const update = (
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/organization/settings',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:52
 * @route '/organization/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:52
 * @route '/organization/settings'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:52
 * @route '/organization/settings'
 */
const updateForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:52
 * @route '/organization/settings'
 */
updateForm.put = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

update.form = updateForm;

const organization = {
    store: Object.assign(store, store),
    join: Object.assign(join, join),
    joinRequest: Object.assign(joinRequest, joinRequest),
    joinRequests: Object.assign(joinRequests, joinRequests),
    settings: Object.assign(settings, settings),
    update: Object.assign(update, update),
    logo: Object.assign(logo, logo),
    members: Object.assign(members, members),
    invitations: Object.assign(invitations, invitations),
};

export default organization;
