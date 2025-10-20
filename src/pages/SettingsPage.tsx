import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-6 border-b border-text-secondary/20 pb-4">
        <h1 className="text-xl font-bold text-text-primary">
          Settings
        </h1>
        <Link
          to="/dashboard"
          className="text-sm text-accent-primary hover:underline"
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </Link>
      </header>

      {/* Settings Area */}
      <main className="flex-grow space-y-6">
        {/* Placeholder for Haptics Toggle */}
        <div className="bg-background-secondary p-4 rounded-lg">
          <p className="text-text-primary font-medium mb-2">Haptic Feedback</p>
          <p className="text-text-secondary text-sm">
            Enable or disable vibrations for actions like start, stop, and save.
          </p>
          {/* Toggle component will be added here later */}
          <p className="text-text-secondary text-xs mt-4 italic">(Toggle coming soon)</p>
        </div>

        {/* Placeholder for other potential settings */}

      </main>
    </div>
  );
};

export default SettingsPage;
