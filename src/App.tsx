import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import SearchResults from './pages/SearchResults';
import AuthProvider from './context/provider/AuthProvider';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route path="/search-results" element={<AuthProvider><SearchResults /></AuthProvider>} />
        <Route path="/product/:id" element={<AuthProvider><Product /></AuthProvider>} />
      </Routes>
    </div>
  );
}

export default App;
