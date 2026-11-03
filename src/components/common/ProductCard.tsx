import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.variants[0], 1);
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl p-3 sm:p-4 border border-charcoal/10 hover:border-charcoal/30 hover:shadow-card transition-all duration-300 relative">
      {/* Top badges */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1 items-start">
        {product.isBestseller && (
          <span className="bg-charcoal text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-subtle">
            Bestseller
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-subtle">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* Image container */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative aspect-square w-full rounded-2xl overflow-hidden bg-warm-cream/60 mb-3.5 group-hover:bg-warm-cream transition-colors"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* COD pill badge on image bottom-right */}
        <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-forest flex items-center gap-1 shadow-subtle">
          <ShieldCheck className="w-3 h-3 text-panda-green" /> COD Ready
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-charcoal/80">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-xs">{product.rating}</span>
            <span className="text-charcoal/40 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug}`} className="block group-hover:text-forest transition-colors">
          <h3 className="text-sm sm:text-base font-extrabold text-charcoal tracking-tight line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Tagline / Benefit preview */}
        <p className="text-xs text-charcoal/60 line-clamp-1 mt-1 font-medium">
          {product.tagline}
        </p>

        {/* Color variants preview dots */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-[10px] text-charcoal/50 font-medium">Colors:</span>
            {product.variants.map((v) => (
              <span
                key={v.id}
                title={v.colorName}
                className="w-3.5 h-3.5 rounded-full border border-charcoal/20 shadow-xs"
                style={{ backgroundColor: v.colorHex || '#ccc' }}
              />
            ))}
          </div>
        )}

        {/* Price & Quick Add Button */}
        <div className="mt-auto pt-3.5 flex items-center justify-between border-t border-charcoal/5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-charcoal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-charcoal/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-charcoal/50 font-medium">Incl. GST & 7D Repl.</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1 px-3 py-2 rounded-full bg-charcoal text-white hover:bg-forest text-xs font-bold transition-all shadow-subtle active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5 text-panda-green" />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
