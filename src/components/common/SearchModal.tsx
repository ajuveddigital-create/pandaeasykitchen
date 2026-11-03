import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Car Vacuum', 'Electric Chopper', 'Water Pump', 'Cable Organizer', 'Bag Sealer', 'Trash Can'];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const clean = query.toLowerCase().trim();
    const matched = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.tagline.toLowerCase().includes(clean) ||
        p.categoryLabel.toLowerCase().includes(clean) ||
        p.shortDescription.toLowerCase().includes(clean)
      );
    });

    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handlePopularClick = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <div className="bg-warm-ivory w-full max-w-2xl rounded-3xl shadow-floating border border-charcoal/10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-charcoal/10 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-charcoal/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search useful home & kitchen gadgets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-charcoal text-base sm:text-lg focus:outline-none placeholder:text-charcoal/40 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-charcoal/40 hover:text-charcoal hover:bg-soft-sage transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-soft-sage text-charcoal hover:bg-charcoal hover:text-white transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-charcoal/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-forest" /> Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularClick(term)}
                      className="px-3.5 py-1.5 bg-white border border-charcoal/10 hover:border-panda-green hover:bg-soft-sage text-charcoal text-xs font-semibold rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-charcoal/50 uppercase tracking-wider mb-3">
                  Trending Today
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.slug)}
                      className="cursor-pointer p-3 rounded-2xl bg-white border border-charcoal/5 hover:border-panda-green transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover bg-warm-cream shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-charcoal truncate group-hover:text-forest transition-colors">
                          {p.name}
                        </p>
                        <p className="text-xs text-charcoal/60 mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-charcoal/60">
                Found {results.length} result{results.length > 1 ? 's' : ''} for "{query}"
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="cursor-pointer p-3.5 rounded-2xl bg-white border border-charcoal/10 hover:border-panda-green hover:shadow-subtle transition-all flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-warm-cream shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-forest tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <h4 className="text-sm font-bold text-charcoal group-hover:text-forest transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-charcoal/60 truncate mt-0.5">{product.tagline}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-extrabold text-charcoal">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-charcoal/40 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-charcoal/30 group-hover:text-charcoal group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-soft-sage text-charcoal flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-charcoal/60" />
              </div>
              <h4 className="text-base font-bold text-charcoal">No gadgets found</h4>
              <p className="text-xs text-charcoal/60 max-w-xs mx-auto mt-1">
                We couldn't find matches for "{query}". Try searching for vacuum, chopper, dispenser, or organizer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
