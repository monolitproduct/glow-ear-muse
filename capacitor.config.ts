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
      NSMicrophoneUsageDescription: 'EyeHearU uses the microphone for live speech-to-text transcription to assist users with hearing accessibility.',
      NSSpeechRecognitionUsageDescription: 'EyeHearU uses speech recognition to convert spoken audio into text on your device.',
    },
  },
};

export default config;
