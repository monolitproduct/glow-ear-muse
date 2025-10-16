import React from 'react';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Welcome to EyeHearU
        </h1>
        <p className="text-text-secondary mb-6">
          Logged in as: {user ? user.email : 'Loading user...'}
        </p>
        <button
          onClick={signOut}
          className="w-full px-4 py-2 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/80 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
