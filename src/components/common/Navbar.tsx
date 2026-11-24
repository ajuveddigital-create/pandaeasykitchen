import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SearchModal from './SearchModal';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Kitchen Gadgets', path: '/shop?category=kitchen-gadgets' },
    { name: 'Cleaning Gadgets', path: '/shop?category=cleaning-gadgets' },
    { name: 'Home Organization', path: '/shop?category=home-organization' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-warm-ivory text-xs py-2 px-4 font-medium tracking-wide border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-panda-green">
              <Truck className="w-3.5 h-3.5" /> Free Shipping on Orders ₹499+ Across India
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-panda-green" /> Cash on Delivery (COD) Available
            </span>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="flex items-center gap-1 text-white/80">
              <RotateCcw className="w-3.5 h-3.5 text-panda-green" /> 7-Day Easy Replacement
            </span>
            <span className="text-white/60 text-[11px]">
              Use code <strong className="text-panda-green">PANDA100</strong> for ₹100 off
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-warm-ivory/95 backdrop-blur-md shadow-subtle border-b border-charcoal/5 py-3'
            : 'bg-warm-ivory py-4 border-b border-charcoal/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 rounded-xl text-charcoal hover:bg-soft-sage transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-panda-green bg-white shadow-subtle flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
                <img
                  src="/images/panda-logo.jpg"
                  alt="Panda Easy Kitchen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-charcoal leading-none">
                  Panda<span className="text-forest"> Easy Kitchen</span>
                </span>
                <span className="text-[10px] text-charcoal/60 tracking-wider font-semibold uppercase mt-0.5">
                  Small Gadgets • Everyday Living
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                    location.pathname + location.search === link.path ||
                    (link.path === '/shop' && location.pathname === '/shop' && !location.search)
                      ? 'bg-charcoal text-white'
                      : 'text-charcoal/80 hover:text-charcoal hover:bg-soft-sage'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons: Search & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full text-charcoal/70 hover:text-charcoal hover:bg-soft-sage transition-all text-sm font-medium"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline text-xs text-charcoal/60 font-medium">Search gadgets...</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-charcoal text-white hover:bg-forest transition-colors shadow-subtle group"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4 text-panda-green group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold tracking-wide">Cart</span>
                {itemCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-extrabold bg-panda-green text-charcoal rounded-full animate-fade-in">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-charcoal/10 bg-warm-ivory px-4 pt-3 pb-6 space-y-2 animate-fade-in">
            <div className="mb-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-charcoal/10 text-charcoal/60 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-charcoal/40" />
                  Search products, vacuum, chopper...
                </span>
                <span className="text-xs bg-soft-sage text-charcoal px-2 py-0.5 rounded-full font-semibold">
                  Search
                </span>
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold text-charcoal hover:bg-soft-sage transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-charcoal/40" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-charcoal/10 text-xs text-charcoal/70 space-y-2">
              <div className="flex items-center gap-2 text-forest font-semibold">
                <ShieldCheck className="w-4 h-4 text-panda-green" /> Cash on Delivery Available Across India
              </div>
              <div className="flex items-center gap-2 text-charcoal/70">
                <Truck className="w-4 h-4 text-charcoal/50" /> Fast Dispatch in 24 Hours
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;

