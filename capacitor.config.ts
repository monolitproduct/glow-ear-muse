import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.monolitproduct.eyehearu',
  appName: 'EyeHearU',
  webDir: 'dist',
  server: {
    url: 'https://04722d6e-1487-4e1c-9ebf-c9752739dabc.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
    infoPlist: {
      NSMicrophoneUsageDescription: 'EyeHearU uses the microphone for live speech-to-text transcription to assist users with hearing accessibility.',
      NSSpeechRecognitionUsageDescription: 'EyeHearU uses speech recognition to convert spoken audio into text on your device.',
    },
  },
};

export default config;
