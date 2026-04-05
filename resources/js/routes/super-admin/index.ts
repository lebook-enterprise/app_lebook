import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
import organizationsD7bd90 from './organizations';
import users48860f from './users';
/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
export const dashboard = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
});

dashboard.definition = {
    methods: ['get', 'head'],
    url: '/super-admin',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
const dashboardForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
dashboardForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin'
 */
dashboardForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

dashboard.form = dashboardForm;

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
export const organizations = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: organizations.url(options),
    method: 'get',
});

organizations.definition = {
    methods: ['get', 'head'],
    url: '/super-admin/organizations',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
organizations.url = (options?: RouteQueryOptions) => {
    return organizations.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
organizations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizations.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
organizations.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: organizations.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
const organizationsForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organizations.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
organizationsForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organizations.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::organizations
 * @see app/Http/Controllers/SuperAdminController.php:15
 * @route '/super-admin/organizations'
 */
organizationsForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: organizations.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

organizations.form = organizationsForm;

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
});

users.definition = {
    methods: ['get', 'head'],
    url: '/super-admin/users',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
const usersForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:68
 * @route '/super-admin/users'
 */
usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

users.form = usersForm;

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
export const activity = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: activity.url(options),
    method: 'get',
});

activity.definition = {
    methods: ['get', 'head'],
    url: '/super-admin/activity',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
activity.url = (options?: RouteQueryOptions) => {
    return activity.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
activity.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activity.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
activity.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activity.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
const activityForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: activity.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
activityForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: activity.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\SuperAdminController::activity
 * @see app/Http/Controllers/SuperAdminController.php:103
 * @route '/super-admin/activity'
 */
activityForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: activity.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

activity.form = activityForm;

const superAdmin = {
    dashboard: Object.assign(dashboard, dashboard),
    organizations: Object.assign(organizations, organizationsD7bd90),
    users: Object.assign(users, users48860f),
    activity: Object.assign(activity, activity),
};

export default superAdmin;
