import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.josephm.tictactoe',
  appName: 'fun-ai-tic-tac-toe',
  webDir: 'dist',
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-6695870861385987~1528432953',
      isTesting: true,
      initializeForTesting: true,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
      maxAdContentRating: 'G',
    }
  },
};

export default config;
