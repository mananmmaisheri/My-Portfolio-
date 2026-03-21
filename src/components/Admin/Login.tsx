import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Shield } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-3xl max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-imperial/20 text-imperial rounded-full flex items-center justify-center mx-auto mb-8">
          <Shield size={40} />
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-4">Admin Access</h1>
        <p className="text-white/50 mb-12">Please sign in with your authorized Google account to manage the portfolio.</p>
        
        {error && <p className="text-imperial text-sm mb-6">{error}</p>}
        
        <button
          onClick={handleLogin}
          className="w-full py-4 bg-white text-night font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <LogIn size={20} />
          SIGN IN WITH GOOGLE
        </button>
      </motion.div>
    </div>
  );
}
