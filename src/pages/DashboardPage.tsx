import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          {t('dashboard.title')}
        </h1>
        <p className="text-text-secondary mb-6">
          {t('dashboard.loggedInAs')} {user ? user.email : 'Loading user...'}
        </p>
        
        <div className="flex flex-col gap-4 w-full mt-6">
          <Link
            to="/transcribe"
            className="w-full px-6 py-3 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Go to transcription page"
          >
            {t('dashboard.startTranscriptionButton')}
          </Link>
          
          <Link
            to="/history"
            className="w-full px-6 py-3 bg-background/20 backdrop-blur-sm border-2 border-accent-primary text-accent-primary font-semibold rounded-lg hover:bg-accent-primary/10 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="View saved transcripts"
          >
            {t('dashboard.viewSavedTranscriptsButton')}
          </Link>
        </div>
        
        <Link
          to="/settings"
          className="w-full px-6 py-3 my-4 bg-background/20 backdrop-blur-sm border-2 border-text-secondary text-text-primary font-semibold rounded-lg hover:bg-text-secondary/10 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Go to settings page"
        >
          {t('dashboard.settingsButton')}
        </Link>
        
        <button
          onClick={signOut}
          className="w-full px-4 py-2 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/80 transition-colors"
        >
          {t('dashboard.signOutButton')}
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
