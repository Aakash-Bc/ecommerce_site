import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useDisclosure } from '@mantine/hooks';
import { products } from '../../data/products';

function useCountdown(targetHours = 8) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: targetHours, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const pad = (n) => String(n).padStart(2, '0');

export default function FlashSale() {
  const time = useCountdown(8);
  const flashProducts = products.filter(p => p.discountPercentage >= 30).slice(0, 5);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <section className="py-14 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⚡</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">Flash Sale</h2>
              </div>
              <p className="text-gray-400 text-sm">Hurry up! Deals end soon</p>
            </div>
            {/* Countdown */}
            <div className="flex items-center gap-1.5 ml-4">
              {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="bg-[#e94560] text-white text-xl font-bold w-12 h-12 rounded-lg flex items-center justify-center tabular-nums">
                    {val}
                  </div>
                  {i < 2 && <span className="text-white font-bold text-xl">:</span>}
                </div>
              ))}
            </div>
          </div>
          <Link to="/sale" className="text-[#e94560] text-sm font-semibold hover:underline">
            View All Deals →
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {flashProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} onQuickView={(p) => { setQuickViewProduct(p); open(); }} />
            </motion.div>
          ))}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} opened={opened} onClose={close} />
    </section>
  );
}
