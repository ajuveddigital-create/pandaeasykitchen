import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹999', min: 500, max: 999 },
  { id: '1000-1500', label: '₹1,000 – ₹1,499', min: 1000, max: 1499 },
  { id: 'above-1500', label: '₹1,500 & Above', min: 1500, max: Infinity },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'bestseller', label: 'Bestsellers First' },
  { id: 'rating', label: 'Highest Customer Rating' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';
  const searchParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>(sortParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync category param if URL changes
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (sortParam) setSelectedSort(sortParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [categoryParam, sortParam, searchParam]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== 'all') {
        const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
        if (range && (product.price < (range.min || 0) || product.price > (range.max || Infinity))) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const clean = searchQuery.toLowerCase().trim();
        const matches =
          product.name.toLowerCase().includes(clean) ||
          product.tagline.toLowerCase().includes(clean) ||
          product.categoryLabel.toLowerCase().includes(clean) ||
          product.shortDescription.toLowerCase().includes(clean);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'bestseller') {
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
      if (selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      if (selectedSort === 'price-asc') {
        return a.price - b.price;
      }
      if (selectedSort === 'price-desc') {
        return b.price - a.price;
      }
      return 0; // featured maintains default order
    });
  }, [selectedCategory, selectedPriceRange, selectedSort, searchQuery]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedSort('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-charcoal/10 pb-6">
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          Panda Catalog
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight mt-1">
          {selectedCategory === 'kitchen-gadgets'
            ? 'Kitchen Gadgets'
            : selectedCategory === 'cleaning-gadgets'
            ? 'Cleaning Gadgets'
            : selectedCategory === 'home-organization'
            ? 'Home Organization'
            : 'All Practical Gadgets'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/60 mt-1 max-w-xl">
          Clever tools made to solve everyday Indian home frictions. COD available with free delivery over ₹499.
        </p>
      </div>

      {/* Category Pills Bar (Horizontal scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-charcoal text-white shadow-subtle'
              : 'bg-white border border-charcoal/10 text-charcoal hover:bg-soft-sage'
          }`}
        >
          All Gadgets ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-charcoal text-white shadow-subtle'
                : 'bg-white border border-charcoal/10 text-charcoal hover:bg-soft-sage'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Controls Bar: Search, Price filter & Sort */}
      <div className="bg-white rounded-2xl p-4 border border-charcoal/10 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search in catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-warm-ivory border border-charcoal/10 text-xs font-medium text-charcoal focus:outline-none focus:border-charcoal placeholder:text-charcoal/40"
          />
        </div>

        {/* Price Chips */}
        <div className="hidden lg:flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-charcoal/50 mr-1">Price:</span>
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedPriceRange === range.id
                  ? 'bg-soft-sage text-forest font-bold border border-forest/20'
                  : 'text-charcoal/60 hover:text-charcoal hover:bg-warm-ivory'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-charcoal/50" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-warm-ivory border border-charcoal/10 rounded-xl px-3 py-2 text-xs font-bold text-charcoal focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'all' || selectedPriceRange !== 'all' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-terracotta hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-charcoal/60 font-semibold px-1">
        <span>Showing {filteredProducts.length} items</span>
        {selectedCategory !== 'all' && (
          <span className="text-forest">Filtered by: {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-charcoal/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-soft-sage text-forest flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6 text-charcoal/40" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal">No matching gadgets found</h3>
            <p className="text-xs text-charcoal/60 max-w-sm mx-auto mt-1">
              We couldn't find items matching your current filters. Try resetting the price range or search terms.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-bold hover:bg-forest transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
