import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  PackageCheck,
  Sparkles,
  HelpCircle,
  Share2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import PincodeChecker from '../components/common/PincodeChecker';
import ProductCard from '../components/common/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.slug === slug);

  // Fallback to first product if slug not found
  const currentProduct: Product = product || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(currentProduct.images[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(currentProduct.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'usage' | 'care'>('specs');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Update image and variant when slug changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  const discountPercent = Math.round(
    ((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedVariant, quantity);
    showToast(`Added ${quantity}x ${currentProduct.name} to your bag!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(currentProduct, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProduct.name,
        text: currentProduct.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-charcoal/60 font-medium">
        <Link to="/" className="hover:text-charcoal transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-charcoal/40" />
        <Link to={`/shop?category=${currentProduct.category}`} className="hover:text-charcoal transition-colors">
          {currentProduct.categoryLabel}
        </Link>
        <ChevronRight className="w-3 h-3 text-charcoal/40" />
        <span className="text-charcoal font-semibold truncate max-w-xs">{currentProduct.name}</span>
      </nav>

      {/* Main Lightpod-style Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div
            className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden bg-warm-cream/50 border border-charcoal/10 group cursor-crosshair shadow-subtle"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={selectedImage}
              alt={currentProduct.name}
              className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'group-hover:scale-105'
              }`}
            />
            {currentProduct.badge && (
              <span className="absolute top-4 left-4 bg-charcoal text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-subtle">
                {currentProduct.badge}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-charcoal hover:bg-white shadow-subtle transition-all"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-charcoal/60 px-2 py-0.5 rounded-md pointer-events-none">
              Click to {isZoomed ? 'zoom out' : 'zoom in'}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {currentProduct.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImage(img);
                  setIsZoomed(false);
                }}
                className={`w-20 h-20 rounded-2xl overflow-hidden bg-warm-cream shrink-0 border-2 transition-all ${
                  selectedImage === img
                    ? 'border-forest ring-2 ring-forest/20 shadow-subtle'
                    : 'border-charcoal/10 hover:border-charcoal/30 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Quick trust strip under gallery */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-3 rounded-2xl bg-white border border-charcoal/5">
              <Truck className="w-4 h-4 text-forest mx-auto mb-1" />
              <p className="text-[11px] font-bold text-charcoal">Free Shipping</p>
              <p className="text-[10px] text-charcoal/50">On orders ₹499+</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-charcoal/5">
              <ShieldCheck className="w-4 h-4 text-forest mx-auto mb-1" />
              <p className="text-[11px] font-bold text-charcoal">COD Available</p>
              <p className="text-[10px] text-charcoal/50">Pay at your doorstep</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-charcoal/5">
              <RotateCcw className="w-4 h-4 text-forest mx-auto mb-1" />
              <p className="text-[11px] font-bold text-charcoal">7-Day Replacement</p>
              <p className="text-[10px] text-charcoal/50">Hassle-free guarantee</p>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold text-forest uppercase tracking-wider">
                {currentProduct.categoryLabel}
              </span>
              <span className="text-charcoal/30">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-charcoal">{currentProduct.rating}</span>
                <span className="text-xs text-charcoal/50">({currentProduct.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight leading-tight">
              {currentProduct.name}
            </h1>

            <p className="text-xs sm:text-sm text-charcoal/70 font-medium mt-1.5">
              {currentProduct.tagline}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-white border border-charcoal/10 shadow-subtle flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-black text-charcoal">
                  ₹{currentProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-charcoal/40 line-through">
                  ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
              </div>
              <p className="text-[11px] text-charcoal/50 mt-1">
                Inclusive of all taxes & GST. Free delivery on this item.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-forest bg-soft-sage px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> In Stock
              </span>
              <p className="text-[10px] text-charcoal/50 mt-0.5">Dispatches today</p>
            </div>
          </div>

          {/* Key Benefits Bullets */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-charcoal uppercase tracking-wider">Key Practical Highlights:</p>
            <ul className="space-y-1.5">
              {currentProduct.keyBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-charcoal/80">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Variant Selector */}
          {currentProduct.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-charcoal/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-charcoal">
                  Select Variant: <span className="text-forest font-extrabold">{selectedVariant.name}</span>
                </label>
                <span className="text-[11px] text-charcoal/50 font-mono">SKU: {selectedVariant.sku}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {currentProduct.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedVariant.id === v.id
                        ? 'border-forest bg-soft-sage text-charcoal shadow-xs'
                        : 'border-charcoal/15 bg-white text-charcoal/70 hover:border-charcoal/30'
                    }`}
                  >
                    {v.colorHex && (
                      <span
                        className="w-3 h-3 rounded-full border border-charcoal/20"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-charcoal/20 rounded-full bg-white px-2 py-1.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-charcoal/70 hover:text-charcoal"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-charcoal">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-charcoal/70 hover:text-charcoal"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-4 rounded-full bg-charcoal text-white font-bold text-xs sm:text-sm hover:bg-forest transition-colors shadow-subtle flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <span className="text-white/60">•</span>
                <span>₹{(currentProduct.price * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-4 rounded-full bg-panda-green text-charcoal font-black text-xs sm:text-sm hover:bg-forest hover:text-white transition-all shadow-card flex items-center justify-center gap-2 group"
            >
              <span>Buy Now with Cash on Delivery (COD)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Interactive PIN code check */}
          <div className="pt-2">
            <PincodeChecker />
          </div>
        </div>
      </div>

      {/* Lightpod Deep-Dive Tabs (Specifications, Box Contents, Instructions, Care) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-subtle">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-charcoal/10 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'specs'
                ? 'bg-charcoal text-white'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-soft-sage'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('box')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'box'
                ? 'bg-charcoal text-white'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-soft-sage'
            }`}
          >
            What's in the Box
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'usage'
                ? 'bg-charcoal text-white'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-soft-sage'
            }`}
          >
            Usage Instructions
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'care'
                ? 'bg-charcoal text-white'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-soft-sage'
            }`}
          >
            Care & Safety
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6 animate-fade-in">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProduct.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-warm-ivory border border-charcoal/5 flex justify-between items-center text-xs"
                >
                  <span className="font-semibold text-charcoal/60">{spec.label}</span>
                  <span className="font-extrabold text-charcoal text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'box' && (
            <div className="space-y-3">
              <p className="text-xs text-charcoal/60 font-medium">
                Every unit arrives sealed with all standard accessories needed right out of the box:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.boxContents.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-soft-sage/60 border border-panda-green/40 flex items-center gap-3 text-xs font-bold text-charcoal"
                  >
                    <PackageCheck className="w-4 h-4 text-forest shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-4">
              <p className="text-xs text-charcoal/60 font-medium">
                Step-by-step instructions for getting the best performance from day one:
              </p>
              <div className="space-y-2.5">
                {currentProduct.usageInstructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-warm-ivory border border-charcoal/5 flex items-start gap-3.5 text-xs text-charcoal leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-terracotta/10 border border-terracotta/20 flex items-start gap-3 text-xs text-charcoal">
                <Info className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-terracotta">Safety & Maintenance Guidelines</p>
                  <p className="text-charcoal/70 mt-0.5">
                    Follow these guidelines to extend the lifespan of your gadget:
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {currentProduct.safetyCare.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Genuine Customer Reviews Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-subtle space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-charcoal tracking-tight">
              Genuine Customer Reviews
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-black text-charcoal">{currentProduct.rating} out of 5</span>
              <span className="text-xs text-charcoal/50">({currentProduct.reviewCount} verified ratings)</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Reviews are verified purchases only. Thank you!', 'info')}
            className="px-5 py-2.5 rounded-full bg-soft-sage hover:bg-panda-green text-charcoal text-xs font-bold transition-colors"
          >
            Verified Purchases Only
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {currentProduct.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-warm-ivory border border-charcoal/5 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-charcoal text-white flex items-center justify-center font-bold text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-charcoal">{rev.author}</span>
                    <p className="text-[10px] text-charcoal/50">{rev.city}</p>
                  </div>
                </div>
                <span className="text-[10px] text-charcoal/40 font-medium">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                {rev.verifiedPurchase && (
                  <span className="ml-2 text-[10px] font-bold text-forest bg-soft-sage px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-charcoal">{rev.title}</h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-charcoal tracking-tight">
              Pairs well with this gadget
            </h3>
            <Link to="/shop" className="text-xs font-bold text-forest hover:text-charcoal flex items-center gap-1">
              <span>View catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal/10 p-3 flex items-center justify-between gap-3 shadow-floating">
        <div>
          <span className="text-[10px] text-charcoal/50 block font-medium">Price (incl. GST)</span>
          <span className="text-base font-black text-charcoal">
            ₹{currentProduct.price.toLocaleString('en-IN')}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-full bg-charcoal text-white font-bold text-xs hover:bg-forest transition-colors shadow-subtle flex items-center justify-center gap-2"
        >
          <span>Add to Bag</span>
        </button>
        <button
          onClick={handleBuyNow}
          className="py-3 px-4 rounded-full bg-panda-green text-charcoal font-black text-xs hover:bg-white transition-colors shadow-subtle"
        >
          <span>Buy (COD)</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
