import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribedCode, setSubscribedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribedCode(data.couponCode);
        showToast('Welcome to Panda Easy Kitchen! Your ₹100 discount code is ready.', 'success');
      } else {
        setSubscribedCode('PANDA100');
        showToast('Welcome! Use code PANDA100 for ₹100 off.', 'success');
      }
    } catch {
      setSubscribedCode('PANDA100');
      showToast('Welcome! Use code PANDA100 for ₹100 off.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 3 Trust Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-panda-green/20 text-panda-green flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free All-India Delivery</h4>
              <p className="text-xs text-white/60 mt-0.5">On all prepaid & COD orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-panda-green/20 text-panda-green flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cash on Delivery (COD)</h4>
              <p className="text-xs text-white/60 mt-0.5">Pay cash or UPI directly to delivery agent</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-panda-green/20 text-panda-green flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Easy Replacement</h4>
              <p className="text-xs text-white/60 mt-0.5">Hassle-free replacement for any transit defect</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-panda-green bg-white flex items-center justify-center p-0.5">
                <img
                  src="/images/panda-logo.jpg"
                  alt="Panda Easy Kitchen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Panda<span className="text-panda-green"> Easy Kitchen</span>
                </span>
                <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                  Small Gadgets • Easier Everyday Living
                </p>
              </div>
            </Link>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              We design and curate clever, practical everyday tools that remove the daily friction from Indian kitchens, vehicles, and homes. Honest engineering, real testing, zero unnecessary fluff.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white mb-2">Get ₹100 Off Your First Order</p>
              {subscribedCode ? (
                <div className="p-3 rounded-2xl bg-panda-green/20 border border-panda-green text-xs text-panda-green">
                  🎉 You are in! Use code <strong className="text-white bg-charcoal px-2 py-0.5 rounded">{subscribedCode}</strong> at checkout.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-panda-green"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-panda-green text-charcoal text-xs font-extrabold hover:bg-white transition-colors"
                  >
                    {loading ? '...' : 'Claim ₹100'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-panda-green mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop All Gadgets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kitchen-gadgets" className="hover:text-white transition-colors">
                  Kitchen Gadgets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cleaning-gadgets" className="hover:text-white transition-colors">
                  Cleaning Gadgets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=home-organization" className="hover:text-white transition-colors">
                  Home Organization
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=bestseller" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-panda-green mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white">
                  <span>Track Your Order</span>
                  <ArrowRight className="w-3 h-3 text-panda-green" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQs & Gadget Care
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-white transition-colors">
                  7-Day Replacement Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-panda-green mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-panda-green shrink-0 mt-0.5" />
                <span>support@pandaeasykitchen.in</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-panda-green shrink-0 mt-0.5" />
                <span>WhatsApp: +91 98450 12345<br/><span className="text-[10px] text-white/40">Mon–Sat: 9:30 AM – 7:30 PM IST</span></span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-panda-green shrink-0 mt-0.5" />
                <span>Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Panda Easy Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center text-[11px]">
            <Link to="/policies/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/policies/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/policies/shipping" className="hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <span>•</span>
            <Link to="/policies/returns" className="hover:text-white transition-colors">
              Replacement Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
