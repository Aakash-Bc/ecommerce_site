import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

const B = [
  { title: 'Summer Sale', sub: 'Up to 50% off on summer essentials', cta: 'Shop Now', link: '/sale', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', color: 'from-rose-600/80' },
  { title: 'New Arrivals', sub: 'Fresh styles just dropped this week', cta: 'Explore', link: '/new-arrivals', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', color: 'from-gray-900/80' },
];

export default function OfferBanners() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {B.map((b, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Link to={b.link} className="group relative block rounded-2xl overflow-hidden h-64">
              <img src={b.img} alt={b.title} className="img-zoom w-full h-full object-cover" loading="lazy" />
              <div className={`absolute inset-0 bg-gradient-to-r ${b.color} to-transparent`} />
              <div className="absolute inset-0 flex flex-col justify-center px-10 py-8">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">{b.sub}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl bg-white text-gray-900 w-fit group-hover:bg-rose-600 group-hover:text-white transition-all">
                  {b.cta} <IconArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
