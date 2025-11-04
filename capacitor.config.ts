import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.monolitproduct.eyehearu',
  appName: 'EyeHearU',
  webDir: 'dist',
  server: {
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
    infoPlist: {
      NSMicrophoneUsageDescription: 'A mikrofonhoz való hozzáférésre van szükség a beszéd valós idejű szöveggé alakításához.',
      NSSpeechRecognitionUsageDescription: 'A beszédfelismerés engedélyezése szükséges a magyar nyelvű átiratok készítéséhez.',
    },
  },
};

export default config;
