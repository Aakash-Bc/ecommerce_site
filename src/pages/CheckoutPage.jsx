import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Select, Radio, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCreditCard, IconBuildingBank, IconDeviceMobile, IconCash, IconCheck } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: IconCreditCard },
  { value: 'esewa', label: 'eSewa', icon: IconDeviceMobile },
  { value: 'khalti', label: 'Khalti', icon: IconDeviceMobile },
  { value: 'bank', label: 'Bank Transfer', icon: IconBuildingBank },
  { value: 'cod', label: 'Cash on Delivery', icon: IconCash },
];

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, total, dispatch } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [step, setStep] = useState(1);
  const [placing, setPlacing] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      address: '', city: '', state: '', zip: '',
    },
    validate: {
      firstName: v => v.length < 2 ? 'Required' : null,
      lastName: v => v.length < 2 ? 'Required' : null,
      email: v => !/^\S+@\S+$/.test(v) ? 'Invalid email' : null,
      phone: v => v.length < 10 ? 'Invalid phone' : null,
      address: v => v.length < 5 ? 'Required' : null,
      city: v => v.length < 2 ? 'Required' : null,
    },
  });

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-confirmation', { state: { orderId: `TRZ${Date.now()}`, total, paymentMethod } });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {['Shipping', 'Payment', 'Review'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-[#e94560] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? <IconCheck size={14} /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === i + 1 ? 'text-[#1a1a2e]' : 'text-gray-400'}`}>{s}</span>
            {i < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg text-gray-900 mb-5">Shipping Address</h2>
              <form onSubmit={form.onSubmit(() => setStep(2))}>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label="First Name" placeholder="Rahul" required {...form.getInputProps('firstName')} />
                  <TextInput label="Last Name" placeholder="Thapa" required {...form.getInputProps('lastName')} />
                  <TextInput label="Email" placeholder="rahul@email.com" type="email" required className="col-span-2" {...form.getInputProps('email')} />
                  <TextInput label="Phone" placeholder="+977-9800000000" required className="col-span-2" {...form.getInputProps('phone')} />
                  <TextInput label="Address" placeholder="Thamel, Kathmandu" required className="col-span-2" {...form.getInputProps('address')} />
                  <TextInput label="City" placeholder="Kathmandu" required {...form.getInputProps('city')} />
                  <TextInput label="ZIP Code" placeholder="44600" {...form.getInputProps('zip')} />
                </div>
                <button type="submit" className="mt-6 w-full bg-[#1a1a2e] text-white py-3 rounded-xl font-semibold hover:bg-[#e94560] transition-colors">
                  Continue to Payment →
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg text-gray-900 mb-5">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map(pm => (
                  <label
                    key={pm.value}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === pm.value ? 'border-[#e94560] bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.value}
                      checked={paymentMethod === pm.value}
                      onChange={() => setPaymentMethod(pm.value)}
                      className="accent-[#e94560]"
                    />
                    <pm.icon size={20} className={paymentMethod === pm.value ? 'text-[#e94560]' : 'text-gray-500'} />
                    <span className="font-medium text-sm text-gray-800">{pm.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <div className="mt-5 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <TextInput label="Card Number" placeholder="1234 5678 9012 3456" className="col-span-2" />
                  <TextInput label="Expiry" placeholder="MM/YY" />
                  <TextInput label="CVV" placeholder="123" />
                  <TextInput label="Name on Card" placeholder="Rahul Thapa" className="col-span-2" />
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-[#1a1a2e] text-white py-3 rounded-xl font-semibold hover:bg-[#e94560] transition-colors">
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg text-gray-900 mb-5">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.title} className="w-14 h-16 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#1a1a2e]">{formatPrice(item.finalPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50">
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="flex-1 bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition-colors disabled:opacity-70"
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-fit sticky top-24">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal ({items.length} items)</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-base text-[#1a1a2e]"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
