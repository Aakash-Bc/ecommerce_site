import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconHeartOff } from '@tabler/icons-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ui/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-8">
        My Wishlist <span className="text-gray-400 text-lg font-normal">({items.length})</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <IconHeartOff size={64} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love to your wishlist</p>
          <Link to="/" className="inline-block bg-[#e94560] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c73652] transition-colors">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
