import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
const ProductListTable = lazy(() => import("../components/ProductsListTable"));
const Cart = lazy(() => import("../features/cart/Cart"));
const UserDashboard = lazy(() => import("../features/dashboard/UserDashboard"));
const Product = lazy(() => import("../features/product/Product"));
const Wishlist = lazy(() => import("../features/wishlist/Wishlist"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));

const routes = [
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
            
    },
    {
        path: "/seller/dashboard",
        element: <UserLayout />,
        children: [
            { index: true, element: <ProductListTable /> }
        ]
    }
]

export default routes;