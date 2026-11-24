import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronDown,
  Star,
  Flame,
  Award,
  BatteryCharging,
  ThumbsUp,
  RotateCcw,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';

const PROBLEMS_AND_SOLUTIONS = [
  {
    hassle: 'Tearing up and spending 15 minutes chopping onions & garlic for daily tadka',
    solution: 'Panda SwiftChop pulses 250ml of garlic or onions in 5 seconds flat with zero tears.',
    tag: 'Kitchen Fix',
    productSlug: 'panda-swiftchop-wireless-electric-chopper',
  },
  {
    hassle: 'Dragging a bulky 5kg corded vacuum cleaner or visiting a car wash just for biscuit crumbs',
    solution: 'Panda TurboClean Pro sits in your car door bin, packs 9000Pa suction, and charges with your phone charger.',
    tag: 'Car & Desk Fix',
    productSlug: 'panda-turboclean-pro-cordless-car-vacuum',
  },
  {
    hassle: 'Lifting heavy 20L water bubble cans and risking lower back strain every 3 days',
    solution: 'Panda AquaPure snaps onto standard 20L cans with instant one-touch electric water flow.',
    tag: 'Back Saver',
    productSlug: 'panda-aquapure-automatic-water-dispenser-pump',
  },
  {
    hassle: 'Namkeen, chips, and biscuit packets getting soggy within 24 hours of Indian humidity',
    solution: 'Panda FreshPreserve re-heats and seals snack packets airtight in 3 seconds directly from your fridge door.',
    tag: 'Snack Rescue',
    productSlug: 'panda-freshpreserve-handheld-mini-bag-sealer',
  },
];

const FAQS = [
  {
    q: 'Can I pay via Cash on Delivery (COD)?',
    a: 'Yes, 100%! We provide Cash on Delivery across all serviceable PIN codes in India. When the delivery partner arrives, you can pay in cash or scan their UPI QR code (Google Pay, PhonePe, Paytm).',
  },
  {
    q: 'How long does delivery take across India?',
    a: 'All orders are dispatched from our central Bengaluru warehouse within 24 hours. Metro deliveries (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) typically take 2-3 business days. Other regions take 3-5 business days.',
  },
  {
    q: 'What is your 7-Day Replacement Policy?',
    a: 'If any gadget arrives damaged, defective, or fails during the first 7 days, message our WhatsApp support (+91 98450 12345) with a quick photo or video. We send a brand-new replacement immediately without tedious return paperwork.',
  },
  {
    q: 'Are the batteries rechargeable via regular phone chargers?',
    a: 'Yes! All our powered gadgets use the universal USB Type-C standard. You can safely recharge them using your phone adapter, car USB port, laptop, or power bank.',
  },
  {
    q: 'Are these gadgets tested for Indian conditions?',
    a: 'Absolutely. We test each gadget against typical Indian cooking (tough ginger, small sambar onions, masala pastes), high ambient humidity, and everyday wear before introducing it to our store.',
  },
];

const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-floating">
            {/* Subtle background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-panda-green/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Bold Copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-panda-green text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Small Gadgets. Easier Everyday Living.</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  Goodbye, everyday <br />
                  <span className="text-panda-green underline decoration-panda-green/40 underline-offset-8">
                    little hassles.
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl font-normal leading-relaxed">
                  Clever, reliable tools designed for Indian homes. No cables tangling your kitchen counter, no onion tears, and no dragging heavy vacuums to the car.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/shop"
                    className="px-7 py-3.5 rounded-full bg-panda-green text-charcoal font-black text-sm sm:text-base hover:bg-white hover:text-charcoal transition-all shadow-elevated flex items-center gap-2 group active:scale-95"
                  >
                    <span>Shop Everyday Fixes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/shop?sort=bestseller"
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>Explore Bestsellers</span>
                  </Link>
                </div>

                {/* Micro trust stats */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                  <div>
                    <div className="flex items-center gap-1 text-panda-green font-black text-lg sm:text-xl">
                      <span>4.8</span>
                      <Star className="w-4 h-4 fill-panda-green text-panda-green inline" />
                    </div>
                    <p className="text-[11px] text-white/60 font-medium">Over 2,200+ Reviews</p>
                  </div>
                  <div>
                    <div className="text-white font-black text-lg sm:text-xl">45,000+</div>
                    <p className="text-[11px] text-white/60 font-medium">Indian Homes Reached</p>
                  </div>
                  <div>
                    <div className="text-panda-green font-black text-lg sm:text-xl">100% COD</div>
                    <p className="text-[11px] text-white/60 font-medium">Pay on Delivery</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80"
                    alt="Panda TurboClean Pro Handheld Car Vacuum"
                    className="w-full aspect-4/3 object-cover rounded-2xl"
                  />
                  {/* Floating Highlight Tag */}
                  <div className="absolute bottom-6 left-6 right-6 bg-charcoal/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-panda-green tracking-wider">
                        Flagship Bestseller
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        Panda TurboClean Pro (9000Pa)
                      </h4>
                      <p className="text-[11px] text-white/70">Cordless • Type-C Rechargeable</p>
                    </div>
                    <Link
                      to="/product/panda-turboclean-pro-cordless-car-vacuum"
                      className="px-3 py-1.5 bg-panda-green text-charcoal font-black text-xs rounded-xl hover:bg-white transition-colors shrink-0"
                    >
                      ₹1,499
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-forest uppercase tracking-wider">
              Browse By Room & Task
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
              Engineered for everyday routines
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-charcoal hover:text-forest flex items-center gap-1 group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-charcoal/10 hover:border-charcoal/30 hover:shadow-card transition-all duration-300 flex flex-col p-6"
            >
              <div className="aspect-16/10 rounded-2xl overflow-hidden bg-warm-cream mb-5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-charcoal group-hover:text-forest transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-bold text-charcoal/50 bg-soft-sage px-2 py-0.5 rounded-full">
                    {cat.count} items
                  </span>
                </div>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-bold text-forest group-hover:text-charcoal transition-colors">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Problem-to-Solution Interactive Section (WTFproof style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-soft-sage/50 rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 border border-charcoal/10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-forest bg-white px-3 py-1 rounded-full border border-charcoal/10">
              Problem → Solution
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight mt-3">
              Why settle for daily friction?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
              Most household chores are annoying simply because standard tools were designed 20 years ago. Here is how Panda Easy Kitchen fixes them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PROBLEMS_AND_SOLUTIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-charcoal/10 shadow-subtle hover:border-panda-green hover:shadow-card transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-xs font-bold text-charcoal/40">Fix #{idx + 1}</span>
                </div>

                {/* The Hassle */}
                <div className="p-3.5 rounded-2xl bg-warm-ivory border border-charcoal/5">
                  <p className="text-xs text-charcoal/60 font-medium">The common hassle:</p>
                  <p className="text-xs sm:text-sm font-semibold text-charcoal mt-1 line-through decoration-terracotta decoration-2">
                    {item.hassle}
                  </p>
                </div>

                {/* The Panda Solution */}
                <div className="p-3.5 rounded-2xl bg-soft-sage/70 border border-panda-green/50">
                  <p className="text-xs text-forest font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> The Panda Fix:
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-charcoal mt-1 leading-snug">
                    {item.solution}
                  </p>
                </div>

                <Link
                  to={`/product/${item.productSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-forest transition-colors pt-1"
                >
                  <span>See product specs & reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-forest uppercase tracking-wider">
                Tried & Tested
              </span>
              <span className="bg-charcoal text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Bestsellers
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
              Loved by 45,000+ Indian households
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-charcoal hover:text-forest flex items-center gap-1 group"
          >
            <span>Explore all {PRODUCTS.length} gadgets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Spotlight Product Breakdown (Lightpod style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 border border-white/10 shadow-floating">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side: Specs and Exploded features */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-panda-green text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Featured Engineering Focus</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Panda SwiftChop 250ml Wireless Chopper
              </h2>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                We designed the SwiftChop specifically for Indian cooking styles — where fresh ginger, garlic, green chilies, and onions form the foundation of almost every meal.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-panda-green font-bold text-sm">
                    <Zap className="w-4 h-4" /> 45W Copper Motor
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    High torque crushes tough ginger root and onions without stalling.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-panda-green font-bold text-sm">
                    <BatteryCharging className="w-4 h-4" /> 40 Chops / Charge
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    USB-C rechargeable battery lasts 2+ weeks of everyday meals.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-panda-green font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" /> Magnetic Lock
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    Hall effect sensor prevents spinning until the lid is securely snapped.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-panda-green font-bold text-sm">
                    <RotateCcw className="w-4 h-4" /> 15s Rinse Clean
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    BPA-free bowl and stainless steel blades wash under cold tap water.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/product/panda-swiftchop-wireless-electric-chopper"
                  className="px-6 py-3 rounded-full bg-panda-green text-charcoal font-black text-xs sm:text-sm hover:bg-white transition-all shadow-subtle flex items-center gap-2"
                >
                  <span>View Full Details & Specs (₹899)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right side: Image presentation */}
            <div className="lg:col-span-6">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2">
                <img
                  src="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1000&q=80"
                  alt="Panda SwiftChop in Indian kitchen"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars / Why Panda? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-forest uppercase tracking-wider">
            Our Brand Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
            Built for how India really lives
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            No gimmicks, no flimsy dropshipped junk. Every tool has been verified for daily Indian use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-soft-sage text-forest flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-charcoal">Tested on Indian Masalas</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              We test blades and motors with fibrous ginger, hard garlic pods, and onion skins — not just soft Western tomatoes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-soft-sage text-forest flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-charcoal">Universal Type-C Standard</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Never hunt for proprietary adapter cords. Every powered tool recharges with your standard Android or iPhone USB-C cable.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-soft-sage text-forest flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-charcoal">100% Honest Cash on Delivery</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              We don't force online prepayments. Check your package when it arrives and pay the courier agent via cash or UPI.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-soft-sage text-forest flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-charcoal">7-Day Replacement Safety</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              If an item fails or gets damaged during shipping, we replace it with a fresh unit on priority via WhatsApp support.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-forest uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
            Real feedback from Indian homes
          </h2>
          <p className="text-xs text-charcoal/60 mt-1">
            Authentic verified purchases from Bengaluru, Mumbai, Delhi, Pune, Chennai & beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-charcoal">
                "Lifts biscuit crumbs from Creta car seats in seconds"
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Small enough to stay in the driver door pocket. 9000Pa suction actually picks up dried mud and biscuit crumbs without stuttering. Type-C charging is super convenient.
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-charcoal">Vikram Sundaram</p>
                <p className="text-[11px] text-charcoal/50">Bengaluru, Karnataka</p>
              </div>
              <span className="text-[10px] font-bold text-forest bg-soft-sage px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-charcoal">
                "Morning sambar prep time cut in half"
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                I use this every single morning for ginger, garlic, and small sambar onions. 5 pulses and it is minced uniformly without turning into watery mush like a heavy mixie does.
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-charcoal">Meenakshi Iyer</p>
                <p className="text-[11px] text-charcoal/50">Chennai, Tamil Nadu</p>
              </div>
              <span className="text-[10px] font-bold text-forest bg-soft-sage px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-subtle flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-charcoal">
                "Water dispenser solved back pain for parents"
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Lifting heavy 20kg cans onto manual stands was causing back pain for my father. Now they just press the button and fill their copper jugs effortlessly. Battery easily lasts 3 weeks.
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-charcoal">Siddharth Rao</p>
                <p className="text-[11px] text-charcoal/50">Mumbai, Maharashtra</p>
              </div>
              <span className="text-[10px] font-bold text-forest bg-soft-sage px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-forest uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-charcoal/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-charcoal hover:text-forest transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal/50 transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? 'rotate-180 text-forest' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-charcoal/70 leading-relaxed border-t border-charcoal/5 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-floating">
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to make everyday living easier?
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Free delivery on orders ₹499+ across all India. Cash on Delivery supported.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="px-7 py-3 rounded-full bg-panda-green text-charcoal font-black text-xs sm:text-sm hover:bg-white transition-all shadow-subtle flex items-center gap-2"
              >
                <span>Shop All Gadgets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

