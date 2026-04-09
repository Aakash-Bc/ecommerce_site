import { useState } from 'react';
import { Modal, Badge, Rating, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconHeart, IconHeartFilled, IconStar, IconTruck, IconShield, IconRefresh } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function QuickViewModal({ product, opened, onClose }) {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedSize, selectedColor, quantity: qty } });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      radius="lg"
      padding="xl"
      title={null}
      centered
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-50">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{product.brand}</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1 leading-tight">{product.title}</h2>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} color={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#1a1a2e]">{formatPrice(product.finalPrice)}</span>
            <span className="text-base text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">-{product.discountPercentage}%</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1.5 text-sm border rounded-lg transition-all ${
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
            <p className="text-sm font-semibold text-gray-700 mb-2">Color: <span className="font-normal text-gray-500">{selectedColor}</span></p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  title={c}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === c ? 'border-[#1a1a2e] scale-110' : 'border-white shadow-sm'}`}
                  style={{ backgroundColor: colorToHex(c) }}
                />
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-700">Qty:</p>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600">-</button>
              <span className="px-4 py-2 text-sm font-semibold border-x border-gray-200">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-gray-50 text-gray-600">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#1a1a2e] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#e94560] transition-colors"
            >
              <IconShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              onClick={() => toggle(product)}
              className={`p-3 rounded-xl border-2 transition-all ${wishlisted ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
            >
              {wishlisted ? <IconHeartFilled size={20} className="text-red-500" /> : <IconHeart size={20} className="text-gray-500" />}
            </button>
          </div>

          <button
            onClick={() => { onClose(); navigate(`/product/${product.id}`); }}
            className="text-sm text-[#e94560] font-semibold hover:underline text-center"
          >
            View Full Details →
          </button>

          {/* Trust badges */}
          <div className="flex gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <IconTruck size={14} className="text-green-500" />
              Free shipping above Rs. 2000
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <IconRefresh size={14} className="text-blue-500" />
              Easy returns
            </div>
          </div>
        </div>
      </div>
    </Modal>
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

function colorToHex(colorName) {
  const key = colorName.toLowerCase().split('/')[0].split(' ')[0];
  return colorMap[key] || '#e5e7eb';
}
