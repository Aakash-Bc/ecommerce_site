import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, Notification } from '@mantine/core';
import { IconTrash, IconShoppingBag, IconTag, IconCheck, IconX } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { offers } from '../data/products';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { items, dispatch, subtotal, discount, shipping, total, coupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const navigate = useNavigate();

  const applyCoupon = () => {
    const found = offers.find(o => o.id === couponCode.toUpperCase());
    if (!found) { setCouponMsg({ type: 'error', text: 'Invalid coupon code' }); return; }
    if (subtotal < found.minOrder) { setCouponMsg({ type: 'error', text: `Minimum order Rs. ${found.minOrder} required` }); return; }
    dispatch({ type: 'APPLY_COUPON', payload: found });
    setCouponMsg({ type: 'success', text: `Coupon applied! ${found.description}` });
  };

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-3">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
      <Link to="/" className="inline-block bg-[#e94560] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c73652] transition-colors">
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-8">
        Shopping Cart <span className="text-gray-400 text-lg font-normal">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-28 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.brand}</p>
                      <Link to={`/product/${item.id}`} className="text-sm font-semibold text-gray-900 hover:text-[#e94560] line-clamp-2">{item.title}</Link>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-gray-500">Size: <strong>{item.selectedSize}</strong></span>
                        <span className="text-xs text-gray-500">Color: <strong>{item.selectedColor}</strong></span>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { ...item, quantity: item.quantity - 1 } })}
                        className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 text-sm font-bold"
                      >-</button>
                      <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-200">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { ...item, quantity: item.quantity + 1 } })}
                        className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 text-sm font-bold"
                      >+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1a1a2e]">{formatPrice(item.finalPrice * item.quantity)}</p>
                      <p className="text-xs text-gray-400">{formatPrice(item.finalPrice)} each</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <IconTag size={16} className="text-[#e94560]" /> Apply Coupon
            </h3>
            <div className="flex gap-2">
              <TextInput
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                size="sm"
                radius="md"
                className="flex-1"
                disabled={!!coupon}
              />
              {coupon ? (
                <button onClick={() => { dispatch({ type: 'REMOVE_COUPON' }); setCouponMsg(null); setCouponCode(''); }} className="px-3 py-2 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100">
                  <IconX size={14} />
                </button>
              ) : (
                <button onClick={applyCoupon} className="px-4 py-2 bg-[#1a1a2e] text-white rounded-lg text-sm font-semibold hover:bg-[#e94560] transition-colors">
                  Apply
                </button>
              )}
            </div>
            {couponMsg && (
              <p className={`text-xs mt-2 ${couponMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {couponMsg.text}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-1">
              {offers.slice(0, 3).map(o => (
                <button key={o.id} onClick={() => setCouponCode(o.id)} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono hover:bg-gray-200">
                  {o.id}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Add {formatPrice(2000 - subtotal)} more for free shipping</p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-[#1a1a2e]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-5 bg-[#e94560] text-white py-3.5 rounded-xl font-semibold hover:bg-[#c73652] transition-colors flex items-center justify-center gap-2"
            >
              <IconShoppingBag size={18} />
              Proceed to Checkout
            </button>
            <Link to="/" className="block text-center text-sm text-gray-500 hover:text-[#e94560] mt-3">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
