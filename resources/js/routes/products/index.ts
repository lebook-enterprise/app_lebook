import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:23
 * @route '/products'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/products',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:23
 * @route '/products'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:23
 * @route '/products'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:23
 * @route '/products'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:23
 * @route '/products'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;

const products = {
    store: Object.assign(store, store),
};

export default products;
