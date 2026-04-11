import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconSparkles } from '@tabler/icons-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

function sortProducts(arr, by) {
  const copy = [...arr];
  if (by === 'price-asc') return copy.sort((a, b) => a.finalPrice - b.finalPrice);
  if (by === 'price-desc') return copy.sort((a, b) => b.finalPrice - a.finalPrice);
  if (by === 'rating') return copy.sort((a, b) => b.rating - a.rating);
  return copy.sort((a, b) => b.id - a.id);
}

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('newest');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const sorted = sortProducts(products, sortBy);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d5e] p-10 sm:p-14 text-white text-center">
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/5 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <IconSparkles size={15} className="text-yellow-300" />
              Fresh Drops
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-3 tracking-tight">New Arrivals</h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto">
              The latest styles, just landed. Be the first to wear them.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-7 bg-white rounded-2xl px-5 py-3.5 shadow-sm border border-gray-100">
        <p className="text-sm font-semibold text-gray-700">
          <span className="text-[#1a1a2e] font-bold">{sorted.length}</span> products
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium hidden sm:block">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-8 cursor-pointer hover:border-gray-400 focus:outline-none focus:border-[#1a1a2e] transition-colors"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <IconChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid — 3 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {sorted.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.4) }}
          >
            <ProductCard product={product} onQuickView={(p) => { setQuickViewProduct(p); open(); }} />
          </motion.div>
        ))}
      </div>

      <QuickViewModal product={quickViewProduct} opened={opened} onClose={close} />
    </div>
  );
}
