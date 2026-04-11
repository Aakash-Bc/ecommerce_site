import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RangeSlider, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconX, IconChevronDown, IconChevronUp, IconStar, IconCheck, IconAdjustments } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories, brands } from '../data/products';
import { filterProducts, sortProducts, formatPrice } from '../utils/helpers';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Best Discount' },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">{title}</span>
        {open
          ? <IconChevronUp size={15} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          : <IconChevronDown size={15} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CategoryPage() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, { open: openFilter, close: closeFilter }] = useDisclosure(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [qvOpen, { open: openQV, close: closeQV }] = useDisclosure(false);

  const catInfo = categories.find(c => c.id === category);

  const filtered = useMemo(() => {
    const f = filterProducts(products, {
      category,
      brand: selectedBrands,
      size: selectedSizes,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating,
      inStock: inStockOnly,
    });
    return sortProducts(f, sortBy);
  }, [category, sortBy, priceRange, selectedBrands, selectedSizes, minRating, inStockOnly]);

  const allSizes = [...new Set(products.filter(p => p.category === category).flatMap(p => p.sizes))];

  const activeFilterCount = selectedBrands.length + selectedSizes.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 15000 ? 1 : 0);

  const resetFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMinRating(0);
    setInStockOnly(false);
  };

  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const toggleSize = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const FilterPanel = () => (
    <div>
      {/* Active filters summary */}
      {activeFilterCount > 0 && (
        <div className="mb-5 p-3 bg-red-50 rounded-xl flex items-center justify-between">
          <span className="text-xs font-semibold text-[#e94560]">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
          <button onClick={resetFilters} className="text-xs text-[#e94560] font-bold hover:underline flex items-center gap-1">
            <IconX size={12} /> Clear all
          </button>
        </div>
      )}

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="px-1">
          <RangeSlider
            min={0} max={15000} step={100}
            value={priceRange}
            onChange={setPriceRange}
            label={v => formatPrice(v)}
            color="red"
            size="sm"
            styles={{
              thumb: { borderWidth: 2, borderColor: '#e94560', backgroundColor: '#fff', width: 18, height: 18 },
              track: { height: 4 },
              bar: { backgroundColor: '#e94560' },
            }}
          />
          <div className="flex justify-between mt-3 gap-2">
            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[10px] text-gray-400 font-medium">MIN</p>
              <p className="text-xs font-bold text-gray-800">{formatPrice(priceRange[0])}</p>
            </div>
            <div className="flex items-center text-gray-300 text-xs">—</div>
            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[10px] text-gray-400 font-medium">MAX</p>
              <p className="text-xs font-bold text-gray-800">{formatPrice(priceRange[1])}</p>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brand">
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 custom-scroll">
          {brands.map(b => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                selectedBrands.includes(b)
                  ? 'bg-[#e94560] text-white font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{b}</span>
              {selectedBrands.includes(b) && <IconCheck size={14} />}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map(s => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all ${
                selectedSizes.includes(s)
                  ? 'border-[#e94560] bg-[#e94560] text-white shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Min Rating">
        <div className="space-y-1.5">
          {[{ v: 0, label: 'All Ratings' }, { v: 3, label: '3★ & above' }, { v: 4, label: '4★ & above' }, { v: 4.5, label: '4.5★ & above' }].map(({ v, label }) => (
            <button
              key={v}
              onClick={() => setMinRating(v)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                minRating === v
                  ? 'bg-amber-50 text-amber-700 font-semibold border-2 border-amber-300'
                  : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              {v > 0 && <IconStar size={13} fill="#f59e0b" color="#f59e0b" />}
              <span>{label}</span>
              {minRating === v && <IconCheck size={13} className="ml-auto" />}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* In Stock */}
      <FilterSection title="Availability" defaultOpen={false}>
        <button
          onClick={() => setInStockOnly(v => !v)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border-2 ${
            inStockOnly
              ? 'border-green-400 bg-green-50 text-green-700 font-semibold'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all ${inStockOnly ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
            {inStockOnly && <IconCheck size={10} color="white" strokeWidth={3} />}
          </div>
          In Stock Only
        </button>
      </FilterSection>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#e94560] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold capitalize">{catInfo?.label || category}</span>
      </div>

      {/* Page header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a2e] capitalize">{catInfo?.label || category}</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} products found</p>
        </div>
        {/* Subcategory pills */}
        {catInfo && (
          <div className="hidden lg:flex gap-2 flex-wrap justify-end max-w-lg">
            <Link to={`/category/${category}`} className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#1a1a2e] text-white shadow-sm">All</Link>
            {catInfo.subcategories.slice(0, 5).map(sub => (
              <Link
                key={sub}
                to={`/category/${category}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-1.5 text-xs font-semibold rounded-full border border-gray-200 text-gray-600 hover:border-[#1a1a2e] hover:text-[#1a1a2e] transition-all bg-white"
              >
                {sub}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-7">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
                  <IconAdjustments size={14} color="white" />
                </div>
                <span className="font-bold text-gray-900 text-sm">Filters</span>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-xs text-[#e94560] font-semibold hover:underline">Reset</button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Products area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <button
              onClick={openFilter}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#e94560] transition-colors"
            >
              <IconFilter size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#e94560] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>

            {/* Mobile subcategory scroll */}
            {catInfo && (
              <div className="flex gap-2 overflow-x-auto lg:hidden flex-1 scrollbar-hide">
                <Link to={`/category/${category}`} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#1a1a2e] text-white whitespace-nowrap flex-shrink-0">All</Link>
                {catInfo.subcategories.map(sub => (
                  <Link
                    key={sub}
                    to={`/category/${category}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 text-gray-600 whitespace-nowrap flex-shrink-0 bg-white"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto flex-shrink-0">
              <span className="text-xs text-gray-400 hidden sm:block font-medium">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-8 cursor-pointer hover:border-gray-400 focus:outline-none focus:border-[#e94560] transition-colors"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBrands.map(b => (
                <span key={b} className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1a2e] text-white text-xs font-semibold rounded-full">
                  {b}
                  <button onClick={() => toggleBrand(b)}><IconX size={11} /></button>
                </span>
              ))}
              {selectedSizes.map(s => (
                <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-[#e94560] text-white text-xs font-semibold rounded-full">
                  Size: {s}
                  <button onClick={() => toggleSize(s)}><IconX size={11} /></button>
                </span>
              ))}
              {minRating > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  {minRating}★+
                  <button onClick={() => setMinRating(0)}><IconX size={11} /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  In Stock
                  <button onClick={() => setInStockOnly(false)}><IconX size={11} /></button>
                </span>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 text-sm mb-5">Try adjusting your filters</p>
              <button onClick={resetFilters} className="px-6 py-2.5 bg-[#e94560] text-white rounded-full text-sm font-semibold hover:bg-[#c73652] transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => { setQuickViewProduct(p); openQV(); }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        opened={filterOpen}
        onClose={closeFilter}
        title={
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
              <IconAdjustments size={14} color="white" />
            </div>
            <span className="font-bold text-gray-900">Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#e94560] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{activeFilterCount} active</span>
            )}
          </div>
        }
        position="left"
        size="xs"
        styles={{ body: { padding: '16px' } }}
      >
        <FilterPanel />
        <div className="mt-6">
          <button
            onClick={closeFilter}
            className="w-full py-3 bg-[#1a1a2e] text-white rounded-xl font-semibold text-sm hover:bg-[#e94560] transition-colors"
          >
            Show {filtered.length} Results
          </button>
        </div>
      </Drawer>

      <QuickViewModal product={quickViewProduct} opened={qvOpen} onClose={closeQV} />
    </div>
  );
}
