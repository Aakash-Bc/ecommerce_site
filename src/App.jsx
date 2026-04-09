import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

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
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Playfair Display, serif' },
  primaryColor: 'red',
  colors: {
    red: ['#fff5f5','#ffe3e3','#ffc9c9','#ffa8a8','#ff8787','#ff6b6b','#fa5252','#f03e3e','#e94560','#c73652'],
  },
  defaultRadius: 'md',
  components: {
    Button: { defaultProps: { radius: 'xl' } },
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
