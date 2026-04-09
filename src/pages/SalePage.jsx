import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { products } from '../data/products';
import { sortProducts } from '../utils/helpers';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { Select } from '@mantine/core';

export default function SalePage() {
  const saleProducts = products.filter(p => p.discountPercentage >= 20);
  const [sortBy, setSortBy] = useState('discount');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const sorted = sortProducts(saleProducts, sortBy);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#e94560] to-[#c73652] rounded-2xl p-8 mb-8 text-white text-center">
        <h1 className="font-heading text-4xl font-bold mb-2">🔥 Sale</h1>
        <p className="text-red-100">Up to 50% off on selected items. Limited time only!</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{sorted.length} sale items</p>
        <Select
          data={[
            { value: 'discount', label: 'Highest Discount' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
          ]}
          value={sortBy}
          onChange={setSortBy}
          size="sm"
          radius="md"
          w={180}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sorted.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <ProductCard product={product} onQuickView={(p) => { setQuickViewProduct(p); open(); }} />
          </motion.div>
        ))}
      </div>

      <QuickViewModal product={quickViewProduct} opened={opened} onClose={close} />
    </div>
  );
}
