import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';

export default function NewArrivalsPage() {
  const newProducts = [...products].sort((a, b) => b.id - a.id);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Fresh Drops</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a2e]">New Arrivals</h1>
        <p className="text-gray-500 mt-2">The latest styles, just landed</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {newProducts.map((product, i) => (
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
