import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconFlame } from '@tabler/icons-react';
import { products } from '../data/products';
import { sortProducts } from '../utils/helpers';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';

const sortOptions = [
  { value: 'discount', label: 'Highest Discount' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function SalePage() {
  const saleProducts = products.filter(p => p.discountPercentage >= 20);
  const [sortBy, setSortBy] = useState('discount');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const sorted = sortProducts(saleProducts, sortBy);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#e94560] to-[#c73652] p-10 sm:p-14 text-white text-center">
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute top-4 right-20 w-16 h-16 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <IconFlame size={16} className="text-orange-300" />
              Limited Time Offer
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-3 tracking-tight">
              Big Sale
            </h1>
            <p className="text-red-100 text-base sm:text-lg max-w-md mx-auto">
              Up to <span className="text-white font-bold text-2xl">50% OFF</span> on selected items. Don't miss out!
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              {['Free Shipping', 'Easy Returns', 'Authentic Products'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-red-100 font-medium">
                  <div className="w-1.5 h-1.5 bg-orange-300 rounded-full" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-7 bg-white rounded-2xl px-5 py-3.5 shadow-sm border border-gray-100">
        <p className="text-sm font-semibold text-gray-700">
          <span className="text-[#e94560] font-bold">{sorted.length}</span> sale items
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium hidden sm:block">Sort by:</span>
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
