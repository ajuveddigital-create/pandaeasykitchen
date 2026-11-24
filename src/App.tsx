import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-warm-ivory text-charcoal">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/policies/:policy" element={<PolicyPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;

