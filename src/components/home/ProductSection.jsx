import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';

export default function ProductSection({ title, subtitle, products, viewAllLink }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-light pb-8">
          <div>
            {subtitle && (
              <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-2 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">
              {title}
            </h2>
          </div>
          
          {viewAllLink && (
            <Link to={viewAllLink} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
              View All
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
