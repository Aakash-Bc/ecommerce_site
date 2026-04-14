import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Menu, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch, IconShoppingBag, IconHeart, IconUser,
  IconMenu2, IconX, IconLogout, IconPackage
} from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { label: 'Men',          path: '/category/men' },
  { label: 'Women',        path: '/category/women' },
  { label: 'Kids',         path: '/category/kids' },
  { label: 'Store',        path: '/new-arrivals' },
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
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query.trim())}`); setQuery(''); }
  };

  const isActive = (p) => pathname === p || pathname.startsWith(p + '/');

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-md py-4' : 'bg-white py-8'
      } border-b border-gray-50`}>
        <div className="max-w-[1536px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Main Navigation - Left */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV.map(({ label, path }) => (
              <Link 
                key={path} 
                to={path} 
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                  isActive(path) ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full transition-transform duration-300 ${
                  isActive(path) ? 'scale-100' : 'scale-0 group-hover:scale-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="text-2xl font-black uppercase tracking-[-0.05em] leading-none transition-transform group-hover:scale-105 duration-500">Studio</span>
            <span className="text-[7px] font-black uppercase tracking-[0.6em] text-gray-300 mt-1">Edition ©2026</span>
          </Link>

          {/* Actions - Right */}
          <div className="flex items-center gap-8">
            <form onSubmit={handleSearch} className="hidden md:flex relative group items-center">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="SEARCH"
                className="bg-transparent border-none text-[10px] font-black tracking-widest w-24 focus:w-40 transition-all outline-none text-right pr-6 placeholder:text-gray-300 placeholder:italic"
              />
              <IconSearch size={14} className="absolute right-0 text-gray-400 group-hover:text-black transition-colors" />
            </form>

            <div className="flex items-center gap-6">
              <Link to="/wishlist" className="relative group">
                <IconHeart size={20} stroke={1.5} className="group-hover:fill-black transition-all duration-300" />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-black rounded-full" />}
              </Link>
              
              <Link to="/cart" className="relative group">
                <IconShoppingBag size={20} stroke={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <button className="cursor-pointer">
                      <Avatar size={24} radius="xl" src={user?.avatar} />
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUser size={14} />} component={Link} to="/profile">Profile</Menu.Item>
                    <Menu.Item leftSection={<IconPackage size={14} />} component={Link} to="/orders">Orders</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={logout}>Sign Out</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:underline transition-all">
                  Sign In
                </Link>
              )}

              <button onClick={open} className="lg:hidden">
                <IconMenu2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Drawer */}
      <Drawer opened={drawerOpen} onClose={close} position="right" size="100%" withCloseButton={false} padding={0}>
        <div className="flex flex-col h-full bg-white">
          <div className="flex justify-between items-center p-8 border-b border-gray-50">
            <span className="text-xl font-black uppercase tracking-tighter">Menu</span>
            <button onClick={close} className="p-2"><IconX size={24} /></button>
          </div>
          <nav className="flex-1 p-10 flex flex-col gap-8">
            {NAV.map(({ label, path }) => (
              <Link key={path} to={path} className="text-4xl font-black uppercase tracking-tighter hover:pl-4 transition-all duration-500">
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-10 border-t border-gray-50 mt-auto bg-gray-50/50">
            {isAuthenticated ? (
              <button onClick={logout} className="text-red-600 text-sm font-black uppercase tracking-widest">Sign Out</button>
            ) : (
              <Link to="/login" className="text-3xl font-black uppercase tracking-tighter">Sign In</Link>
            )}
            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 italic">© Studio Edition 2026</p>
          </div>
        </div>
      </Drawer>
    </>
  );
}
