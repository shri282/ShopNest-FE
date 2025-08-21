import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/AuthContext';
import Cart from './features/cart/Cart';
import PrivateRoute from './components/PrivateRoute';
import UserLayout from './layouts/UserLayout';
import UserDashboard from './features/dashboard/UserDashboard';
import SearchResults from './pages/SearchResults';
import Product from './features/product/Product';
import ProductListTable from './components/ProductsListTable';

// #TODO: wishlist, specifications for product, review for products, coupon apply and shipping cost feature
// order summary, charges, order tracking, delivery partner assignment.
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/orders" element={<div>sdfghjgfd</div>} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          </Route>

          <Route path="/seller/dashboard" element={<UserLayout />} >
            <Route index element={<ProductListTable />} ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
