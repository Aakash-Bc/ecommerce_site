import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Menu, Avatar } from '@mantine/core';
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
  { label: 'Sale',         path: '/sale' },
  { label: 'New Arrivals', path: '/new-arrivals' },
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
      <header className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled ? 'bg-white shadow-sm py-1.5' : 'bg-white py-3'
      } border-light`}>
        <div className="container-clean flex items-center justify-between">
          
          {/* Logo - Minimalist text */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter uppercase">Aakash</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map(({ label, path }) => (
              <Link 
                key={path} 
                to={path} 
                className={`nav-item ${isActive(path) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-soft border-none rounded-sm px-4 py-1.5 text-xs w-32 focus:w-48 transition-all outline-none"
              />
              <IconSearch size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>

            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="hover:text-gray-400 transition-colors relative">
                <IconHeart size={20} stroke={1.5} />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />}
              </Link>
              
              <Link to="/cart" className="hover:text-gray-400 transition-colors relative">
                <IconShoppingBag size={20} stroke={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <button className="cursor-pointer">
                      <Avatar size={28} radius="xl" src={user?.avatar} />
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
                <Link to="/login" className="text-xs font-bold uppercase tracking-widest hover:underline">
                  Login
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
          <div className="flex justify-between items-center p-6 border-b border-light">
            <span className="text-xl font-black uppercase">Menu</span>
            <button onClick={close}><IconX size={24} /></button>
          </div>
          <nav className="flex-1 p-8 flex flex-col gap-6">
            {NAV.map(({ label, path }) => (
              <Link key={path} to={path} className="text-3xl font-bold uppercase tracking-tight">
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-8 border-t border-light mt-auto">
            {isAuthenticated ? (
              <button onClick={logout} className="text-red-600 font-bold uppercase tracking-widest">Sign Out</button>
            ) : (
              <Link to="/login" className="text-2xl font-black uppercase">Sign In</Link>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
