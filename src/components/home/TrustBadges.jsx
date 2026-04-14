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
    <section className="bg-white border-b border-gray-50 py-10">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {B.map((b, i) => (
            <div key={i} className="flex flex-col gap-3 group">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-50/50 grayscale group-hover:grayscale-0 transition-all">
                <b.icon size={18} stroke={1.5} className="text-gray-400 group-hover:text-black transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-black mb-1">{b.title}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
