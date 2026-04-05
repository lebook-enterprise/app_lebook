import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:81
 * @route '/organization/logo'
 */
export const update = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
});

update.definition = {
    methods: ['post'],
    url: '/organization/logo',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:81
 * @route '/organization/logo'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:81
 * @route '/organization/logo'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:81
 * @route '/organization/logo'
 */
const updateForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::update
 * @see app/Http/Controllers/OrganizationController.php:81
 * @route '/organization/logo'
 */
updateForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
});

update.form = updateForm;

/**
 * @see \App\Http\Controllers\OrganizationController::deleteMethod
 * @see app/Http/Controllers/OrganizationController.php:109
 * @route '/organization/logo'
 */
export const deleteMethod = (
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
});

deleteMethod.definition = {
    methods: ['delete'],
    url: '/organization/logo',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\OrganizationController::deleteMethod
 * @see app/Http/Controllers/OrganizationController.php:109
 * @route '/organization/logo'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\OrganizationController::deleteMethod
 * @see app/Http/Controllers/OrganizationController.php:109
 * @route '/organization/logo'
 */
deleteMethod.delete = (
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\OrganizationController::deleteMethod
 * @see app/Http/Controllers/OrganizationController.php:109
 * @route '/organization/logo'
 */
const deleteMethodForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\OrganizationController::deleteMethod
 * @see app/Http/Controllers/OrganizationController.php:109
 * @route '/organization/logo'
 */
deleteMethodForm.delete = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

deleteMethod.form = deleteMethodForm;

const logo = {
    update: Object.assign(update, update),
    delete: Object.assign(deleteMethod, deleteMethod),
};

export default logo;
