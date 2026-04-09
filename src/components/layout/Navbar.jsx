import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Menu, Avatar, Badge as MantineBadge, TextInput, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch, IconShoppingCart, IconHeart, IconUser, IconMenu2,
  IconX, IconChevronDown, IconLogout, IconLayoutDashboard, IconPackage,
} from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Men', path: '/category/men' },
  { label: 'Women', path: '/category/women' },
  { label: 'Kids', path: '/category/kids' },
  { label: 'Sale', path: '/sale' },
  { label: 'New Arrivals', path: '/new-arrivals' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, { open: openMobile, close: closeMobile }] = useDisclosure(false);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { closeMobile(); }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
        {/* Top bar */}
        <div className="bg-[#1a1a2e] text-white text-xs py-2 text-center">
          <span>🎉 Free shipping on orders above Rs. 2000 | Use code <strong>DASHAIN20</strong> for 20% off</span>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-[#e94560] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-heading text-xl font-bold text-[#1a1a2e]">Trendz</span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-[#e94560] ${
                    location.pathname === link.path ? 'text-[#e94560]' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <TextInput
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    size="sm"
                    radius="xl"
                    autoFocus
                    rightSection={
                      <button type="button" onClick={() => setSearchOpen(false)}>
                        <IconX size={14} className="text-gray-400" />
                      </button>
                    }
                    className="w-48 md:w-64"
                  />
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <IconSearch size={20} className="text-gray-700" />
                </button>
              )}

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <IconHeart size={20} className="text-gray-700" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <IconShoppingCart size={20} className="text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <Menu shadow="md" width={180} position="bottom-end">
                  <Menu.Target>
                    <button className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                      <Avatar size="sm" radius="xl" color="red" name={user?.name}>
                        {user?.name?.[0]?.toUpperCase()}
                      </Avatar>
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>{user?.name}</Menu.Label>
                    <Menu.Item leftSection={<IconUser size={14} />} component={Link} to="/profile">Profile</Menu.Item>
                    <Menu.Item leftSection={<IconPackage size={14} />} component={Link} to="/orders">Orders</Menu.Item>
                    {user?.role === 'admin' && (
                      <Menu.Item leftSection={<IconLayoutDashboard size={14} />} component={Link} to="/admin">Admin</Menu.Item>
                    )}
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={logout}>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#e94560] transition-colors">
                  <IconUser size={20} />
                  Login
                </Link>
              )}

              {/* Mobile menu */}
              <button onClick={openMobile} className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
                <IconMenu2 size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer opened={mobileOpen} onClose={closeMobile} title={
        <Link to="/" className="font-heading text-xl font-bold text-[#1a1a2e]">Trendz Fashion</Link>
      } position="left" size="xs">
        <div className="flex flex-col gap-1 mt-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#e94560] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-4 pt-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                  <IconUser size={16} /> Profile
                </Link>
                <Link to="/orders" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                  <IconPackage size={16} /> Orders
                </Link>
                <button onClick={logout} className="w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2">
                  <IconLogout size={16} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-3 text-sm font-medium text-[#e94560] hover:bg-red-50 rounded-lg flex items-center gap-2">
                <IconUser size={16} /> Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </Drawer>

      {/* Spacer */}
      <div className="h-[calc(40px+64px)]" />
    </>
  );
}
