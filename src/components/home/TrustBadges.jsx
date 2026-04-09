import { IconTruck, IconShield, IconRefresh, IconHeadset, IconCreditCard } from '@tabler/icons-react';

const badges = [
  { icon: IconTruck, title: "Free Shipping", desc: "On orders above Rs. 2000" },
  { icon: IconShield, title: "Secure Payment", desc: "100% secure transactions" },
  { icon: IconRefresh, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: IconHeadset, title: "24/7 Support", desc: "Dedicated customer service" },
  { icon: IconCreditCard, title: "EMI Available", desc: "0% EMI on select cards" },
];

export default function TrustBadges() {
  return (
    <section className="py-10 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-[#1a1a2e]/5 rounded-full flex items-center justify-center group-hover:bg-[#e94560] transition-colors">
                <b.icon size={22} className="text-[#1a1a2e] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                <p className="text-xs text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
