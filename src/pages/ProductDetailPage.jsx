import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tabs, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { IconShoppingCart, IconHeart, IconHeartFilled, IconStar, IconTruck, IconShield, IconRefresh, IconShare } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="text-center py-32">
      <p className="text-5xl mb-4">😕</p>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Product not found</h2>
      <Link to="/" className="text-[#e94560] font-semibold hover:underline">Back to Home</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedSize, selectedColor, quantity: qty } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedSize, selectedColor, quantity: qty } });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#e94560]">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#e94560] capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 shadow-sm"
        >
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{product.brand}</p>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-tight">{product.title}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={16} fill={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} color={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            {product.offerTag && (
              <Badge color="red" variant="light" size="sm">{product.offerTag}</Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 py-3 border-y border-gray-100">
            <span className="text-3xl font-bold text-[#1a1a2e]">{formatPrice(product.finalPrice)}</span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="bg-red-100 text-red-600 font-bold text-sm px-3 py-1 rounded-full">
              {product.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-800">Select Size</p>
              <button className="text-xs text-[#e94560] hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 text-sm border-2 rounded-xl transition-all font-medium ${
                    selectedSize === s
                      ? 'border-[#1a1a2e] bg-[#1a1a2e] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Color: <span className="font-normal text-gray-500">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  title={c}
                  className={`w-8 h-8 rounded-full border-4 transition-all ${
                    selectedColor === c ? 'border-[#1a1a2e] scale-110' : 'border-white shadow-md'
                  }`}
                  style={{ backgroundColor: colorToHex(c) }}
                />
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-800">Quantity:</p>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-gray-50 text-gray-600 font-bold text-lg">-</button>
              <span className="px-5 py-2.5 text-sm font-bold border-x-2 border-gray-200 min-w-[50px] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-2.5 hover:bg-gray-50 text-gray-600 font-bold text-lg">+</button>
            </div>
            <span className="text-xs text-gray-400">{product.stock} in stock</span>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                added ? 'bg-green-500 text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#e94560]'
              }`}
            >
              <IconShoppingCart size={18} />
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-[#e94560] text-white hover:bg-[#c73652] transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggle(product)}
              className={`p-3.5 rounded-xl border-2 transition-all ${wishlisted ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
            >
              {wishlisted ? <IconHeartFilled size={20} className="text-red-500" /> : <IconHeart size={20} className="text-gray-500" />}
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            {[
              { icon: IconTruck, text: "Free Shipping", sub: "Above Rs. 2000" },
              { icon: IconRefresh, text: "Easy Returns", sub: "30 days" },
              { icon: IconShield, text: "Secure Pay", sub: "100% safe" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <item.icon size={18} className="text-[#e94560]" />
                <p className="text-xs font-semibold text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

const colorMap = {
  white: '#ffffff', black: '#1a1a1a', grey: '#9ca3af', navy: '#1e3a5f',
  blue: '#3b82f6', red: '#ef4444', green: '#22c55e', pink: '#ec4899',
  yellow: '#eab308', orange: '#f97316', purple: '#a855f7', brown: '#92400e',
  beige: '#d4b896', khaki: '#c3b091', olive: '#6b7c3a', maroon: '#800000',
  teal: '#0d9488', mint: '#a7f3d0', cream: '#fffdd0', camel: '#c19a6b',
  rust: '#b7410e', ivory: '#fffff0', gold: '#ffd700', tan: '#d2b48c',
  nude: '#e8c9a0', blush: '#f4a7b9', sage: '#8fbc8f', burgundy: '#800020',
  magenta: '#ff00ff', mustard: '#ffdb58',
};
function colorToHex(c) { return colorMap[c.toLowerCase().split('/')[0].split(' ')[0]] || '#e5e7eb'; }
