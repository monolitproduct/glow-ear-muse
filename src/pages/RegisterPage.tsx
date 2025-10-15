import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg-dark-start to-bg-dark-end">
      <div className="max-w-md w-full mx-4">
        <div className="bg-surface-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Create Your Account</h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Email</label>
              <input 
                type="email"
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Password</label>
              <input 
                type="password"
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Confirm Password</label>
              <input 
                type="password"
                className="bg-bg-dark-start border border-border-contrast rounded-md p-2 text-text-primary focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-md transition-colors mt-6">
              Create Account
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
          </div>
        </div>
      </div>
    </div>
  );
}
