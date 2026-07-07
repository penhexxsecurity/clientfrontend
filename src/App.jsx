import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Research from "./pages/Research";
import ThreatIntel from "./pages/ThreatIntel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

const App = () => {
  return (
    <Router>
      <div className="bg-[#05060a] text-white min-h-screen flex flex-col">

        {/* Centralized Global Navigation Header */}
        <Navbar />

        {/* Main Context Dynamic Router View Wrapper */}
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/research" element={<Research />} />
            <Route path="/threat-intel" element={<ThreatIntel />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>

        {/* Global Structural Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;