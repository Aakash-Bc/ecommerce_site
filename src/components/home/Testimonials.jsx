import { motion } from 'framer-motion';
import { IconStar, IconQuote, IconCircleCheck } from '@tabler/icons-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white mb-32">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        
        {/* Section Header & Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-gray-50 pb-12">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/5 text-[9px] font-black uppercase tracking-widest text-black mb-4">
              <IconCircleCheck size={10} className="text-black" />
              Verified Curation
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight leading-none mb-4">
              Community Voices
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Direct feedback from our global community of collectors and enthusiasts.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <span className="text-3xl font-black tracking-tighter">4.8</span>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} size={14} fill="#000" color="#000" />
                ))}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">2,400+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-white p-7 rounded-2xl border border-gray-100 hover:border-black transition-all duration-300 flex flex-col relative"
            >
              <div className="flex gap-0.5 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <IconStar key={j} size={12} fill="#000" color="#000" />
                ))}
              </div>

              <p className="text-sm font-medium leading-relaxed mb-8 text-gray-600 group-hover:text-black transition-colors flex-1">
                "{t.comment}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="relative shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-900">{t.name}</p>
                    <IconCircleCheck size={10} className="text-gray-400" />
                  </div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{t.location}</p>
                </div>
              </div>

              {/* Product Mention */}
              <div className="absolute top-7 right-7">
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-300 border border-gray-100 px-2 py-0.5 rounded-full">{t.product}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Call */}
        <div className="mt-16 text-center">
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
            View All Community Stories
          </button>
        </div>

      </div>
    </section>
  );
}
