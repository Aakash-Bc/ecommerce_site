import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import ProductCard from '../ui/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { products } from '../../data/products';

function useCountdown(h = 8) {
  const [t, setT] = useState({ h, m: 0, s: 0 });
  useEffect(() => {
    const id = setInterval(() => setT(p => {
      if (p.s > 0) return { ...p, s: p.s - 1 };
      if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
      if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
      return { h, m: 0, s: 0 };
    }), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
const pad = n => String(n).padStart(2, '0');

export default function FlashSale() {
  const time = useCountdown(8);
  const flash = products.filter(p => p.discountPercentage >= 30).slice(0, 3);
  const [qv, setQv] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">Limited Time</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Flash Sale</h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Ends in</span>
            <div className="flex items-center gap-2">
              {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-rose-600 flex items-center justify-center text-2xl font-bold text-white tabular-nums">{v}</div>
                    <span className="text-[9px] mt-1.5 font-bold uppercase tracking-wider text-gray-500">{['HRS','MIN','SEC'][i]}</span>
                  </div>
                  {i < 2 && <span className="text-white font-bold text-xl mb-4">:</span>}
                </div>
              ))}
            </div>
          </div>

          <Link to="/sale" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-all">
            All Deals <IconArrowRight size={14} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flash.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <ProductCard product={p} onQuickView={x => { setQv(x); open(); }} />
            </motion.div>
          ))}
        </div>
      </div>
      <QuickViewModal product={qv} opened={opened} onClose={close} />
    </section>
  );
}
