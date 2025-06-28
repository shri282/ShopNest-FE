import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import SearchResults from './pages/SearchResults';
import AuthProvider from './context/AuthContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Cart from './pages/Cart';

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

          <Route path="/user/cart" element={<Cart />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
