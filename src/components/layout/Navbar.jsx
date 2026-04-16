import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Menu, Avatar, UnstyledButton, Group, Text, ActionIcon, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch, IconShoppingBag, IconHeart, IconUser,
  IconMenu2, IconX, IconLogout, IconPackage, IconArrowRight
} from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { label: 'Men',          path: '/category/men' },
  { label: 'Women',        path: '/category/women' },
  { label: 'Kids',         path: '/category/kids' },
  { label: 'Collections',  path: '/new-arrivals' },
  { label: 'Archive',      path: '/sale' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [drawerOpen, { open, close }] = useDisclosure(false);

  const { itemCount } = useCart();
  const { items: wishlist } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { close(); }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const isActive = (p) => pathname === p || pathname.startsWith(p + '/');

  return (
    <>
      <div className="bg-black text-[9px] text-white py-2.5 px-6 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span>Complimentary worldwide shipping on all orders over $250</span>
          <span className="mx-12">•</span>
          <span>New Studio Arrivals: Spring/Summer 2026 Out Now</span>
          <span className="mx-12">•</span>
          <span>Complimentary worldwide shipping on all orders over $250</span>
          <span className="mx-12">•</span>
          <span>New Studio Arrivals: Spring/Summer 2026 Out Now</span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' : 'bg-white py-6 md:py-8'
      }`}>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-between">
          
          {/* Main Navigation - Left */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map(({ label, path }) => (
              <Link 
                key={path} 
                to={path} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative py-2 group ${
                  isActive(path) ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-500 rounded-full ${
                  isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <Link to="/" className="flex flex-col items-center group perspective">
            <div className="relative transform-gpu transition-all duration-700 group-hover:scale-110">
              <span className="text-3xl font-black uppercase tracking-[-0.08em] leading-none">Studio</span>
              <div className="absolute -right-3 -top-1 w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.8em] text-gray-400 mt-2 transition-colors group-hover:text-black">Edition 2026</span>
          </Link>

          {/* Actions - Right */}
          <div className="flex items-center gap-8">
            <form onSubmit={handleSearch} className="hidden md:flex relative group items-center">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="SEARCH"
                className="bg-transparent border-b border-transparent hover:border-gray-200 focus:border-black text-[10px] font-black tracking-[0.2em] w-28 focus:w-48 transition-all duration-700 outline-none text-right pr-8 placeholder:text-gray-300 transition-all"
              />
              <ActionIcon variant="subtle" color="dark" size="sm" className="absolute right-0 pointer-events-none">
                <IconSearch size={16} stroke={2} />
              </ActionIcon>
            </form>

            <div className="flex items-center gap-7">
              <Link to="/wishlist" className="relative group p-1">
                <IconHeart size={21} stroke={1.5} className={`transition-all duration-500 ${wishlist.length > 0 ? 'fill-black' : 'group-hover:text-gray-500 group-hover:scale-110'}`} />
                {wishlist.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full border-2 border-white" />}
              </Link>
              
              <Link to="/cart" className="relative group p-1">
                <IconShoppingBag size={21} stroke={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Menu shadow="xl" width={220} position="bottom-end" transitionProps={{ transition: 'pop-top-right', duration: 300 }}>
                  <Menu.Target>
                    <UnstyledButton className="p-1 hover:scale-110 transition-transform">
                      <Avatar 
                        size={28} 
                        radius="xl" 
                        src={user?.avatar} 
                        className="ring-2 ring-transparent hover:ring-black transition-all"
                      />
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown className="border-none shadow-2xl p-2 rounded-xl">
                    <div className="p-3 border-b border-gray-50 mb-1">
                      <Text size="xs" fw={900} tt="uppercase" tracking="0.1em" c="dimmed">Account</Text>
                      <Text size="sm" fw={700}>{user?.name || 'Studio Member'}</Text>
                    </div>
                    <Menu.Item leftSection={<IconUser size={16} stroke={1.5} />} component={Link} to="/profile" className="rounded-lg font-bold py-2.5">Profile</Menu.Item>
                    <Menu.Item leftSection={<IconPackage size={16} stroke={1.5} />} component={Link} to="/orders" className="rounded-lg font-bold py-2.5">Orders</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} color="red" onClick={logout} className="rounded-lg font-bold py-2.5">Sign Out</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5 hover:pb-1 transition-all">
                  Sign In
                </Link>
              )}

              <button onClick={open} className="lg:hidden p-1 hover:scale-110 transition-transform border border-gray-100 rounded-lg">
                <IconMenu2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Drawer */}
      <Drawer 
        opened={drawerOpen} 
        onClose={close} 
        position="right" 
        size="100%" 
        withCloseButton={false} 
        padding={0}
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex justify-between items-center p-8 md:p-12 border-b border-gray-50">
            <span className="text-lg font-black uppercase tracking-widest text-gray-300">Navigation</span>
            <button onClick={close} className="p-4 hover:rotate-90 transition-transform duration-500 border border-gray-100 rounded-full">
              <IconX size={24} />
            </button>
          </div>
          <nav className="flex-1 p-10 md:p-20 flex flex-col gap-6">
            {NAV.map(({ label, path }) => (
              <Link 
                key={path} 
                to={path} 
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter hover:pl-6 transition-all duration-700 flex items-center justify-between group"
              >
                <span>{label}</span>
                <IconArrowRight size={40} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700" />
              </Link>
            ))}
          </nav>
          <div className="p-10 md:p-20 bg-gray-50 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              {isAuthenticated ? (
                <button onClick={logout} className="text-red-600 text-lg font-black uppercase tracking-widest hover:pl-2 transition-all">Sign Out</button>
              ) : (
                <Link to="/login" className="text-4xl font-black uppercase tracking-tighter hover:pl-2 transition-all">Sign In</Link>
              )}
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">© Studio Edition Archive 2026</p>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Link to="#" className="hover:text-black transition-colors">Instagram</Link>
              <Link to="#" className="hover:text-black transition-colors">Twitter</Link>
              <Link to="#" className="hover:text-black transition-colors">TikTok</Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
