import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const banners = [
  {
    title: "Summer Sale",
    subtitle: "Up to 50% off on summer essentials",
    cta: "Shop Now",
    link: "/sale",
    bg: "from-orange-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh styles just dropped this week",
    cta: "Explore",
    link: "/new-arrivals",
    bg: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

export default function OfferBanners() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {banners.map((banner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to={banner.link} className="group relative block rounded-2xl overflow-hidden h-48 sm:h-56">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg} opacity-75`} />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">{banner.title}</h3>
                <p className="text-white/90 text-sm mb-4">{banner.subtitle}</p>
                <span className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-bold px-5 py-2 rounded-full w-fit group-hover:bg-[#1a1a2e] group-hover:text-white transition-all">
                  {banner.cta} →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
