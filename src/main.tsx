import './i18n'; // Initialize i18next FIRST - before React
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

// Initialize RevenueCat SDK for iOS
const initializeRevenueCat = async () => {
  // Get API key from environment variable
  // For development, you can temporarily use a placeholder
  const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY || 'appl_placeholder';
  
  // Only initialize on native iOS platform
  if (Capacitor.getPlatform() === 'ios') {
    try {
      // Configure RevenueCat SDK
      await Purchases.configure({ 
        apiKey: REVENUECAT_API_KEY,
        appUserID: undefined // v8+ requirement: undefined for anonymous users
      });
      
      console.log('✅ RevenueCat SDK initialized successfully');
      
      // Set up customer info update listener
      Purchases.addCustomerInfoUpdateListener((customerInfo) => {
        console.log('📱 RevenueCat CustomerInfo updated:', customerInfo);
        // Future: Update user entitlements in app state
      });
      
    } catch (error) {
      console.error('❌ Error initializing RevenueCat SDK:', error);
      // Non-critical: App continues to work without purchase functionality
    }
  } else {
    console.log('ℹ️ RevenueCat skipped - not running on native iOS platform');
  }
};

// Initialize RevenueCat when app starts
initializeRevenueCat().catch(error => {
  console.error('❌ RevenueCat initialization failed:', error);
});

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);
