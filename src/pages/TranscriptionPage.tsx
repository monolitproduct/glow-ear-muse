import React from 'react';
import { useAuth } from '../hooks/useAuth';

const TranscriptionPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <p className="text-sm">
          User: <span className="font-semibold">{user?.email}</span>
        </p>
        <button
          onClick={signOut}
          className="text-sm text-accent-primary hover:underline"
          aria-label="Sign out"
        >
          Sign Out
        </button>
      </header>

      {/* Transcription Display Area */}
      <main className="flex-grow flex items-center justify-center">
        <p className="text-text-secondary text-lg text-center px-4">
          Press the button to start transcribing...
        </p>
      </main>

      {/* Action Button Area */}
      <footer className="flex justify-center items-center py-4">
        <button
          className="w-20 h-20 bg-accent-primary rounded-full text-white font-bold text-lg shadow-lg hover:bg-accent-primary/90 transition-colors"
          aria-label="Start recording"
        >
          Start
        </button>
      </footer>
    </div>
  );
};

export default TranscriptionPage;
