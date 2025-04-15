import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import KeywordsPage from "./pages/KeywordsPage";
import SellersPage from "./pages/SellersPage";

function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-vh-100 position-relative overflow-hidden">
        {/* Navbar tüm sayfalarda görünür */}
        <TopNavbar />

        {/* Sayfa yönlendirmeleri */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/keywords" element={<KeywordsPage />} />
          <Route path="/sellers" element={<SellersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
