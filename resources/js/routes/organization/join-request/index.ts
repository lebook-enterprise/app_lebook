import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../../wayfinder';
/**
 * @see \JoinRequestController::store
 * @see [unknown]:0
 * @route '/organization/join-request'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/organization/join-request',
} satisfies RouteDefinition<['post']>;

/**
 * @see \JoinRequestController::store
 * @see [unknown]:0
 * @route '/organization/join-request'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \JoinRequestController::store
 * @see [unknown]:0
 * @route '/organization/join-request'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \JoinRequestController::store
 * @see [unknown]:0
 * @route '/organization/join-request'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \JoinRequestController::store
 * @see [unknown]:0
 * @route '/organization/join-request'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;

const joinRequest = {
    store: Object.assign(store, store),
};

export default joinRequest;
