import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './roles/user/pages/Product';
import SearchResults from './roles/user/pages/SearchResults';
import AuthProvider from './context/AuthContext';
import AdminDashboard from './roles/seller/pages/AdminDashboard';
import UserDashboard from './roles/user/pages/UserDashboard';
import Cart from './roles/user/pages/Cart';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/search-results" element={<SearchResults />} />

          <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
