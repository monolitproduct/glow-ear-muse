import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    const { error: authError } = await signUp(email, password);
    setLoading(false);
    
    if (authError) {
      setError(authError.message);
    } else {
      setSuccessMsg('Account created! Check your email to confirm.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg-dark-start to-bg-dark-end">
      <div className="max-w-md w-full mx-4">
        <div className="bg-surface-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Create Your Account</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Confirm Password</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p role="alert" aria-live="polite" className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {successMsg && (
              <p role="alert" aria-live="polite" className="text-green-500 text-sm text-center">
                {successMsg}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-md transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="mt-6 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
