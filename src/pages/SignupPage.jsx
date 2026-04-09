import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandGoogle, IconBrandFacebook } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', agree: false },
    validate: {
      name: v => v.length < 2 ? 'Name is required' : null,
      email: v => !/^\S+@\S+$/.test(v) ? 'Invalid email' : null,
      password: v => v.length < 6 ? 'Minimum 6 characters' : null,
      confirmPassword: (v, values) => v !== values.password ? 'Passwords do not match' : null,
      agree: v => !v ? 'You must agree to terms' : null,
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      signup({ name: values.name, email: values.email, role: 'user' });
      navigate('/');
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
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-[#e94560] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-heading text-2xl font-bold text-[#1a1a2e]">Trendz</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 mt-4">Create account</h1>
            <p className="text-gray-500 text-sm mt-1">Join thousands of fashion lovers</p>
          </div>

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
            <span className="text-xs text-gray-400">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
            <TextInput label="Full Name" placeholder="Rahul Thapa" required {...form.getInputProps('name')} />
            <TextInput label="Email address" placeholder="you@example.com" type="email" required {...form.getInputProps('email')} />
            <PasswordInput label="Password" placeholder="Min. 6 characters" required {...form.getInputProps('password')} />
            <PasswordInput label="Confirm Password" placeholder="Repeat password" required {...form.getInputProps('confirmPassword')} />
            <Checkbox
              label={<span className="text-sm">I agree to the <Link to="/terms" className="text-[#e94560] hover:underline">Terms</Link> and <Link to="/privacy" className="text-[#e94560] hover:underline">Privacy Policy</Link></span>}
              size="sm"
              {...form.getInputProps('agree', { type: 'checkbox' })}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition-colors disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e94560] font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
