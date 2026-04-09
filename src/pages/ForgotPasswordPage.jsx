import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconMail, IconCheck } from '@tabler/icons-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-[#e94560]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {sent ? <IconCheck size={32} className="text-green-500" /> : <IconMail size={32} className="text-[#e94560]" />}
          </div>

          {sent ? (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
              <p className="text-gray-500 text-sm mb-6">We've sent a password reset link to <strong>{email}</strong></p>
              <Link to="/login" className="inline-block bg-[#e94560] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#c73652] transition-colors">
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Forgot password?</h1>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link</p>
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <TextInput
                  label="Email address"
                  placeholder="you@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition-colors disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <Link to="/login" className="block text-sm text-gray-500 hover:text-[#e94560] mt-4">
                ← Back to Login
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
