import { motion } from 'framer-motion';
import { IconStar, IconQuote, IconCircleCheck } from '@tabler/icons-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  return (
    <section className="py-32 bg-soft">
      <div className="max-w-[1700px] mx-auto px-8 md:px-24 lg:px-32">
        
        {/* Simplified Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-6 block">Archive Feed</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Community Feedback</h2>
        </div>

        {/* 3-Column Grid of Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              whileHover={{ y: -8 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-10 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 rounded-lg flex flex-col"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <IconStar 
                      key={j} 
                      size={12} 
                      fill={j < t.rating ? "#000" : "transparent"} 
                      color={j < t.rating ? "#000" : "#eee"} 
                    />
                  ))}
                </div>
                <IconQuote size={20} className="text-gray-200" />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                "{t.comment}"
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-gray-50 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover grayscale" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-black uppercase tracking-widest">{t.name}</p>
                    <IconCircleCheck size={10} className="text-blue-500" />
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Call */}
        <div className="mt-24 text-center">
          <button className="bg-black text-white px-14 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-900 hover:scale-105 transition-all duration-500 shadow-xl">
            View All Reviews
          </button>
        </div>

      </div>
    </section>
  );
}
