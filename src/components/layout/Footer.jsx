import { Link } from 'react-router-dom';
import { 
  IconBrandInstagram, IconBrandFacebook, IconBrandTwitter, 
  IconBrandYoutube, IconArrowRight
} from '@tabler/icons-react';

const LINKS = [
  { 
    title: 'Archive', 
    items: [
      { label: 'Men', to: '/category/men' },
      { label: 'Women', to: '/category/women' },
      { label: 'Kids', to: '/category/kids' },
      { label: 'Sale', to: '/sale' },
    ]
  },
  { 
    title: 'Support', 
    items: [
      { label: 'Contact', to: '/contact' },
      { label: 'Shipping', to: '/shipping' },
      { label: 'Returns', to: '/returns' },
      { label: 'Track Order', to: '/status' },
    ]
  },
  { 
    title: 'Legal', 
    items: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-light pt-32 pb-16">
      <div className="container-clean">
        
        {/* Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-black uppercase tracking-tighter">Aakash</span>
              <div className="w-2 h-2 bg-black rounded-full" />
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 text-sm">
              Modern silhouettes designed for the contemporary wardrobe. Dedicated to quality, transparency, and sustainable luxury in Nepal.
            </p>
            <div className="flex gap-6">
              {[IconBrandInstagram, IconBrandFacebook, IconBrandTwitter, IconBrandYoutube].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Icon size={20} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto min-w-[350px]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-6">Stay Connected</h4>
            <form onSubmit={e => e.preventDefault()} className="relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-soft border-none px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:bg-gray-100 transition-all rounded-sm placeholder:text-gray-400"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-gray-500">
                <IconArrowRight size={20} />
              </button>
            </form>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-4">Receive notifications for new drops and archives.</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32 pt-16 border-t border-light">
          {LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-8 px-1">{col.title}</h4>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-xs font-bold text-gray-400 hover:text-black hover:bg-soft px-1 py-1 transition-all inline-block uppercase tracking-tight">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Final Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-light">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
            © 2026 Aakash Fashion Studio.
          </p>
          <div className="flex gap-8 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
          </div>
          <div className="hidden lg:flex gap-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Kathmandu, NP</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">GMT +5:45</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
