// auth module
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";

// product module

export const PRODUCTS_ENDPOINT = "/products";
export const GET_PAGINATED_PRODUCTS = "/products/paginated";
export const SEARCH_PRODUCT = "/products/search";

// cart module
export const userCartURL = (userId: Number) => {
    return `/users/${userId}/cart`;
};

export const userCartItemURL = (userId: number, itemId: number) => {
    return `/users/${userId}/cart/cartItem/${itemId}`;
};

export const userCartCheckoutURL = (cartId: number) => {
    return `/api/user/payment/checkout-session/${cartId}`;
}