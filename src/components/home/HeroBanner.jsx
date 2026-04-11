import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const SLIDES = [
  { id: 1, title: "Modern Essentials", sub: "Spring Collection 2026", link: "/category/women", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" },
  { id: 2, title: "Urban Structure", sub: "The Modern Men's Edit", link: "/category/men", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1600&q=80" },
  { id: 3, title: "Limited Release", sub: "Seasonal Flash Sale", link: "/sale", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80" },
];

export default function HeroBanner() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[cur];

  return (
    <div className="relative h-[70vh] overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div 
          key={s.id}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} 
          className="absolute inset-0"
        >
          <img src={s.img} alt="" className="w-full h-full object-cover brightness-[0.9]" />
          <div className="absolute inset-0 bg-black/5" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[10px] font-black uppercase tracking-[0.6em] text-black mb-6"
            >
              {s.sub}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black text-black tracking-tight mb-12 uppercase leading-none"
            >
              {s.title}
            </motion.h1>
            <motion.div 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
               className="flex gap-4"
            >
              <Link to={s.link} className="btn-clean btn-black px-12 uppercase text-xs">
                Shop Collection
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 inset-x-0 container-clean flex justify-center gap-3">
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCur(i)} 
            className={`h-1 transition-all ${i === cur ? 'w-12 bg-black' : 'w-4 bg-black/20'}`} 
          />
        ))}
      </div>
    </div>
  );
}