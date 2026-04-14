import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconShoppingBag, IconTrash, IconMinus, IconPlus, IconArrowLeft } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { items, dispatch, totalPrice } = useCart();
  const navigate = useNavigate();

  const up = (id, q) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: q + 1 } });
  const down = (id, q) => q > 1 && dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: q - 1 } });
  const rem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  if (items.length === 0) {
    return (
      <div className="section-spacing text-center">
        <div className="mb-10 text-gray-200 flex justify-center"><IconShoppingBag size={80} stroke={1} /></div>
        <h1 className="text-4xl font-black uppercase mb-4">Cart is empty</h1>
        <p className="text-gray-500 mb-10 text-sm uppercase tracking-widest">Start adding some items to your curation.</p>
        <Link to="/" className="btn-clean btn-black px-12 uppercase text-xs">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1536px] mx-auto px-6 md:px-10 py-24">
      <div className="mb-10 border-b border-light pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tight">Curation</h1>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-1">[{items.length} items currently in bag]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* List Section */}
        <div className="lg:col-span-8 space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex gap-5 p-4 bg-white border border-light"
              >
                {/* Image */}
                <div className="w-24 aspect-[3/4] bg-soft border border-light shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.2]" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="text-sm font-black uppercase tracking-tight text-black">{item.title}</h3>
                      <div className="flex gap-4 mt-1.5">
                        <span className="text-[9px] uppercase font-bold text-gray-400">SZ: {item.selectedSize}</span>
                        <span className="text-[9px] uppercase font-bold text-gray-400">CL: {item.selectedColor}</span>
                      </div>
                    </div>
                    <span className="font-black text-sm text-black">{formatPrice(item.finalPrice * item.quantity)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                    <div className="flex items-center border border-light p-0.5 rounded-sm">
                      <button onClick={() => down(item.id, item.quantity)} className="w-7 h-7 flex items-center justify-center hover:bg-soft transition-colors text-xs"><IconMinus size={12} /></button>
                      <span className="w-8 text-center text-[11px] font-black">{item.quantity}</span>
                      <button onClick={() => up(item.id, item.quantity)} className="w-7 h-7 flex items-center justify-center hover:bg-soft transition-colors text-xs"><IconPlus size={12} /></button>
                    </div>
                    <button onClick={() => rem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><IconTrash size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Link to="/" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black mt-6">
            <IconArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-8 bg-black text-white rounded-sm sticky top-32">
            <h2 className="text-sm font-black uppercase tracking-widest mb-8 pb-3 border-b border-white/10">Basket Summary</h2>
            
            <div className="space-y-4 mb-10 text-[11px] font-black uppercase tracking-widest">
              <div className="flex justify-between text-gray-500">
                <span>Net Total</span>
                <span className="text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Courier</span>
                <span className="text-white">Rs. 0 (Free)</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-gray-500 mb-0.5">Final Amount</p>
                  <p className="text-2xl font-black text-white tracking-tighter">{formatPrice(totalPrice)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all rounded-sm active:scale-95 duration-200"
            >
              Order Now
            </button>
          </div>
          
          <div className="p-5 mt-6 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black mb-1.5">Delivery Promise</p>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Fulfilled from our central studio archive in Kathmandu. Priority shipping enabled.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
