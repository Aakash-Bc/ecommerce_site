import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

export default function CategorySection() {
  return (
    <section className="py-24 bg-soft">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        <div className="mb-8 border-b border-light pb-8">
          <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-2 block">Curation</span>
          <h2 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">Departments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`} 
              className="relative aspect-[3/4] overflow-hidden group border border-light"
            >
              <img 
                src={cat.image} 
                alt={cat.label} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 text-center">
                  {cat.label}
                </h3>
                <span className="bg-white text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Discover
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
