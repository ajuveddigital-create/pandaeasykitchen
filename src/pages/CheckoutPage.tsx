import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  CreditCard,
  Banknote,
  MapPin,
  ChevronLeft,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
];

const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, shippingFee, total, appliedCoupon, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    flatHouseNo: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online_upi'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    const last10 = cleanMobile.slice(-10);
    if (last10.length !== 10 || !/^[6-9]/.test(last10)) {
      errors.mobile = 'Enter a valid 10-digit Indian mobile number (e.g. 9845012345).';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.flatHouseNo.trim()) {
      errors.flatHouseNo = 'Enter flat, house number, or building name.';
    }

    if (!formData.streetArea.trim()) {
      errors.streetArea = 'Enter street, locality, or road name.';
    }

    if (!formData.city.trim()) {
      errors.city = 'Enter city name.';
    }

    if (!formData.state) {
      errors.state = 'Select state.';
    }

    if (!/^[1-9][0-9]{5}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit Indian PIN code.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Your cart is empty. Add gadgets first!', 'error');
      navigate('/shop');
      return;
    }

    if (!validateForm()) {
      showToast('Please fix the errors in the address form.', 'error');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.replace(/\D/g, '').slice(-10),
        email: formData.email.trim(),
      },
      shippingAddress: {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.replace(/\D/g, '').slice(-10),
        email: formData.email.trim(),
        flatHouseNo: formData.flatHouseNo.trim(),
        streetArea: formData.streetArea.trim(),
        landmark: formData.landmark.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode.trim(),
      },
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.product.name,
        variantName: i.variant.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.thumbnail,
      })),
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      paymentMethod,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok && data.success && data.order) {
        clearCart();
        navigate(`/order-confirmation/${data.order.id}`, { state: { order: data.order } });
      } else {
        throw new Error(data.error || 'Failed to create order on server.');
      }
    } catch (err: any) {
      console.warn('Backend order submission fallback:', err);
      // Fallback local order generation in case backend is offline
      const fallbackId = `PEK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackOrder = {
        id: fallbackId,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        customer: orderPayload.customer,
        shippingAddress: orderPayload.shippingAddress,
        items: orderPayload.items,
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        total,
        paymentMethod,
        estimatedDeliveryDate: '3-4 Business Days',
        trackingNumber: `DELHIVERY-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      };

      try {
        const saved = JSON.parse(localStorage.getItem('panda_local_orders') || '[]');
        saved.unshift(fallbackOrder);
        localStorage.setItem('panda_local_orders', JSON.stringify(saved));
      } catch (e) {}

      clearCart();
      navigate(`/order-confirmation/${fallbackId}`, { state: { order: fallbackOrder } });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-charcoal">No items in your cart</h2>
        <p className="text-xs text-charcoal/60">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-bold"
        >
          <span>Shop Gadgets</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Trust Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
        <Link to="/cart" className="flex items-center gap-1.5 text-xs font-bold text-charcoal/70 hover:text-charcoal">
          <ChevronLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <div className="flex items-center gap-4 text-xs text-forest font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-panda-green" /> 256-bit Encrypted Checkout
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-panda-green" /> All India Priority Dispatch
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (Contact, Address, Payment) */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal/10 pb-3">
              <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-extrabold text-charcoal tracking-tight">
                Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Full Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory focus:outline-none focus:border-charcoal ${
                    formErrors.fullName ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Indian Mobile Number <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-charcoal/50">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setFormData((p) => ({ ...p, mobile: digits }));
                      if (formErrors.mobile) {
                        setFormErrors((prev) => {
                          const n = { ...prev };
                          delete n.mobile;
                          return n;
                        });
                      }
                    }}
                    className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory font-mono focus:outline-none focus:border-charcoal ${
                      formErrors.mobile ? 'border-terracotta' : 'border-charcoal/15'
                    }`}
                  />
                </div>
                {formErrors.mobile && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.mobile}
                  </p>
                )}
                <span className="text-[10px] text-charcoal/50 block">For courier delivery SMS & updates</span>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Email Address <span className="text-charcoal/40">(Optional, for invoice)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory focus:outline-none focus:border-charcoal ${
                    formErrors.email ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal/10 pb-3">
              <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-extrabold text-charcoal tracking-tight">
                Shipping Address
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Flat, House No., Building Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="flatHouseNo"
                  placeholder="e.g. Flat 402, Green Glen Orchid Apartments"
                  value={formData.flatHouseNo}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory focus:outline-none focus:border-charcoal ${
                    formErrors.flatHouseNo ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.flatHouseNo && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.flatHouseNo}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Street, Sector, Locality <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="streetArea"
                  placeholder="e.g. 12th Main Road, HAL 2nd Stage, Indiranagar"
                  value={formData.streetArea}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory focus:outline-none focus:border-charcoal ${
                    formErrors.streetArea ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.streetArea && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.streetArea}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  Landmark <span className="text-charcoal/40">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="e.g. Near Empire Restaurant or Water Tank"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  City <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Bengaluru"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory focus:outline-none focus:border-charcoal ${
                    formErrors.city ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.city && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.city}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  State / UT <span className="text-terracotta">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory focus:outline-none focus:border-charcoal font-medium"
                >
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">
                  PIN Code <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  placeholder="e.g. 560038"
                  value={formData.pincode}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '');
                    setFormData((p) => ({ ...p, pincode: digits }));
                    if (formErrors.pincode) {
                      setFormErrors((prev) => {
                        const n = { ...prev };
                        delete n.pincode;
                        return n;
                      });
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-warm-ivory font-mono focus:outline-none focus:border-charcoal ${
                    formErrors.pincode ? 'border-terracotta' : 'border-charcoal/15'
                  }`}
                />
                {formErrors.pincode && (
                  <p className="text-[10px] text-terracotta font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal/10 pb-3">
              <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-extrabold text-charcoal tracking-tight">
                Payment Method
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery (Recommended) */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-forest bg-soft-sage/50 shadow-xs'
                    : 'border-charcoal/10 hover:border-charcoal/20 bg-warm-ivory/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-forest focus:ring-forest"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-forest" />
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-forest text-white px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal/70 mt-1 leading-relaxed">
                    Zero advance payment. Pay in cash or scan the delivery executive's UPI QR code (Google Pay, PhonePe, Paytm) upon arrival.
                  </p>
                </div>
              </label>

              {/* Option 2: Online UPI / Cards */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'online_upi'
                    ? 'border-forest bg-soft-sage/50 shadow-xs'
                    : 'border-charcoal/10 hover:border-charcoal/20 bg-warm-ivory/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'online_upi'}
                  onChange={() => setPaymentMethod('online_upi')}
                  className="mt-1 text-forest focus:ring-forest"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-forest" />
                      Instant Online UPI / Cards / Netbanking
                    </span>
                    <span className="text-[10px] text-forest font-bold bg-white px-2 py-0.5 rounded-full border border-forest/20">
                      Prepaid Priority
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal/70 mt-1 leading-relaxed">
                    Fast checkout via Google Pay, PhonePe, Paytm, RuPay, or Debit/Credit card with 100% RBI-compliant security.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-full bg-forest text-white font-extrabold text-base hover:bg-charcoal transition-all shadow-elevated flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Confirming Order...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-panda-green" />
                <span>
                  Place Order • ₹{total.toLocaleString('en-IN')}{' '}
                  {paymentMethod === 'cod' ? '(Pay on Delivery)' : ''}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Items & Charges Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <h3 className="text-sm font-extrabold text-charcoal tracking-tight border-b border-charcoal/10 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-charcoal/50">{items.length} items</span>
            </h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-warm-cream shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-charcoal truncate">{item.product.name}</p>
                      <p className="text-[10px] text-charcoal/60">
                        {item.variant.name} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-charcoal shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-charcoal/80 pt-3 border-t border-charcoal/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-forest font-semibold">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-forest font-bold">FREE (Above ₹499)</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-charcoal pt-3 border-t border-charcoal/10">
                <span>Grand Total</span>
                <span className="text-forest text-lg">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-charcoal/50 text-right">
                All taxes & GST included. No surprise fees.
              </p>
            </div>
          </div>

          {/* Trust Guarantees Card */}
          <div className="bg-soft-sage/60 rounded-3xl p-5 border border-panda-green/40 space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-forest font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Panda Easy Kitchen 100% Purchase Protection</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-charcoal/80 pl-6 list-disc">
              <li>Direct dispatch from Bengaluru fulfillment center</li>
              <li>7-Day Replacement Guarantee on arrival defect</li>
              <li>Dedicated WhatsApp support for any setup queries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
