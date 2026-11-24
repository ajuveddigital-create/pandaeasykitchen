import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      showToast('Please fill out your name and message.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Message received! Our team will respond shortly.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          We're Here to Help
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/60">
          Have questions about a gadget, your shipment, or replacement? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {/* WhatsApp Direct Card */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-panda-green" />
              </div>
              <div>
                <h3 className="text-base font-bold text-charcoal">Instant WhatsApp Support</h3>
                <p className="text-xs text-charcoal/60">Fastest response for order and replacement queries</p>
              </div>
            </div>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Available Monday to Saturday: 9:30 AM to 7:30 PM IST. Typical reply time is under 15 minutes during business hours.
            </p>
            <a
              href="https://wa.me/919845012345?text=Hi%20Panda%20Easy%20Kitchen,%20I%20need%20help%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-white font-bold text-xs hover:bg-charcoal transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-panda-green" />
              <span>Open WhatsApp (+91 98450 12345)</span>
            </a>
          </div>

          {/* Email & Warehouse Address */}
          <div className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle space-y-4 text-xs text-charcoal">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-charcoal">Email Support</p>
                <p className="text-charcoal/60 mt-0.5">support@pandaeasykitchen.in</p>
                <p className="text-[11px] text-charcoal/40">We reply to all emails within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-charcoal/5">
              <MapPin className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-charcoal">Fulfillment Hub & Returns Address</p>
                <p className="text-charcoal/70 mt-0.5">
                  Panda Easy Kitchen Logistics<br />
                  Plot 42, 12th Main Road, HAL 2nd Stage,<br />
                  Indiranagar, Bengaluru, Karnataka – 560038
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal/10 shadow-subtle">
          <h3 className="text-base font-extrabold text-charcoal mb-4">Send Us a Direct Message</h3>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-soft-sage/50 rounded-2xl border border-panda-green">
              <CheckCircle2 className="w-10 h-10 text-forest mx-auto" />
              <h4 className="text-sm font-bold text-charcoal">Thank You!</h4>
              <p className="text-xs text-charcoal/70">
                Your message has been received. Our team will contact you shortly via phone or email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">Mobile Number / Order ID</label>
                <input
                  type="text"
                  placeholder="e.g. 9845012345 or PEK-2026-XXXX"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">How can we help?</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you need help with..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal/15 text-xs bg-warm-ivory focus:outline-none focus:border-charcoal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full bg-charcoal text-white font-bold text-xs hover:bg-forest transition-colors shadow-subtle flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-panda-green" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

