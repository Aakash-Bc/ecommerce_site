import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconCheck, IconPackage, IconTruck, IconHome } from '@tabler/icons-react';
import { formatPrice } from '../utils/helpers';

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || 'TRZ000000';
  const total = state?.total || 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <IconCheck size={48} className="text-green-500" strokeWidth={3} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="font-heading text-3xl font-bold text-[#1a1a2e] mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">Thank you for shopping with Trendz Fashion</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="font-mono font-bold text-[#1a1a2e]">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Total Amount</span>
            <span className="font-bold text-[#e94560] text-lg">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Estimated Delivery</span>
            <span className="font-semibold text-gray-800">3-5 Business Days</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex justify-center gap-8 mb-10">
          {[
            { icon: IconCheck, label: 'Order Placed', done: true },
            { icon: IconPackage, label: 'Processing', done: false },
            { icon: IconTruck, label: 'Shipped', done: false },
            { icon: IconHome, label: 'Delivered', done: false },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                <s.icon size={18} />
              </div>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="px-6 py-3 border-2 border-[#1a1a2e] text-[#1a1a2e] rounded-full font-semibold text-sm hover:bg-[#1a1a2e] hover:text-white transition-all">
            Track Order
          </Link>
          <Link to="/" className="px-6 py-3 bg-[#e94560] text-white rounded-full font-semibold text-sm hover:bg-[#c73652] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
