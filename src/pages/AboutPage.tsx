import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Coffee, CheckCircle2, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-panda-green mx-auto bg-white p-1 shadow-subtle">
          <img src="/images/panda-logo.jpg" alt="Panda Chef Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          Our Story & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-charcoal tracking-tight leading-tight">
          Small Gadgets. <br />
          <span className="text-forest">Easier Everyday Living.</span>
        </h1>
        <p className="text-xs sm:text-base text-charcoal/70 leading-relaxed">
          Panda Easy Kitchen was born out of a very simple observation: Indian households don't need complicated smart gadgets with confusing Wi-Fi apps. We need small, practical, well-engineered tools that make everyday tasks 5x faster and zero-stress.
        </p>
      </div>

      {/* The Problem with Most Gadgets */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-subtle space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-charcoal tracking-tight">
          Why did we start Panda Easy Kitchen?
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          <p>
            Too many products sold online in India are either cheap plastic dropshipped gimmicks that break after three uses, or oversized appliances that take up half your kitchen counter and take 20 minutes to clean.
          </p>
          <p>
            Dragging out a 750W mixer grinder just to mince three pods of garlic and a slice of ginger for morning chai or evening tadka makes no sense. Struggling with a heavy corded vacuum cleaner or driving to an expensive car wash just because of biscuit crumbs on your backseat shouldn't be the only option.
          </p>
          <p>
            That’s why we created <strong>Panda Easy Kitchen</strong>. Every gadget in our catalog is hand-selected, rigorously tested on real Indian ingredients (like stubborn ginger roots and thick namkeen packets), and built to last.
          </p>
        </div>
      </div>

      {/* Four Core Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-charcoal">Our Four Quality Pillars</h3>
          <p className="text-xs text-charcoal/60 mt-1">What every product must pass before we put our Panda stamp on it.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-soft-sage/50 border border-panda-green/40 space-y-3">
            <span className="text-xs font-bold text-forest uppercase tracking-wider">01. Practical Everyday Utility</span>
            <h4 className="text-base font-bold text-charcoal">No Gimmicks, Just Real Relief</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              If a product doesn't genuinely save at least 10 minutes of effort or prevent daily annoyance, we don't sell it. Every tool solves a specific, common household annoyance.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-soft-sage/50 border border-panda-green/40 space-y-3">
            <span className="text-xs font-bold text-forest uppercase tracking-wider">02. Modern Universal Power</span>
            <h4 className="text-base font-bold text-charcoal">Type-C Everywhere</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              We eliminated obsolete barrels and custom adapter cords. All our electronic gadgets use the universal USB-C standard so you can charge with your phone adapter anywhere.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-soft-sage/50 border border-panda-green/40 space-y-3">
            <span className="text-xs font-bold text-forest uppercase tracking-wider">03. Food-Grade & Safe</span>
            <h4 className="text-base font-bold text-charcoal">304 Stainless Steel & BPA-Free</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Everything that touches your food — from our water dispenser silicones to chopper blades — uses certified food-grade 304 stainless steel and non-toxic BPA-free materials.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-soft-sage/50 border border-panda-green/40 space-y-3">
            <span className="text-xs font-bold text-forest uppercase tracking-wider">04. Honest Indian Fulfillment</span>
            <h4 className="text-base font-bold text-charcoal">100% COD & 7-Day Replacement</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              We stand behind what we sell. We offer Cash on Delivery to every serviceable PIN code in India, and if anything arrives damaged in transit, we replace it immediately without hassle.
            </p>
          </div>
        </div>
      </div>

      {/* Bengaluru Fulfillment Hub Callout */}
      <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <h3 className="text-xl font-bold text-white">Dispatched from Bengaluru with Care</h3>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
          All our stock is stored, inspected, and packed in our fulfillment center in Indiranagar, Bengaluru. We partner directly with trusted Indian express couriers (Delhivery, BlueDart, DTDC) to ensure packages arrive safely within 2-4 business days.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-panda-green text-charcoal font-bold text-xs hover:bg-white transition-colors"
          >
            <span>Explore the Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
