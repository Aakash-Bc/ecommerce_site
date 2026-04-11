import { useState } from 'react';
import { IconHeart, IconHeartFilled, IconShoppingBag, IconPlus } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const liked = isWishlisted(product.id);

  const addCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedSize: product.sizes[0], selectedColor: product.colors[0], quantity: 1 } });
  };
  const wish = (e) => { e.stopPropagation(); toggle(product); };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer flex flex-col fade-up"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-soft mb-4 border border-light">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy" 
        />
        
        {/* Wishlist Button - Minimal */}
        <button onClick={wish} className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          {liked ? <IconHeartFilled size={18} className="text-red-500" /> : <IconHeart size={18} />}
        </button>

        {/* Quick Add - Minimal Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/60 backdrop-blur-md">
          <button 
            onClick={addCart}
            className="w-full bg-black text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
          <span className="text-xs font-bold text-black">{formatPrice(product.finalPrice)}</span>
        </div>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:underline">
          {product.title}
        </h3>
      </div>
    </div>
  );
}
