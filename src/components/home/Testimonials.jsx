import { motion } from 'framer-motion';
import { IconStar, IconQuote } from '@tabler/icons-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Customer Reviews</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a2e]">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">4.8 out of 5 · 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 relative"
            >
              <IconQuote size={32} className="text-[#e94560]/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <IconStar key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location} · {t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
