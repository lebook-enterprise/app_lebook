import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\OrganizationInvitationController::existing
 * @see app/Http/Controllers/OrganizationInvitationController.php:145
 * @route '/invitation/accept/existing'
 */
export const existing = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: existing.url(options),
    method: 'post',
});

existing.definition = {
    methods: ['post'],
    url: '/invitation/accept/existing',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::existing
 * @see app/Http/Controllers/OrganizationInvitationController.php:145
 * @route '/invitation/accept/existing'
 */
existing.url = (options?: RouteQueryOptions) => {
    return existing.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::existing
 * @see app/Http/Controllers/OrganizationInvitationController.php:145
 * @route '/invitation/accept/existing'
 */
existing.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: existing.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::existing
 * @see app/Http/Controllers/OrganizationInvitationController.php:145
 * @route '/invitation/accept/existing'
 */
const existingForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: existing.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::existing
 * @see app/Http/Controllers/OrganizationInvitationController.php:145
 * @route '/invitation/accept/existing'
 */
existingForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: existing.url(options),
    method: 'post',
});

existing.form = existingForm;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::newMethod
 * @see app/Http/Controllers/OrganizationInvitationController.php:200
 * @route '/invitation/accept/new'
 */
export const newMethod = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: newMethod.url(options),
    method: 'post',
});

newMethod.definition = {
    methods: ['post'],
    url: '/invitation/accept/new',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::newMethod
 * @see app/Http/Controllers/OrganizationInvitationController.php:200
 * @route '/invitation/accept/new'
 */
newMethod.url = (options?: RouteQueryOptions) => {
    return newMethod.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::newMethod
 * @see app/Http/Controllers/OrganizationInvitationController.php:200
 * @route '/invitation/accept/new'
 */
newMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newMethod.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::newMethod
 * @see app/Http/Controllers/OrganizationInvitationController.php:200
 * @route '/invitation/accept/new'
 */
const newMethodForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: newMethod.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationInvitationController::newMethod
 * @see app/Http/Controllers/OrganizationInvitationController.php:200
 * @route '/invitation/accept/new'
 */
newMethodForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: newMethod.url(options),
    method: 'post',
});

newMethod.form = newMethodForm;

const accept = {
    existing: Object.assign(existing, existing),
    new: Object.assign(newMethod, newMethod),
};

export default accept;
