import { useState } from 'react';
import { Badge, Rating, ActionIcon, Tooltip } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconShoppingCart, IconEye, IconStar } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onQuickView }) {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
        quantity: 1,
      },
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div
      className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="img-zoom-wrapper relative aspect-[3/4] bg-gray-50 overflow-hidden">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discountPercentage}%
          </span>
          {product.offerTag && (
            <span className="bg-[#1a1a2e] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {product.offerTag}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <Tooltip label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} position="left">
            <ActionIcon
              variant="white"
              size="lg"
              radius="xl"
              className="shadow-md"
              onClick={handleWishlist}
            >
              {wishlisted
                ? <IconHeartFilled size={18} className="text-red-500" />
                : <IconHeart size={18} className="text-gray-600" />
              }
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Quick view" position="left">
            <ActionIcon variant="white" size="lg" radius="xl" className="shadow-md" onClick={handleQuickView}>
              <IconEye size={18} className="text-gray-600" />
            </ActionIcon>
          </Tooltip>
        </div>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-[#1a1a2e] text-white hover:bg-[#e94560]'
            }`}
          >
            <IconShoppingCart size={16} />
            {addedToCart ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 leading-snug">{product.title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <IconStar
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                fill="currentColor"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.sizes.slice(0, 4).map(size => (
            <span key={size} className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors cursor-pointer">
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 mb-2">
          {product.colors.slice(0, 4).map(color => (
            <Tooltip key={color} label={color} withArrow>
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-pointer ring-1 ring-gray-200"
                style={{ backgroundColor: colorToHex(color) }}
              />
            </Tooltip>
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#1a1a2e]">{formatPrice(product.finalPrice)}</span>
          <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
        </div>
      </div>
    </motion.div>
  );
}

const colorMap = {
  white: '#ffffff', black: '#1a1a1a', grey: '#9ca3af', gray: '#9ca3af',
  navy: '#1e3a5f', blue: '#3b82f6', red: '#ef4444', green: '#22c55e',
  pink: '#ec4899', yellow: '#eab308', orange: '#f97316', purple: '#a855f7',
  brown: '#92400e', beige: '#d4b896', khaki: '#c3b091', olive: '#6b7c3a',
  maroon: '#800000', teal: '#0d9488', mint: '#a7f3d0', cream: '#fffdd0',
  camel: '#c19a6b', rust: '#b7410e', ivory: '#fffff0', gold: '#ffd700',
  tan: '#d2b48c', nude: '#e8c9a0', blush: '#f4a7b9', sage: '#8fbc8f',
  burgundy: '#800020', magenta: '#ff00ff', mustard: '#ffdb58',
};

function colorToHex(colorName) {
  const key = colorName.toLowerCase().split('/')[0].split(' ')[0];
  return colorMap[key] || '#e5e7eb';
}
