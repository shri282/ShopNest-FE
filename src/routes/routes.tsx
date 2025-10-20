import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
const ProductListTable = lazy(() => import("../components/ProductsListTable"));
const Cart = lazy(() => import("../features/cart"));
const UserDashboard = lazy(() => import("../features/dashboard"));
const Product = lazy(() => import("../features/product"));
const Wishlist = lazy(() => import("../features/wishlist"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));

const userRoutes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
            { index: true, element: <UserDashboard /> },
            { path: "orders", element: <div>orders.....</div> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "product/:id", element: <Product /> },
            { path: "cart", element: <PrivateRoute><Cart /></PrivateRoute> }
        ]
            
    }
]

const sellerRoutes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
            { index: true, element: <ProductListTable /> }
        ]
    }
]

const routes = { sellerRoutes, userRoutes };
export default routes;