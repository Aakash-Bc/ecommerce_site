import { Link } from 'react-router-dom';
import { 
  IconBrandInstagram, IconBrandFacebook, IconBrandTwitter, 
  IconArrowRight, IconMapPin, IconClock
} from '@tabler/icons-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-16 mt-32">
      <div className="max-w-[1536px] mx-auto px-6 md:px-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand / About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-black uppercase tracking-tighter">Studio</span>
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A contemporary fashion archive dedicated to minimalist design and sustainable garment construction. 
              Crafted in Kathmandu, delivered globally.
            </p>
            <div className="flex gap-5">
              {[IconBrandInstagram, IconBrandFacebook, IconBrandTwitter].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Icon size={20} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-6">Collections</h4>
            <ul className="space-y-4">
              <li><Link to="/category/men" className="text-sm text-gray-500 hover:text-black transition-colors">Men's Archive</Link></li>
              <li><Link to="/category/women" className="text-sm text-gray-500 hover:text-black transition-colors">Women's Collection</Link></li>
              <li><Link to="/new-arrivals" className="text-sm text-gray-500 hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-sm text-gray-500 hover:text-black transition-colors">Limited Sale</Link></li>
            </ul>
          </div>

          {/* Column 3: Client Service */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/shipping" className="text-sm text-gray-500 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-sm text-gray-500 hover:text-black transition-colors">Delivery FAQs</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-6">Join our newsletter to receive updates on new drops and events.</p>
            <form onSubmit={e => e.preventDefault()} className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-black transition-all outline-none rounded-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                <IconArrowRight size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* Info Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-gray-100">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <IconMapPin size={12} /> Kathmandu, NP
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <IconClock size={12} /> GMT +5:45
            </div>
          </div>

          <div className="flex justify-center gap-10 grayscale opacity-20 hover:opacity-100 transition-opacity duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3.5" alt="PayPal" />
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
              © {currentYear} Studio Edition. Built for the modern world.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
