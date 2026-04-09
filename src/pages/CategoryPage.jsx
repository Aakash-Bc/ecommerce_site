import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Select, RangeSlider, Checkbox, MultiSelect, Drawer, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconSortAscending, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { products, categories, brands } from '../data/products';
import { filterProducts, sortProducts, formatPrice } from '../utils/helpers';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Highest Discount' },
];

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

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Price Range</h4>
        <RangeSlider
          min={0} max={15000} step={100}
          value={priceRange}
          onChange={setPriceRange}
          label={v => formatPrice(v)}
          color="red"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map(b => (
            <Checkbox
              key={b}
              label={b}
              size="sm"
              checked={selectedBrands.includes(b)}
              onChange={e => setSelectedBrands(prev =>
                e.target.checked ? [...prev, b] : prev.filter(x => x !== b)
              )}
              color="red"
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSizes(prev =>
                prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
              )}
              className={`px-3 py-1.5 text-xs border rounded-lg transition-all ${
                selectedSizes.includes(s)
                  ? 'border-[#e94560] bg-[#e94560] text-white'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Min Rating</h4>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1.5 text-xs border rounded-lg transition-all ${
                minRating === r ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600'
              }`}
            >
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <Checkbox
        label="In Stock Only"
        checked={inStockOnly}
        onChange={e => setInStockOnly(e.target.checked)}
        color="red"
        size="sm"
      />

      {/* Reset */}
      <button
        onClick={() => { setPriceRange([0, 15000]); setSelectedBrands([]); setSelectedSizes([]); setMinRating(0); setInStockOnly(false); }}
        className="w-full py-2 text-sm text-[#e94560] border border-[#e94560] rounded-lg hover:bg-red-50 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#e94560]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium capitalize">{category}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#1a1a2e] capitalize">{catInfo?.label || category}</h1>
        <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-5 text-base">Filters</h3>
            <FilterPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <button
              onClick={openFilter}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <IconFilter size={16} /> Filters
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
              <Select
                data={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
                radius="md"
                w={180}
                styles={{ input: { fontSize: '13px' } }}
              />
            </div>
          </div>

          {/* Subcategory tabs */}
          {catInfo && (
            <div className="flex gap-2 flex-wrap mb-6">
              <Link
                to={`/category/${category}`}
                className="px-4 py-1.5 text-sm rounded-full bg-[#1a1a2e] text-white font-medium"
              >
                All
              </Link>
              {catInfo.subcategories.map(sub => (
                <Link
                  key={sub}
                  to={`/category/${category}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-1.5 text-sm rounded-full border border-gray-200 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-colors"
                >
                  {sub}
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
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
      <Drawer opened={filterOpen} onClose={closeFilter} title="Filters" position="left" size="xs">
        <FilterPanel />
      </Drawer>

      <QuickViewModal product={quickViewProduct} opened={qvOpen} onClose={closeQV} />
    </div>
  );
}
