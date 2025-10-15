import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-surface-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">Sign In to EyeHearU</h2>
        
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-text-secondary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-2">
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
