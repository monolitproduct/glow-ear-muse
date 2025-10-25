import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useTranslation();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateEmail(email)) {
      setError(t('login.invalidEmailFormat'));
      return;
    }
    
    setLoading(true);
    const { error: authError } = await signIn(email, password);
    setLoading(false);
    
    if (authError) {
      setError(authError.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-surface-800/30 backdrop-blur-md border border-border-contrast/50 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">{t('login.title')}</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
              {t('login.emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder={t('login.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-text-secondary mb-2">
              {t('login.passwordLabel')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder={t('login.passwordPlaceholder')}
            />
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('login.loggingIn') : t('login.signIn')}
          </button>

          <p className="mt-6 text-center text-sm text-text-secondary">
            {t('login.noAccount')}{' '}
            <Link 
              to="/register" 
              className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
            >
              {t('login.signUp')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
