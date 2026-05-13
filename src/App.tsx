import React from 'react';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { PPFPage } from './pages/PPFPage';
import { TitanPPFPage } from './pages/TitanPPFPage';
import { UltraPPFPage } from './pages/UltraPPFPage';
import { TitanSatinPPFPage } from './pages/TitanSatinPPFPage';
import { WarrantyPage } from './pages/WarrantyPage';
import { ContactPage } from './pages/ContactPage';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import './App.css';

function App() {
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path === '/about') return <AboutPage />;
    if (path === '/products') return <ProductsPage />;
    if (path === '/ppf-cat') return <PPFPage />;
    if (path === '/titan-ppf') return <TitanPPFPage />;
    if (path === '/ultra-ppf') return <UltraPPFPage />;
    if (path === '/titan-satin-ppf') return <TitanSatinPPFPage />;
    if (path === '/warranty') return <WarrantyPage />;
    if (path === '/contact') return <ContactPage />;
    return <HomePage />;
  };

  const isAdminRoute = window.location.pathname === '/admin-login' || window.location.pathname === '/dashboard';
  
  if (isAdminRoute) {
    return getCurrentPage();
  }

  return (
    <div>
      <Navbar />
      {getCurrentPage()}
      <Footer />
    </div>
  );
}

export default App;