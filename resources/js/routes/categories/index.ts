import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
/**
 * @see \CategoryController::store
 * @see [unknown]:0
 * @route '/categories'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/categories',
} satisfies RouteDefinition<['post']>;

/**
 * @see \CategoryController::store
 * @see [unknown]:0
 * @route '/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \CategoryController::store
 * @see [unknown]:0
 * @route '/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \CategoryController::update
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
export const update = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/categories/{category}',
} satisfies RouteDefinition<['put']>;

/**
 * @see \CategoryController::update
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
update.url = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args };
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        category: args.category,
    };

    return (
        update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \CategoryController::update
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
update.put = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

/**
 * @see \CategoryController::destroy
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
export const destroy = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

destroy.definition = {
    methods: ['delete'],
    url: '/categories/{category}',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \CategoryController::destroy
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
destroy.url = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args };
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        category: args.category,
    };

    return (
        destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \CategoryController::destroy
 * @see [unknown]:0
 * @route '/categories/{category}'
 */
destroy.delete = (
    args:
        | { category: string | number }
        | [category: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

const categories = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
};

export default categories;
