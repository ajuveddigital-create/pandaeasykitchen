import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const FREE_SHIPPING_THRESHOLD = 499;

const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setIsApplyingCoupon(true);
    const result = await applyCoupon(couponInput);
    setIsApplyingCoupon(false);

    if (result.success) {
      showToast(result.message, 'success');
      setCouponInput('');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-warm-ivory shadow-floating border-l border-charcoal/10 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-charcoal/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <h3 className="text-base font-extrabold text-charcoal tracking-tight">Your Panda Bag</h3>
              <span className="text-xs font-bold bg-soft-sage text-charcoal px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-soft-sage transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-soft-sage/60 px-5 py-3 border-b border-charcoal/5">
            <div className="flex items-center justify-between text-xs font-semibold text-charcoal mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-forest" />
                {freeShippingDiff > 0 ? (
                  <span>
                    Add <strong className="text-forest">₹{freeShippingDiff}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="text-forest font-bold">You unlocked FREE Delivery across India! 🎉</span>
                )}
              </span>
              <span className="text-[11px] font-bold text-charcoal/70">{shippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-forest transition-all duration-300 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-soft-sage flex items-center justify-center mx-auto text-charcoal/50">
                  <ShoppingBag className="w-8 h-8 text-forest" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-charcoal">Your bag is empty</h4>
                  <p className="text-xs text-charcoal/60 max-w-xs mx-auto mt-1">
                    Discover handy home & kitchen fixes designed to make everyday Indian living simpler.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-bold hover:bg-forest transition-colors shadow-subtle inline-flex items-center gap-2"
                >
                  Explore Everyday Fixes <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="p-3.5 rounded-2xl bg-white border border-charcoal/5 shadow-subtle flex gap-3.5 items-center"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-warm-cream shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-charcoal truncate leading-snug">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-charcoal/60 mt-0.5">
                      Variant: <span className="font-semibold text-charcoal">{item.variant.name}</span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-extrabold text-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center border border-charcoal/15 rounded-full bg-warm-ivory px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 text-charcoal/70 hover:text-charcoal"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="p-1 text-charcoal/70 hover:text-charcoal"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    className="p-2 text-charcoal/40 hover:text-terracotta transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-charcoal/10 bg-white space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-soft-sage/80 border border-panda-green/50 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-forest" />
                      <div>
                        <span className="font-bold text-charcoal">{appliedCoupon.code} applied!</span>
                        <p className="text-[10px] text-charcoal/70">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-charcoal/60 hover:text-terracotta font-semibold underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. PANDA100)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory uppercase placeholder:normal-case focus:outline-none focus:border-charcoal"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      className="px-4 py-2 bg-charcoal text-white text-xs font-bold rounded-xl hover:bg-forest transition-colors disabled:opacity-50"
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal/80 pt-1 border-t border-charcoal/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-forest font-semibold">
                    <span>Coupon Savings</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping across India</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-forest font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-charcoal pt-2 border-t border-charcoal/10">
                  <span>Total (incl. GST)</span>
                  <span className="text-base text-forest">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-full bg-charcoal text-white font-bold text-sm hover:bg-forest transition-all flex items-center justify-center gap-2 shadow-card group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-panda-green group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/60">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>Cash on Delivery (COD) & UPI Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
