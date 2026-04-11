import { motion } from 'framer-motion';
import { IconStar } from '@tabler/icons-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3">Reviews</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <IconStar key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}</div>
            <span className="text-sm text-gray-500 font-medium">4.8 · 2,400+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex flex-col gap-4">
              <div className="flex gap-0.5">{[...Array(t.rating)].map((_, j) => <IconStar key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}</div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.location}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600">Verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
