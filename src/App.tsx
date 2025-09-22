import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './features/cart/Cart';
import PrivateRoute from './components/PrivateRoute';
import UserLayout from './layouts/UserLayout';
import UserDashboard from './features/dashboard/UserDashboard';
import Product from './features/product/Product';
import ProductListTable from './components/ProductsListTable';
import Wishlist from './features/wishlist/Wishlist';
import { AuthProvider } from './context/auth';
import { NotificationProvider } from './context/notification';

// #TODO: specifications for product, coupon apply and shipping cost feature
// order summary, charges, order tracking, delivery partner assignment.
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="/orders" element={<div>orders.....</div>} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            </Route>

            <Route path="/seller/dashboard" element={<UserLayout />} >
              <Route index element={<ProductListTable />} ></Route>
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
