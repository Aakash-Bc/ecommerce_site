import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandGoogle, IconBrandFacebook, IconEye, IconEyeOff } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: { email: '', password: '', remember: false },
    validate: {
      email: v => !/^\S+@\S+$/.test(v) ? 'Invalid email' : null,
      password: v => v.length < 6 ? 'Password must be at least 6 characters' : null,
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      if (values.email === 'admin@trendz.com' && values.password === 'admin123') {
        login({ name: 'Admin User', email: values.email, role: 'admin' });
        navigate('/admin');
      } else if (values.password.length >= 6) {
        login({ name: values.email.split('@')[0], email: values.email, role: 'user' });
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-[#e94560] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-heading text-2xl font-bold text-[#1a1a2e]">Trendz</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 mt-4">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <IconBrandGoogle size={18} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <IconBrandFacebook size={18} className="text-blue-600" /> Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
            <TextInput
              label="Email address"
              placeholder="you@example.com"
              type="email"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              required
              {...form.getInputProps('password')}
            />
            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" size="sm" {...form.getInputProps('remember', { type: 'checkbox' })} />
              <Link to="/forgot-password" className="text-sm text-[#e94560] hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition-colors disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#e94560] font-semibold hover:underline">Sign up</Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-4">
            Demo: admin@trendz.com / admin123
          </p>
        </motion.div>
      </div>
    </div>
  );
}
