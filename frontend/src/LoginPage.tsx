import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Eye, EyeOff, Sparkles, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'customer' | 'staff') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'staff'>('customer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      // Demo credentials
      if (role === 'staff' && (username !== 'staff' || password !== 'staff123')) {
        setError('Invalid staff credentials. Try: staff / staff123');
        return;
      }
      onLogin(role);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-secondary/10 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.04, 0.12, 0.04],
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 4 + i * 1.2, delay: i * 0.7 }}
            className="absolute rounded-full bg-brand-primary"
            style={{
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/60 p-10"
        >

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-3xl flex items-center justify-center shadow-lg shadow-brand-primary/30 mb-4"
            >
              <ChefHat size={36} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-slate-800">Annadatabot</h1>
            <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-semibold mt-1">Smart Dining Experience</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
            {(['customer', 'staff'] as const).map((r) => (
              <button
                key={r}
                id={`role-${r}`}
                onClick={() => { setRole(r); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  role === r
                    ? 'bg-white text-brand-primary shadow-md'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r === 'customer' ? '🍽️ Customer' : '👨‍🍳 Staff'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="relative">
              <label htmlFor="login-username" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={role === 'customer' ? 'Enter your name' : 'staff'}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 rounded-2xl text-slate-800 font-semibold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={role === 'customer' ? 'Any password' : 'staff123'}
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 rounded-2xl text-slate-800 font-semibold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-2xl"
              >
                {error}
              </motion.p>
            )}

            {/* Hint for customer */}
            {role === 'customer' && (
              <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-brand-accent" />
                Customers can log in with any credentials
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              id="login-submit"
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ChefHat size={20} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-300 mt-8 font-medium">
            © 2026 Annadatabot · Smart Dining
          </p>
        </motion.div>
      </div>
    </div>
  );
}
