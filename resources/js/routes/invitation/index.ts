import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
import accept from './accept';
/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});

show.definition = {
    methods: ['get', 'head'],
    url: '/invitation/accept',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::show
 * @see app/Http/Controllers/OrganizationInvitationController.php:92
 * @route '/invitation/accept'
 */
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

show.form = showForm;

const invitation = {
    show: Object.assign(show, show),
    accept: Object.assign(accept, accept),
};

export default invitation;
