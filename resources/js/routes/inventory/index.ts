import {
    queryParams,
    type RouteDefinition,
    type RouteFormDefinition,
    type RouteQueryOptions,
} from './../../wayfinder';
/**
 * @see \App\Http\Controllers\InventoryMovementController::checkin
 * @see app/Http/Controllers/InventoryMovementController.php:43
 * @route '/inventory/check-in'
 */
export const checkin = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: checkin.url(options),
    method: 'post',
});

checkin.definition = {
    methods: ['post'],
    url: '/inventory/check-in',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkin
 * @see app/Http/Controllers/InventoryMovementController.php:43
 * @route '/inventory/check-in'
 */
checkin.url = (options?: RouteQueryOptions) => {
    return checkin.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkin
 * @see app/Http/Controllers/InventoryMovementController.php:43
 * @route '/inventory/check-in'
 */
checkin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkin.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkin
 * @see app/Http/Controllers/InventoryMovementController.php:43
 * @route '/inventory/check-in'
 */
const checkinForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: checkin.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkin
 * @see app/Http/Controllers/InventoryMovementController.php:43
 * @route '/inventory/check-in'
 */
checkinForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: checkin.url(options),
    method: 'post',
});

checkin.form = checkinForm;

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkout
 * @see app/Http/Controllers/InventoryMovementController.php:76
 * @route '/inventory/check-out'
 */
export const checkout = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
});

checkout.definition = {
    methods: ['post'],
    url: '/inventory/check-out',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkout
 * @see app/Http/Controllers/InventoryMovementController.php:76
 * @route '/inventory/check-out'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkout
 * @see app/Http/Controllers/InventoryMovementController.php:76
 * @route '/inventory/check-out'
 */
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkout
 * @see app/Http/Controllers/InventoryMovementController.php:76
 * @route '/inventory/check-out'
 */
const checkoutForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\InventoryMovementController::checkout
 * @see app/Http/Controllers/InventoryMovementController.php:76
 * @route '/inventory/check-out'
 */
checkoutForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
});

checkout.form = checkoutForm;

const inventory = {
    checkin: Object.assign(checkin, checkin),
    checkout: Object.assign(checkout, checkout),
};

export default inventory;
