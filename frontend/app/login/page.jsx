"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const mainColor = '#DFD0D0';
  const lightColor = '#FAF1EF';

  const containerStyle = {
    backgroundColor: lightColor,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle = {
    backgroundColor: mainColor,
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle} className="w-full max-w-md p-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            style={{
              backgroundColor: isLogin ? lightColor : 'transparent',
              color: isLogin ? '#2D2D2D' : '#5A5A5A',
            }}
            className="flex-1 py-2 rounded-lg transition-all font-medium"
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              backgroundColor: !isLogin ? lightColor : 'transparent',
              color: !isLogin ? '#2D2D2D' : '#5A5A5A',
            }}
            className="flex-1 py-2 rounded-lg transition-all font-medium"
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {isLogin ? (
              <form className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: lightColor }}
                  className="w-full py-2 rounded-lg font-medium hover:brightness-95 transition-all"
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: lightColor }}
                  className="w-full py-2 rounded-lg font-medium hover:brightness-95 transition-all"
                >
                  Sign Up
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="font-medium hover:underline"
                style={{ color: 'white' }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="font-medium hover:underline"
                style={{ color: 'white' }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}