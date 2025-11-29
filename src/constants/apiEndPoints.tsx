// auth module
export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/register";

// user
export const getUserAddressesURL = (userId: number) => {
  return `/users/${userId}/address`;
};

export const updateUserAddressURL = (userId: number) => {
  return `/users/${userId}/update-address`;
};

export const addUserAddressesURL = (userId: number) => {
  return `/users/${userId}/add-address`;
};

// product module

export const PRODUCTS_ENDPOINT = "/products";
export const PRODUCTS_CATEGORIES_ENDPOINT = "/products/category";
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
};

export const getAllWishlistSummaryURL = (userId: number) => {
  return `/user/${userId}/wishlists/summary`;
};

export const getWishlistURL = (userId: number, wishlistId: number) => {
  return `/user/${userId}/wishlists/${wishlistId}`;
};
