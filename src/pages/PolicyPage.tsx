import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, ArrowLeft } from 'lucide-react';

const POLICY_CONTENT: { [key: string]: { title: string; subtitle: string; body: React.ReactNode } } = {
  shipping: {
    title: 'Shipping & Delivery Policy',
    subtitle: 'Transparent, reliable doorstep delivery across all of India.',
    body: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
        <h3 className="text-base font-bold text-charcoal">1. All-India Delivery Coverage</h3>
        <p>
          Panda Easy Kitchen delivers across 26,000+ PIN codes covering all 28 Indian states and Union Territories. We partner with India’s leading tier-1 express couriers including Delhivery, BlueDart, and DTDC.
        </p>

        <h3 className="text-base font-bold text-charcoal">2. Dispatch Timelines</h3>
        <p>
          All orders confirmed before 3:00 PM IST on business days are dispatched from our central fulfillment hub in Bengaluru on the same day. Orders received later dispatch on the following working morning.
        </p>

        <h3 className="text-base font-bold text-charcoal">3. Estimated Delivery Times</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Bengaluru & Karnataka:</strong> 1 to 2 business days.</li>
          <li><strong>Tier-1 Metro Cities (Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata):</strong> 2 to 3 business days.</li>
          <li><strong>Tier-2 and Tier-3 Indian Cities:</strong> 3 to 5 business days.</li>
        </ul>

        <h3 className="text-base font-bold text-charcoal">4. Free Shipping Threshold</h3>
        <p>
          All prepaid and Cash on Delivery orders with a cart value of <strong>₹499 or higher</strong> receive 100% Free Shipping. For orders below ₹499, a nominal flat courier fee of ₹49 applies.
        </p>
      </div>
    ),
  },
  returns: {
    title: '7-Day Replacement Guarantee',
    subtitle: 'Hassle-free replacement for transit damages or defects.',
    body: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
        <h3 className="text-base font-bold text-charcoal">1. Our 7-Day Guarantee</h3>
        <p>
          Every gadget we sell undergoes factory and warehouse pre-dispatch testing. In the rare event that your item arrives with transit damage, missing parts, or stops functioning within 7 days of delivery, we provide an immediate brand-new replacement.
        </p>

        <h3 className="text-base font-bold text-charcoal">2. How to Claim a Replacement</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Take a short 10-second video or clear photos showing the issue.</li>
          <li>Send it via WhatsApp to our official support team at <strong>+91 98450 12345</strong> along with your Order ID.</li>
          <li>Our team reviews and approves your replacement within 2 business hours.</li>
          <li>A fresh replacement unit is dispatched via priority courier.</li>
        </ol>

        <h3 className="text-base font-bold text-charcoal">3. Conditions</h3>
        <p>
          The item must include original accessories and retail packaging. Misuse or accidental water submersion of non-waterproof motor tops is not covered under transit replacement.
        </p>
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How Panda Easy Kitchen protects and respects your personal information.',
    body: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
        <h3 className="text-base font-bold text-charcoal">1. Information We Collect</h3>
        <p>
          We collect your name, Indian delivery address, postal PIN code, mobile number, and email strictly for the purpose of processing, dispatching, and providing delivery tracking SMS for your orders.
        </p>

        <h3 className="text-base font-bold text-charcoal">2. Payment Data Security</h3>
        <p>
          We do NOT store credit/debit card numbers or UPI PINs on our servers. All digital transactions are processed through RBI-compliant, 256-bit SSL encrypted payment gateways.
        </p>

        <h3 className="text-base font-bold text-charcoal">3. No Spam Policy</h3>
        <p>
          We never sell, rent, or trade your personal data with third-party advertising brokers. You will only receive transactional SMS and WhatsApp notifications directly related to your delivery status.
        </p>
      </div>
    ),
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Clear terms for shopping at Panda Easy Kitchen.',
    body: (
      <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
        <h3 className="text-base font-bold text-charcoal">1. Pricing & Indian Taxes</h3>
        <p>
          All product prices displayed on Panda Easy Kitchen are in Indian Rupees (INR ₹) and are inclusive of Goods and Services Tax (GST).
        </p>

        <h3 className="text-base font-bold text-charcoal">2. Cash on Delivery (COD) Terms</h3>
        <p>
          When choosing Cash on Delivery, customers agree to pay the delivery executive in cash or via UPI QR scan at the time of delivery. Please ensure a representative is available at the provided delivery address.
        </p>

        <h3 className="text-base font-bold text-charcoal">3. Governing Jurisdiction</h3>
        <p>
          Any disputes arising out of purchases from Panda Easy Kitchen are subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
        </p>
      </div>
    ),
  },
};

const PolicyPage: React.FC = () => {
  const { policy } = useParams<{ policy: string }>();
  const activeKey = policy || 'shipping';
  const content = POLICY_CONTENT[activeKey] || POLICY_CONTENT.shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal/60 hover:text-charcoal"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-subtle space-y-6">
        <div className="border-b border-charcoal/10 pb-4">
          <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
            Legal & Customer Trust
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
            {content.title}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/60 mt-1">{content.subtitle}</p>
        </div>

        <div>{content.body}</div>

        <div className="pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal/60">
          <span>Panda Easy Kitchen Bengaluru Fulfillment Hub</span>
          <Link to="/contact" className="font-bold text-forest hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;

