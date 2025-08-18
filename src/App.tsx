import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/AuthContext';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import UserLayout from './layouts/UserLayout';
import UserDashboard from './pages/UserDashboard';
import SearchResults from './pages/SearchResults';
import Product from './pages/Product';
import ProductListTable from './components/ProductsListTable';

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
