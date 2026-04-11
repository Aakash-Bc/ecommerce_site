import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboard from './pages/AdminDashboard';
import SalePage from './pages/SalePage';
import NewArrivalsPage from './pages/NewArrivalsPage';

const mantineTheme = {
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  headings: { fontFamily: "'Playfair Display', Georgia, serif" },
  primaryColor: 'rose',
  colors: {
    rose: ['#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337'],
  },
  defaultRadius: 'md',
  components: {
    Button: { defaultProps: { radius: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
    PasswordInput: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md' } },
  },
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages (no main layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Main layout pages */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/category/:category" element={<MainLayout><CategoryPage /></MainLayout>} />
      <Route path="/category/:category/:subcategory" element={<MainLayout><CategoryPage /></MainLayout>} />
      <Route path="/product/:id" element={<MainLayout><ProductDetailPage /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
      <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
      <Route path="/order-confirmation" element={<MainLayout><OrderConfirmationPage /></MainLayout>} />
      <Route path="/wishlist" element={<MainLayout><WishlistPage /></MainLayout>} />
      <Route path="/search" element={<MainLayout><SearchPage /></MainLayout>} />
      <Route path="/sale" element={<MainLayout><SalePage /></MainLayout>} />
      <Route path="/new-arrivals" element={<MainLayout><NewArrivalsPage /></MainLayout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <MantineProvider theme={mantineTheme}>
      <Notifications position="top-right" />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
