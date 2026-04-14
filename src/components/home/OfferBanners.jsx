import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

const B = [
  { title: 'Summer Sale', sub: 'Up to 50% off on summer essentials', cta: 'Shop Now', link: '/sale', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', color: 'from-rose-600/80' },
  { title: 'New Arrivals', sub: 'Fresh styles just dropped this week', cta: 'Explore', link: '/new-arrivals', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', color: 'from-gray-900/80' },
];

export default function OfferBanners() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {B.map((b, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.98 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={b.link} className="group relative block overflow-hidden h-[400px] bg-gray-100">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{b.title}</h3>
                  <p className="text-sm text-gray-300 mb-8 max-w-xs leading-relaxed uppercase tracking-wide font-medium">{b.sub}</p>
                  <span className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/20 pb-2 group-hover:border-white transition-all">
                    {b.cta} <IconArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
