import {
    queryParams,
    type RouteDefinition,
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

const products = {
    store: Object.assign(store, store),
};

export default products;
