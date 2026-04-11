import { IconTruck, IconShield, IconRefresh, IconHeadset, IconCreditCard } from '@tabler/icons-react';
const B = [
  { icon: IconTruck,      title: 'Free Shipping',  desc: 'Orders above Rs. 2000' },
  { icon: IconShield,     title: 'Secure Payment', desc: '100% safe transactions' },
  { icon: IconRefresh,    title: 'Easy Returns',   desc: '30-day hassle-free' },
  { icon: IconHeadset,    title: '24/7 Support',   desc: 'Always here for you' },
  { icon: IconCreditCard, title: 'EMI Available',  desc: '0% on select cards' },
];
export default function TrustBadges() {
  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {B.map((b, i) => (
            <div key={i} className="flex items-center gap-4 py-2">
              <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <b.icon size={20} className="text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">{b.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
