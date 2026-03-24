<<<<<<< HEAD
import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
=======
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
>>>>>>> 742be5a (git ignore)
/**
* @see \App\Http\Controllers\CategoryController::store
* @see app/Http/Controllers/CategoryController.php:24
* @route '/categories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CategoryController::store
* @see app/Http/Controllers/CategoryController.php:24
* @route '/categories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::store
* @see app/Http/Controllers/CategoryController.php:24
* @route '/categories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/categories/{category}'
 */
export const update = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
=======
* @see \App\Http\Controllers\CategoryController::store
* @see app/Http/Controllers/CategoryController.php:24
* @route '/categories'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CategoryController::store
* @see app/Http/Controllers/CategoryController.php:24
* @route '/categories'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CategoryController::update
* @see app/Http/Controllers/CategoryController.php:39
* @route '/categories/{category}'
*/
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> 742be5a (git ignore)
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/categories/{category}'
 */
update.url = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
) => {
=======
* @see \App\Http\Controllers\CategoryController::update
* @see app/Http/Controllers/CategoryController.php:39
* @route '/categories/{category}'
*/
update.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
>>>>>>> 742be5a (git ignore)
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: typeof args.category === 'object'
        ? args.category.id
        : args.category,
    }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:39
 * @route '/categories/{category}'
 */
update.put = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
=======
* @see \App\Http\Controllers\CategoryController::update
* @see app/Http/Controllers/CategoryController.php:39
* @route '/categories/{category}'
*/
update.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
>>>>>>> 742be5a (git ignore)
    url: update.url(args, options),
    method: 'put',
})

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:54
 * @route '/categories/{category}'
 */
export const destroy = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
=======
* @see \App\Http\Controllers\CategoryController::update
* @see app/Http/Controllers/CategoryController.php:39
* @route '/categories/{category}'
*/
const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CategoryController::update
* @see app/Http/Controllers/CategoryController.php:39
* @route '/categories/{category}'
*/
updateForm.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\CategoryController::destroy
* @see app/Http/Controllers/CategoryController.php:54
* @route '/categories/{category}'
*/
export const destroy = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> 742be5a (git ignore)
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:54
 * @route '/categories/{category}'
 */
destroy.url = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
) => {
=======
* @see \App\Http\Controllers\CategoryController::destroy
* @see app/Http/Controllers/CategoryController.php:54
* @route '/categories/{category}'
*/
destroy.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
>>>>>>> 742be5a (git ignore)
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: typeof args.category === 'object'
        ? args.category.id
        : args.category,
    }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
<<<<<<< HEAD
 * @see \App\Http\Controllers\CategoryController::destroy
 * @see app/Http/Controllers/CategoryController.php:54
 * @route '/categories/{category}'
 */
destroy.delete = (
    args:
        | { category: string | number | { id: string | number } }
        | [category: string | number | { id: string | number }]
        | string
        | number
        | { id: string | number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
=======
* @see \App\Http\Controllers\CategoryController::destroy
* @see app/Http/Controllers/CategoryController.php:54
* @route '/categories/{category}'
*/
destroy.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
>>>>>>> 742be5a (git ignore)
    url: destroy.url(args, options),
    method: 'delete',
})

<<<<<<< HEAD
=======
/**
* @see \App\Http\Controllers\CategoryController::destroy
* @see app/Http/Controllers/CategoryController.php:54
* @route '/categories/{category}'
*/
const destroyForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CategoryController::destroy
* @see app/Http/Controllers/CategoryController.php:54
* @route '/categories/{category}'
*/
destroyForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

>>>>>>> 742be5a (git ignore)
const categories = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default categories