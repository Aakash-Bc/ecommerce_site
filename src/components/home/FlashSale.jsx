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
  const flash = products.filter(p => p.discountPercentage >= 30).slice(0, 4);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-end justify-between gap-10 mb-16 border-b border-white/10 pb-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-4 italic">Limited Selection</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">The Archive Sale</h2>
          </div>

          {/* Countdown */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-4 md:gap-10">
              {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-white tracking-tighter tabular-nums">{v}</span>
                  <span className="text-[8px] mt-1 font-black uppercase tracking-[0.3em] text-gray-500">{['HR','MN','SC'][i]}</span>
                </div>
              ))}
            </div>
            <Link to="/sale" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white/20 pb-2 hover:border-white transition-all">
              Discover All
            </Link>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flash.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="invert" // Make ProductCards look good on black
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
