import React from 'react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          Saved Transcripts
        </h1>
        <Link
          to="/dashboard"
          className="text-sm text-accent-primary hover:underline"
          aria-label="Back to dashboard"
        >
          Dashboard
        </Link>
      </header>

      {/* Content Area */}
      <main className="flex-grow flex items-center justify-center">
        <p className="text-text-secondary">
          Your saved transcripts will appear here.
        </p>
      </main>
    </div>
  );
};

export default HistoryPage;
