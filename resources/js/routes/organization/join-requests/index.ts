import {
    applyUrlDefaults,
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/organization/join-requests',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \JoinRequestController::index
 * @see [unknown]:0
 * @route '/organization/join-requests'
 */
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

index.form = indexForm;

/**
 * @see \JoinRequestController::accept
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/accept'
 */
export const accept = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: accept.url(args, options),
    method: 'put',
});

accept.definition = {
    methods: ['put'],
    url: '/organization/join-requests/{joinRequest}/accept',
} satisfies RouteDefinition<['put']>;

/**
 * @see \JoinRequestController::accept
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/accept'
 */
accept.url = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { joinRequest: args };
    }

    if (Array.isArray(args)) {
        args = {
            joinRequest: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        joinRequest: args.joinRequest,
    };

    return (
        accept.definition.url
            .replace('{joinRequest}', parsedArgs.joinRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \JoinRequestController::accept
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/accept'
 */
accept.put = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: accept.url(args, options),
    method: 'put',
});

/**
 * @see \JoinRequestController::accept
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/accept'
 */
const acceptForm = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: accept.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \JoinRequestController::accept
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/accept'
 */
acceptForm.put = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: accept.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

accept.form = acceptForm;

/**
 * @see \JoinRequestController::reject
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/reject'
 */
export const reject = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: reject.url(args, options),
    method: 'put',
});

reject.definition = {
    methods: ['put'],
    url: '/organization/join-requests/{joinRequest}/reject',
} satisfies RouteDefinition<['put']>;

/**
 * @see \JoinRequestController::reject
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/reject'
 */
reject.url = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { joinRequest: args };
    }

    if (Array.isArray(args)) {
        args = {
            joinRequest: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        joinRequest: args.joinRequest,
    };

    return (
        reject.definition.url
            .replace('{joinRequest}', parsedArgs.joinRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \JoinRequestController::reject
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/reject'
 */
reject.put = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: reject.url(args, options),
    method: 'put',
});

/**
 * @see \JoinRequestController::reject
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/reject'
 */
const rejectForm = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \JoinRequestController::reject
 * @see [unknown]:0
 * @route '/organization/join-requests/{joinRequest}/reject'
 */
rejectForm.put = (
    args:
        | { joinRequest: string | number }
        | [joinRequest: string | number]
        | string
        | number,
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: reject.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

reject.form = rejectForm;

const joinRequests = {
    index: Object.assign(index, index),
    accept: Object.assign(accept, accept),
    reject: Object.assign(reject, reject),
};

export default joinRequests;
