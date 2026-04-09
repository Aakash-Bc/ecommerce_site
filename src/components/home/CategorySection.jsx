import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/products';

export default function CategorySection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Shop by Category</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1a1a2e]">Find Your Style</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link to={`/category/${cat.id}`} className="group block relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-3xl font-bold text-white mb-1">{cat.label}</h3>
                <p className="text-gray-300 text-sm mb-4">{cat.subcategories.slice(0, 3).join(' · ')}</p>
                <span className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-[#e94560] group-hover:text-white transition-all">
                  Shop Now →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
