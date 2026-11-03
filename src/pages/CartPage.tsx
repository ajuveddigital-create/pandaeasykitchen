import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import PincodeChecker from '../components/common/PincodeChecker';

const FREE_SHIPPING_THRESHOLD = 499;

const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setIsApplying(true);
    const res = await applyCoupon(couponInput);
    setIsApplying(false);

    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-soft-sage text-forest flex items-center justify-center mx-auto shadow-subtle">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
            Your shopping bag is empty
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/60 max-w-sm mx-auto">
            Explore our curated catalog of smart kitchen helpers, cordless vacuums, and home organizers.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal text-white font-bold text-sm hover:bg-forest transition-colors shadow-elevated"
        >
          <span>Explore All Gadgets</span>
          <ArrowRight className="w-4 h-4 text-panda-green" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
          Review Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/60 mt-1">
          {items.reduce((s, i) => s + i.quantity, 0)} item(s) selected • Cash on Delivery available across India
        </p>
      </div>

      {/* Free Shipping Meter Banner */}
      <div className="bg-soft-sage/70 rounded-2xl p-4 border border-panda-green/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-charcoal">
              {freeShippingDiff > 0 ? (
                <>Add ₹{freeShippingDiff} more to get FREE Delivery across India!</>
              ) : (
                <>🎉 You qualify for FREE Delivery across India!</>
              )}
            </p>
            <p className="text-[11px] text-charcoal/60">
              Orders above ₹499 ship free of charge. No hidden courier charges.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-48 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-charcoal/70">
            <span>Free Delivery Progress</span>
            <span>{shippingProgress}%</span>
          </div>
          <div className="h-2 w-full bg-white rounded-full overflow-hidden">
            <div className="h-full bg-forest rounded-full" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                Cart Items ({items.length})
              </h3>
              <button
                onClick={clearCart}
                className="text-xs text-charcoal/50 hover:text-terracotta font-semibold"
              >
                Clear all
              </button>
            </div>

            <div className="divide-y divide-charcoal/5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-warm-cream shrink-0"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-sm font-bold text-charcoal hover:text-forest transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Color: <span className="font-semibold text-charcoal">{item.variant.name}</span>
                      </p>
                      <span className="text-xs font-black text-charcoal mt-1 block">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-charcoal/20 rounded-full bg-warm-ivory px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="p-1 text-charcoal/70 hover:text-charcoal"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="p-1 text-charcoal/70 hover:text-charcoal"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-charcoal min-w-[70px] text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-charcoal/40 hover:text-terracotta p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-charcoal/10">
            <PincodeChecker />
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-5">
            <h3 className="text-base font-extrabold text-charcoal tracking-tight border-b border-charcoal/10 pb-3">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-soft-sage border border-panda-green text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-forest" />
                    <div>
                      <p className="font-bold text-charcoal">{appliedCoupon.code} applied!</p>
                      <p className="text-[11px] text-charcoal/70">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-charcoal/60 hover:text-terracotta font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-charcoal/70 uppercase tracking-wider block">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PANDA100"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-charcoal/15 bg-warm-ivory text-xs font-semibold uppercase placeholder:normal-case focus:outline-none focus:border-charcoal"
                    />
                    <button
                      type="submit"
                      disabled={isApplying || !couponInput.trim()}
                      className="px-4 py-2.5 bg-charcoal text-white text-xs font-bold rounded-xl hover:bg-forest transition-colors disabled:opacity-50"
                    >
                      {isApplying ? '...' : 'Apply'}
                    </button>
                  </div>
                  <p className="text-[10px] text-charcoal/50">
                    Try <strong>PANDA100</strong> for ₹100 off on ₹499+
                  </p>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-charcoal/80 pt-2 border-t border-charcoal/5">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-forest font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-forest font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-charcoal pt-3 border-t border-charcoal/10">
                <span>Total Amount</span>
                <span className="text-forest">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-charcoal/50 text-right">
                All prices are inclusive of GST.
              </p>
            </div>

            {/* Proceed to checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-6 rounded-full bg-charcoal text-white font-extrabold text-sm hover:bg-forest transition-all shadow-card flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-panda-green group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-2 text-center text-xs text-charcoal/60 space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-semibold text-forest">
                <ShieldCheck className="w-4 h-4" />
                <span>Cash on Delivery (COD) Supported</span>
              </div>
              <p className="text-[10px]">No advance payment required. Pay when delivered.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
