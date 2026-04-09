import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

const slides = [
  {
    id: 1,
    title: "New Season\nCollection",
    subtitle: "Discover the latest trends in fashion",
    cta: "Shop Women",
    ctaLink: "/category/women",
    badge: "Summer 2026",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85",
    accent: "#e94560",
    align: "left",
  },
  {
    id: 2,
    title: "Men's Premium\nCollection",
    subtitle: "Elevate your style with our curated menswear",
    cta: "Shop Men",
    ctaLink: "/category/men",
    badge: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=85",
    accent: "#1a1a2e",
    align: "right",
  },
  {
    id: 3,
    title: "Dashain\nFestival Sale",
    subtitle: "Celebrate in style — up to 50% off on all categories",
    cta: "Shop Sale",
    ctaLink: "/sale",
    badge: "🎉 Festival Special",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=85",
    accent: "#f5a623",
    align: "left",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + slides.length) % slides.length); };
  const next = () => { setDirection(1); setCurrent(c => (c + 1) % slides.length); };

  const slide = slides[current];

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className={`absolute inset-0 ${slide.align === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-black/70 via-black/40 to-transparent`} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full ${slide.align === 'right' ? 'flex justify-end' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-lg"
              >
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                  style={{ backgroundColor: slide.accent, color: '#fff' }}
                >
                  {slide.badge}
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="text-gray-200 text-base sm:text-lg mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:gap-3"
                    style={{ backgroundColor: slide.accent, color: '#fff' }}
                  >
                    {slide.cta} <IconArrowRight size={16} />
                  </Link>
                  <Link
                    to="/sale"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all border border-white/30"
                  >
                    View Sale
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
        <IconArrowLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
        <IconArrowRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all rounded-full ${i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
