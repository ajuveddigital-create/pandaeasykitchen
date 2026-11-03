import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIZED_FAQS = [
  {
    category: 'Ordering & Payment',
    items: [
      {
        q: 'Is Cash on Delivery (COD) available for my area?',
        a: 'Yes! We support Cash on Delivery (COD) for over 26,000+ Indian PIN codes. You can pay cash or scan the delivery agent\'s UPI QR code (Google Pay, PhonePe, Paytm, BHIM) upon delivery.',
      },
      {
        q: 'Do I have to pay any advance deposit for COD?',
        a: 'No. There is zero upfront payment required for Cash on Delivery orders. You only pay when the physical parcel is handed to you.',
      },
      {
        q: 'What online payment methods do you accept?',
        a: 'We accept UPI (GPay, PhonePe, Paytm), RuPay, Visa, Mastercard, and Netbanking through our secure 256-bit encrypted checkout gateway.',
      },
      {
        q: 'Are there any hidden delivery charges?',
        a: 'None! Orders above ₹499 qualify for 100% Free Shipping anywhere in India. For smaller orders under ₹499, a nominal flat courier fee of ₹49 is charged.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How fast is delivery?',
        a: 'All orders are dispatched from our Bengaluru hub within 24 hours. Metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) typically receive parcels within 2-3 business days. Other regions take 3-5 business days.',
      },
      {
        q: 'How will I track my package?',
        a: 'Once your order is dispatched, you receive an automated SMS with your Delhivery / BlueDart tracking number. You can also track your status anytime on our website under "Track Order".',
      },
    ],
  },
  {
    category: 'Returns & 7-Day Replacement',
    items: [
      {
        q: 'What is your 7-Day Replacement Guarantee?',
        a: 'If any gadget arrives damaged, has missing parts, or stops functioning within 7 days of delivery, simply WhatsApp our support team (+91 98450 12345) with a photo/video. We dispatch a brand-new replacement immediately.',
      },
      {
        q: 'How do I initiate a replacement?',
        a: 'Just send a WhatsApp message to +91 98450 12345 with your Order ID (e.g. PEK-2026-XXXX) and a short video showing the issue. We review and approve replacements within 2 business hours.',
      },
    ],
  },
  {
    category: 'Gadget Care & Technical',
    items: [
      {
        q: 'What type of charger should I use for USB-C gadgets?',
        a: 'You can safely charge all our electronic gadgets with standard 5V/1A or 5V/2A phone adapters, laptop USB ports, or power banks. Avoid ultra-high wattage fast laptop chargers (>65W) to preserve battery longevity.',
      },
      {
        q: 'Can the food chopper parts be cleaned with water?',
        a: 'Yes, the transparent bowl and stainless steel blades are 100% waterproof and washable under running water. The top motor unit can be gently wiped down with a damp cloth.',
      },
    ],
  },
];

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({ '0-0': true, '1-0': true });

  const toggle = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          Help Center
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/60">
          Everything you need to know about delivery across India, Cash on Delivery, warranty, and gadget care.
        </p>
      </div>

      <div className="space-y-10">
        {CATEGORIZED_FAQS.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="text-base font-extrabold text-charcoal tracking-tight border-b border-charcoal/10 pb-2">
              {cat.category}
            </h3>
            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];
                return (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(catIdx, itemIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-charcoal hover:text-forest transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal/50 transition-transform ${
                          isOpen ? 'rotate-180 text-forest' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-charcoal/70 leading-relaxed border-t border-charcoal/5 animate-fade-in">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help CTA */}
      <div className="bg-forest text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-bold text-white">Still have questions?</h4>
          <p className="text-xs text-white/70 mt-0.5">
            Our WhatsApp support is available Monday to Saturday, 9:30 AM to 7:30 PM IST.
          </p>
        </div>
        <a
          href="https://wa.me/919845012345"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-panda-green text-charcoal font-bold text-xs hover:bg-white transition-colors flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default FAQPage;
