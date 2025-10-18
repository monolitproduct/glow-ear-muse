import React from 'react';
import { Link } from 'react-router-dom';

const PurchasePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-6">
        <Link
          to="/dashboard"
          className="text-sm text-accent-primary hover:underline focus:outline-none focus:ring-2 focus:ring-accent-primary rounded"
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </Link>
      </header>

      {/* Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Unlock Unlimited Transcription
        </h1>
        <p className="text-text-secondary max-w-md mb-8 leading-relaxed">
          Support EyeHearU and gain permanent access to unlimited live transcription with a single one-time purchase. Your support helps us improve accessibility for everyone.
        </p>

        <div className="bg-background/50 border-2 border-accent-primary/30 p-8 rounded-lg shadow-lg w-full max-w-sm mb-8">
          <p className="text-lg font-semibold text-text-primary mb-2">
            Lifetime Access
          </p>
          <p className="text-4xl font-bold text-accent-primary mb-2">
            $9.99
          </p>
          <p className="text-sm text-text-secondary mb-4">
            One-time payment • No subscription
          </p>
          <ul className="text-left text-sm text-text-secondary space-y-2">
            <li>✓ Unlimited live transcription</li>
            <li>✓ 6 languages supported</li>
            <li>✓ Save & review history</li>
            <li>✓ Offline-first privacy</li>
          </ul>
        </div>

        <button
          disabled
          className="w-full max-w-sm px-6 py-3 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Purchase unlimited transcription for $9.99"
        >
          Purchase Now
        </button>
        <p className="text-xs text-text-secondary mt-2">
          (Payment processing will be enabled soon)
        </p>

        <Link
          to="/dashboard"
          className="mt-8 text-sm text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary rounded"
          aria-label="Return to dashboard without purchasing"
        >
          Maybe Later
        </Link>
      </main>
    </div>
  );
};

export default PurchasePage;
