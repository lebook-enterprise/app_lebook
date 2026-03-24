<<<<<<< HEAD
import {
    queryParams,
    type RouteDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
=======
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
>>>>>>> 742be5a (git ignore)
/**
* @see \App\Http\Controllers\ProductController::store
* @see app/Http/Controllers/ProductController.php:23
* @route '/products'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProductController::store
* @see app/Http/Controllers/ProductController.php:23
* @route '/products'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::store
* @see app/Http/Controllers/ProductController.php:23
* @route '/products'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

<<<<<<< HEAD
=======
/**
* @see \App\Http\Controllers\ProductController::store
* @see app/Http/Controllers/ProductController.php:23
* @route '/products'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::store
* @see app/Http/Controllers/ProductController.php:23
* @route '/products'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

>>>>>>> 742be5a (git ignore)
const products = {
    store: Object.assign(store, store),
}

export default products