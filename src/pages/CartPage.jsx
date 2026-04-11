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
    <div className="container-clean section-spacing">
      <div className="mb-16 border-b border-light pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tight">Shopping Cart</h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.4em] mt-2">[{items.length} items to review]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* List Section */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-light"
              >
                {/* Image */}
                <div className="w-full sm:w-32 aspect-[3/4] bg-soft border border-light shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.3]" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-black">{item.title}</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Size: {item.selectedSize}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Color: {item.selectedColor}</span>
                      </div>
                    </div>
                    <span className="font-bold text-black">{formatPrice(item.finalPrice * item.quantity)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-light">
                    <div className="flex items-center border border-light p-1 rounded-sm">
                      <button onClick={() => down(item.id, item.quantity)} className="w-8 h-8 flex items-center justify-center hover:bg-soft transition-colors"><IconMinus size={14} /></button>
                      <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => up(item.id, item.quantity)} className="w-8 h-8 flex items-center justify-center hover:bg-soft transition-colors"><IconPlus size={14} /></button>
                    </div>
                    <button onClick={() => rem(item.id)} className="text-gray-400 hover:text-black transition-colors"><IconTrash size={18} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mt-8">
            <IconArrowLeft size={16} /> Update my selection
          </Link>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-10 bg-black text-white rounded-sm sticky top-32">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-10 pb-4 border-b border-white/10">Summary</h2>
            
            <div className="space-y-6 mb-12 text-sm font-medium uppercase tracking-widest">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span className="text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping Fee</span>
                <span className="text-green-400 font-bold">Free</span>
              </div>
              <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Total to pay</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{formatPrice(totalPrice)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-white text-black py-5 font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all rounded-sm"
            >
              Continue to Payment
            </button>
          </div>
          
          <div className="p-6 bg-soft border border-light">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Delivery Policy</p>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">Most orders are fulfilled within 48 hours and shipped from our Kathmandu studio archive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
