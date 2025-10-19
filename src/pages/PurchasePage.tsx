import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Purchases, PurchasesOffering } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const PurchasePage = () => {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOfferings = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Only fetch offerings on native iOS
        if (Capacitor.getPlatform() === 'ios') {
          const { current } = await Purchases.getOfferings();
          if (current && current.availablePackages.length > 0) {
            setOffering(current);
          } else {
            setError('No purchase options currently available.');
          }
        } else {
          setError('Purchases only available on the native iOS app.');
          console.log('Skipping offering fetch - not on native iOS.');
        }
      } catch (e) {
        console.error('Error fetching offerings:', e);
        setError('Could not load purchase options.');
      }
      setIsLoading(false);
    };

    fetchOfferings();
  }, []);

  const handlePurchase = async () => {
    // Ensure we are on iOS and have an offering
    if (Capacitor.getPlatform() !== 'ios' || !offering || !offering.availablePackages[0]) {
      setError('Purchase cannot be completed.');
      return;
    }
    
    setIsPurchasing(true);
    setError('');
    try {
      // Assuming the first package is our one-time purchase
      const packageToPurchase = offering.availablePackages[0];
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: packageToPurchase });
      
      console.log('Purchase successful:', { customerInfo, productIdentifier });
      // We will add logic here later to check entitlements and redirect
      alert('Purchase Successful! Thank you for your support.');

    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Purchase error:', e);
        setError(e.message || 'An error occurred during purchase.');
      } else {
        console.log('User cancelled purchase.');
      }
    }
    setIsPurchasing(false);
  };

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
            {isLoading ? '...' : (offering ? offering.availablePackages[0]?.product.priceString : '$?.??')}
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

        {error && <p className="text-destructive text-sm text-center mb-4">{error}</p>}

        <button
          onClick={handlePurchase}
          disabled={isLoading || isPurchasing || !offering || Capacitor.getPlatform() !== 'ios'}
          className="w-full max-w-sm px-6 py-3 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Purchase unlimited transcription"
        >
          {isPurchasing ? 'Processing...' : (isLoading ? 'Loading...' : 'Purchase Now')}
        </button>

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
