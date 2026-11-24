import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { Order } from '../types';

const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('orderId') || '';

  const [query, setQuery] = useState(initialId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (!clean) {
      setError('Please enter your Order ID (e.g. PEK-2026-1234) or 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        // Check local storage fallback
        const local = JSON.parse(localStorage.getItem('panda_local_orders') || '[]');
        const found = local.find(
          (o: Order) =>
            o.id.toLowerCase() === clean.toLowerCase() ||
            (o.customer?.mobile && o.customer.mobile.includes(clean))
        );

        if (found) {
          setOrder(found);
        } else {
          setError(
            data.error ||
              'No order found with that ID or mobile number. Please check and try again, or contact our WhatsApp support.'
          );
        }
      }
    } catch {
      // Local fallback
      const local = JSON.parse(localStorage.getItem('panda_local_orders') || '[]');
      const found = local.find(
        (o: Order) =>
          o.id.toLowerCase() === clean.toLowerCase() ||
          (o.customer?.mobile && o.customer.mobile.includes(clean))
      );

      if (found) {
        setOrder(found);
      } else {
        setError('Could not connect to tracking server. Please try again shortly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          Real-Time Tracking
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
          Track Your Panda Delivery
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/60">
          Enter your Order ID (from SMS / Confirmation) or your registered Indian phone number.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Package className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="e.g. PEK-2026-8492 or 9845012345"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-charcoal/15 text-xs sm:text-sm font-semibold text-charcoal focus:outline-none focus:border-charcoal shadow-subtle"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-charcoal text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-forest transition-colors shadow-subtle flex items-center gap-2 disabled:opacity-50 shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Track Order</span>
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-xs text-terracotta flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Order Tracking Result Card */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-subtle space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
            <div>
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
                Active Order
              </span>
              <h3 className="text-xl font-black text-charcoal">{order.id}</h3>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-soft-sage text-forest">
                <CheckCircle2 className="w-3.5 h-3.5" /> Order Confirmed
              </span>
              <p className="text-xs text-charcoal/60 mt-1">
                Estimated Delivery: <strong className="text-charcoal">{order.estimatedDeliveryDate}</strong>
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
              Shipment Status
            </h4>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-panda-green">
              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-forest border-2 border-white" />
                <p className="text-xs font-bold text-charcoal">Order Verified & Confirmed</p>
                <p className="text-[11px] text-charcoal/60">Order validated with inventory reservation.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-forest border-2 border-white" />
                <p className="text-xs font-bold text-charcoal">Packing at Bengaluru Fulfillment Center</p>
                <p className="text-[11px] text-charcoal/60">
                  Item quality checked and packed in cushioned eco-wrap.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-soft-sage border-2 border-charcoal/20" />
                <p className="text-xs font-bold text-charcoal/60">Dispatched via Express Courier</p>
                <p className="text-[11px] text-charcoal/40">Tracking Ref: {order.trackingNumber}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-soft-sage border-2 border-charcoal/20" />
                <p className="text-xs font-bold text-charcoal/60">Doorstep Delivery Handover</p>
                <p className="text-[11px] text-charcoal/40">
                  {order.paymentMethod === 'cod' ? 'Collect ₹' + order.total + ' via Cash/UPI' : 'Prepaid package handover'}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery & Items details */}
          <div className="pt-4 border-t border-charcoal/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-warm-ivory border border-charcoal/5 space-y-1">
              <p className="font-bold text-charcoal flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest" /> Delivering To:
              </p>
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.flatHouseNo}, {order.shippingAddress.streetArea}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</p>
            </div>

            <div className="p-4 rounded-2xl bg-warm-ivory border border-charcoal/5 space-y-1">
              <p className="font-bold text-charcoal">Order Value:</p>
              <p>Total: <strong className="text-forest text-sm">₹{order.total.toLocaleString('en-IN')}</strong></p>
              <p>Mode: <strong className="uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Prepaid'}</strong></p>
              <p className="text-[11px] text-charcoal/60">Includes all GST & delivery charges.</p>
            </div>
          </div>
        </div>
      )}

      {/* Helpful links */}
      <div className="text-center pt-4">
        <p className="text-xs text-charcoal/60">
          Have an urgent question regarding your delivery?{' '}
          <a
            href="https://wa.me/919845012345"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-forest hover:underline"
          >
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};

export default TrackOrderPage;

