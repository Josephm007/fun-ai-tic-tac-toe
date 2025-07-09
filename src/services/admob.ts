
import { AdMob, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents } from '@capacitor-community/admob';

const useTestAds = import.meta.env.VITE_USE_TEST_ADS === "true";

const bannerAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/6300978111' // ✅ Google Test Banner
  : 'ca-app-pub-6695870861385987/2126913341'; // 🎯 My Real Banner Ad ID

const TEST_INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712';
const REAL_INTERSTITIAL_AD_ID = 'ca-app-pub-6695870861385987/8598637138';

export const INTERSTITIAL_AD_ID = useTestAds
  ? TEST_INTERSTITIAL_AD_ID
  : REAL_INTERSTITIAL_AD_ID;

const interstitialAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/1033173712' // ✅ Google Test Interstitial
  : 'ca-app-pub-6695870861385987/8598637138'; // 🎯 My Real Interstitial Ad ID

export async function initAdMob() {
  try {
    await AdMob.initialize({
      initializeForTesting: useTestAds,
      testingDevices: useTestAds ? ['ABCDEF123456'] : [],
    });
    console.log('AdMob initialized successfully');
    await preloadAd();
  } catch (error) {
    console.error('AdMob initialization failed:', error);
  }
}

export async function preloadAd() {
  try {
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
      isTesting: useTestAds,
    });
    console.log('Interstitial ad preloaded');
  } catch (error) {
    console.error('Failed to preload interstitial ad:', error);
  }
}

export async function initializeAdMob() {
  try {
    await AdMob.initialize({
      initializeForTesting: useTestAds,
      testingDevices: useTestAds ? ['ABCDEF123456'] : [],
    });
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('AdMob initialization failed:', error);
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
    // Preload next ad
    await preloadAd();
  } catch (error) {
    console.error('Failed to show interstitial ad:', error);
  }
}
