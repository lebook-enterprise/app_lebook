import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});

show.definition = {
    methods: ['get', 'head'],
    url: '/organization/join',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
 */
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\JoinOrganizationController::show
 * @see app/Http/Controllers/JoinOrganizationController.php:13
 * @route '/organization/join'
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
