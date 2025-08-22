import { AdMob, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents } from '@capacitor-community/admob';

// Always use test ads for development/testing
const useTestAds = true;

const bannerAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/6300978111' // ✅ Google Test Banner
  : 'ca-app-pub-6695870861385987/2126913341'; // 🎯 My Real Banner Ad ID

const interstitialAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/1033173712' // ✅ Google Test Interstitial
  : 'ca-app-pub-6695870861385987/8598637138'; // 🎯 My Real Interstitial Ad ID

export async function initAdMob() {
  try {
    await AdMob.initialize({
      initializeForTesting: useTestAds,
      testingDevices: ['ABCDEF123456'],
    });
    console.log('AdMob initialized successfully');
    await loadInterstitialAd();
  } catch (error) {
    console.error('AdMob initialization failed:', error);
  }
}

export async function loadInterstitialAd() {
  try {
    await AdMob.prepareInterstitial({
      adId: interstitialAdId,
      isTesting: useTestAds,
    });
    console.log('Interstitial ad loaded successfully');
  } catch (error) {
    console.error('Failed to load interstitial ad:', error);
  }
}

export async function showBannerAd() {
  try {
    await AdMob.showBanner({
      adId: bannerAdId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: useTestAds,
    });
    console.log('Banner ad shown');
  } catch (error) {
    console.error('Failed to show banner ad:', error);
  }
}

export async function showInterstitialAd() {
  try {
    await AdMob.showInterstitial();
    console.log('Interstitial ad shown');
    // Load next ad for future use
    await loadInterstitialAd();
  } catch (error) {
    console.error('Ad not available yet - Failed to show interstitial ad:', error);
  }
}