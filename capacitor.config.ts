import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.josephm.tictactoe',
  appName: 'fun-ai-tic-tac-toe',
  webDir: 'dist',
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-6695870861385987~1528432953', // ✅ Your real App ID
      isTesting: true, // ✅ Set to false for production
      initializeForTesting: true, // ✅ Set to false for production
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
      maxAdContentRating: 'G', // ✅ Family-friendly content rating
    }
  },
};

export default config;
