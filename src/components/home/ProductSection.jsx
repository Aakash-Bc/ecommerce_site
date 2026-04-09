import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import ProductCard from '../ui/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';

export default function ProductSection({ title, subtitle, products, viewAllLink, accent = '#e94560' }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    open();
  };

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          {subtitle && <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: accent }}>{subtitle}</p>}
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a1a2e]">{title}</h2>
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-sm font-semibold hover:underline transition-colors hidden sm:block"
            style={{ color: accent }}
          >
            View All →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 10).map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <ProductCard product={product} onQuickView={handleQuickView} />
          </motion.div>
        ))}
      </div>

      {viewAllLink && (
        <div className="text-center mt-8 sm:hidden">
          <Link
            to={viewAllLink}
            className="inline-block px-6 py-2.5 border-2 rounded-full text-sm font-semibold transition-all hover:text-white"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={e => { e.target.style.backgroundColor = accent; }}
            onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; }}
          >
            View All
          </Link>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} opened={opened} onClose={close} />
    </section>
  );
}
