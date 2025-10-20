import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const HAPTICS_STORAGE_KEY = 'eyeHearU_hapticsEnabled';

  // Initialize state from localStorage or default to true
  const [hapticsEnabled, setHapticsEnabled] = useState(() => {
    const savedValue = localStorage.getItem(HAPTICS_STORAGE_KEY);
    return savedValue !== null ? JSON.parse(savedValue) : true;
  });

  // Effect to save changes to localStorage
  useEffect(() => {
    localStorage.setItem(HAPTICS_STORAGE_KEY, JSON.stringify(hapticsEnabled));
  }, [hapticsEnabled]);

  // Handler function for the toggle
  const handleHapticsChange = (checked: boolean) => {
    setHapticsEnabled(checked);
  };

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
        {/* Haptic Feedback Section */}
        <div className="bg-background-secondary p-4 rounded-lg flex items-center justify-between">
          <div>
            <Label htmlFor="haptics-toggle" className="text-text-primary font-medium mb-1 cursor-pointer">
              Haptic Feedback
            </Label>
            <p className="text-text-secondary text-sm">
              Enable vibrations for key actions.
            </p>
          </div>
          <Switch
            id="haptics-toggle"
            checked={hapticsEnabled}
            onCheckedChange={handleHapticsChange}
            aria-label="Toggle haptic feedback"
          />
        </div>

        {/* Placeholder for other potential settings */}

      </main>
    </div>
  );
};

export default SettingsPage;
