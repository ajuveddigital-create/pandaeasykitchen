import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  Calendar,
  MapPin,
  Banknote,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { Order } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    // Fire festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A7C957', '#2D5A27', '#20211F', '#F8F7F2'],
      });
    } catch (e) {}

    // If order not passed in state, fetch from server or localStorage
    if (!order && orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order) setOrder(data.order);
        })
        .catch(() => {
          try {
            const local = JSON.parse(localStorage.getItem('panda_local_orders') || '[]');
            const found = local.find((o: Order) => o.id === orderId);
            if (found) setOrder(found);
          } catch (e) {}
        })
        .finally(() => setLoading(false));
    }
  }, [orderId, order]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-sm font-bold text-charcoal">Loading order receipt...</p>
      </div>
    );
  }

  const currentOrderId = orderId || order?.id || 'PEK-2026-8492';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0">
      {/* Success Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-subtle text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-soft-sage text-forest flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-forest">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
            Thank you for ordering with Panda Easy Kitchen!
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/60">
            Order Reference: <strong className="text-charcoal font-mono">{currentOrderId}</strong>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-soft-sage/60 border border-panda-green/40 text-xs text-charcoal font-semibold">
          <Truck className="w-4 h-4 text-forest" />
          <span>
            Estimated Delivery:{' '}
            <strong className="text-forest">
              {order?.estimatedDeliveryDate || '3-4 Business Days'}
            </strong>
          </span>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-white border border-charcoal/15 text-charcoal text-xs font-bold hover:bg-soft-sage transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Tax Invoice
          </button>
          <Link
            to="/track-order"
            className="px-5 py-2.5 rounded-full bg-charcoal text-white text-xs font-bold hover:bg-forest transition-colors flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-panda-green" /> Track Order Status
          </Link>
          <Link
            to="/shop"
            className="px-5 py-2.5 rounded-full bg-soft-sage text-charcoal text-xs font-bold hover:bg-panda-green transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Shipment Status Visual Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-subtle space-y-6">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-charcoal/60">
          Delivery Progress
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center mx-auto text-xs font-bold">
              ✓
            </div>
            <p className="text-xs font-bold text-charcoal">Order Confirmed</p>
            <p className="text-[10px] text-charcoal/50">Verified & Allocated</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center mx-auto text-xs font-bold">
              2
            </div>
            <p className="text-xs font-bold text-charcoal">Packing at Hub</p>
            <p className="text-[10px] text-charcoal/50">Bengaluru Warehouse</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-soft-sage text-charcoal/60 flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <p className="text-xs font-bold text-charcoal/60">In Transit</p>
            <p className="text-[10px] text-charcoal/40">Delhivery Express</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-soft-sage text-charcoal/60 flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <p className="text-xs font-bold text-charcoal/60">Delivered</p>
            <p className="text-[10px] text-charcoal/40">Doorstep Handover</p>
          </div>
        </div>

        {order?.trackingNumber && (
          <div className="p-3 rounded-xl bg-warm-ivory text-xs flex items-center justify-between">
            <span className="text-charcoal/70">Carrier Tracking Number:</span>
            <span className="font-mono font-bold text-charcoal">{order.trackingNumber}</span>
          </div>
        )}
      </div>

      {/* Order Details & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-forest" /> Delivery Address
          </h4>
          {order?.shippingAddress ? (
            <div className="text-xs text-charcoal space-y-1">
              <p className="font-bold text-sm text-charcoal">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.flatHouseNo}</p>
              <p>{order.shippingAddress.streetArea}</p>
              {order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} –{' '}
                <strong className="font-mono">{order.shippingAddress.pincode}</strong>
              </p>
              <p className="text-charcoal/70 pt-1">
                Phone: <strong>{order.shippingAddress.mobile}</strong>
              </p>
            </div>
          ) : (
            <div className="text-xs text-charcoal">Address details logged with courier dispatch.</div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-forest" /> Payment Details
          </h4>
          <div className="text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-charcoal/70">Payment Mode:</span>
              <span className="font-bold text-charcoal uppercase">
                {order?.paymentMethod === 'online_upi' ? 'Online UPI / Prepaid' : 'Cash on Delivery (COD)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/70">Items Subtotal:</span>
              <span className="font-semibold text-charcoal">₹{order?.subtotal?.toLocaleString('en-IN') || 0}</span>
            </div>
            {order?.discount ? (
              <div className="flex justify-between text-forest font-semibold">
                <span>Coupon Savings:</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span className="text-charcoal/70">Delivery Fee:</span>
              <span className="text-forest font-bold">
                {order?.shippingFee === 0 ? 'FREE' : `₹${order?.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-charcoal pt-2 border-t border-charcoal/10">
              <span>Total Payable:</span>
              <span className="text-forest">₹{order?.total?.toLocaleString('en-IN') || 0}</span>
            </div>
            <p className="text-[10px] text-charcoal/50 pt-1">
              {order?.paymentMethod === 'cod'
                ? 'Please keep cash or UPI app ready when delivery partner arrives.'
                : 'Payment received. Thank you!'}
            </p>
          </div>
        </div>
      </div>

      {/* Items Breakdown Table */}
      {order?.items && order.items.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
            Items in this Shipment
          </h4>
          <div className="divide-y divide-charcoal/5">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-cover bg-warm-cream"
                  />
                  <div>
                    <p className="font-bold text-charcoal">{item.productName}</p>
                    <p className="text-[10px] text-charcoal/60">
                      Variant: {item.variantName} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-charcoal">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Support Callout */}
      <div className="bg-forest text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Need help with this order?</h4>
          <p className="text-xs text-white/70">
            Message us on WhatsApp with Order ID <strong className="text-panda-green">{currentOrderId}</strong>
          </p>
        </div>
        <a
          href={`https://wa.me/919845012345?text=Hi%20Panda%20Easy%20Kitchen,%20I%20have%20a%20question%20regarding%20my%20order%20${currentOrderId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-panda-green text-charcoal text-xs font-extrabold hover:bg-white transition-colors flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

