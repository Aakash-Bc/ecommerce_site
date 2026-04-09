import { Link } from 'react-router-dom';
import { TextInput, ActionIcon } from '@mantine/core';
import { useState } from 'react';
import {
  IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube,
  IconMail, IconPhone, IconMapPin, IconArrowRight,
} from '@tabler/icons-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      {/* Newsletter */}
      <div className="bg-[#e94560] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Stay in the Loop</h3>
              <p className="text-red-100 text-sm mt-1">Subscribe for exclusive deals, new arrivals & style tips</p>
            </div>
            {subscribed ? (
              <div className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">
                🎉 Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  required
                  radius="xl"
                  size="md"
                  className="w-full md:w-72"
                  styles={{ input: { border: 'none' } }}
                />
                <button type="submit" className="bg-[#1a1a2e] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-black transition-colors flex items-center gap-2 whitespace-nowrap">
                  Subscribe <IconArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e94560] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-heading text-xl font-bold text-white">Trendz Fashion</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Nepal's premium online fashion destination. Discover the latest trends in Men, Women & Kids clothing.
            </p>
            <div className="flex gap-3">
              {[IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#e94560] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Men', to: '/category/men' },
                { label: 'Women', to: '/category/women' },
                { label: 'Kids', to: '/category/kids' },
                { label: 'Sale', to: '/sale' },
                { label: 'New Arrivals', to: '/new-arrivals' },
                { label: 'Wishlist', to: '/wishlist' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors hover:pl-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'FAQs', to: '/faq' },
                { label: 'Size Guide', to: '/size-guide' },
                { label: 'Return Policy', to: '/returns' },
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors hover:pl-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <IconMapPin size={16} className="text-[#e94560] mt-0.5 flex-shrink-0" />
                Thamel, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <IconPhone size={16} className="text-[#e94560] flex-shrink-0" />
                +977-9800000000
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <IconMail size={16} className="text-[#e94560] flex-shrink-0" />
                support@trendzfashion.com
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3">We accept</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'MC', 'eSewa', 'Khalti', 'COD'].map(m => (
                  <span key={m} className="bg-white/10 text-xs text-gray-300 px-2.5 py-1 rounded font-medium">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 Trendz Fashion. All rights reserved.</p>
          <p className="text-xs text-gray-500">Made with ❤️ in Nepal</p>
        </div>
      </div>
    </footer>
  );
}
