import { AdMob, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents } from '@capacitor-community/admob';

// Toggle this flag to switch between test ads and real ads
const useTestAds = true; // set to false for real ads

// Track round counter for interstitial frequency
let roundCounter = 0;

const bannerAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/6300978111' // ✅ Google Test Banner
  : 'ca-app-pub-6695870861385987/2126913341'; // 🎯 My Real Banner Ad ID

const interstitialAdId = useTestAds
  ? 'ca-app-pub-3940256099942544/1033173712' // ✅ Google Test Interstitial
  : 'ca-app-pub-6695870861385987/8598637138'; // 🎯 My Real Interstitial Ad ID

export async function initAdMob() {
  console.log("[AdMob] Initializing… (test mode:", useTestAds, ")");
  try {
    await AdMob.initialize({
      initializeForTesting: useTestAds,
      testingDevices: ['ABCDEF123456'],
    });
    console.log("[AdMob] Initialization complete ✅");

    // Load first interstitial
    await loadInterstitialAd();

    // Attach event listeners
    attachAdListeners();
  } catch (err) {
    console.error("[AdMob] Initialization failed ❌", err);
  }
}

/* ---------------- Interstitial Ads ---------------- */

export async function loadInterstitialAd() {
  console.log("[AdMob] Loading interstitial ad…");
  try {
    await AdMob.prepareInterstitial({
      adId: interstitialAdId,
      isTesting: useTestAds,
    });
    console.log("[AdMob] Interstitial ad loaded ✅");
  } catch (err) {
    console.error("[AdMob] Failed to load interstitial ❌", err);
  }
}

export async function maybeShowInterstitialAd() {
  roundCounter++;
  console.log("[AdMob] Round finished, counter =", roundCounter);

  // Show interstitial every 2 rounds
  if (roundCounter % 2 === 0) {
    console.log("[AdMob] Attempting to show interstitial ad…");
    try {
      await AdMob.showInterstitial();
      console.log("[AdMob] Interstitial ad shown 🎉");
      await loadInterstitialAd(); // preload next
    } catch (err) {
      console.error("[AdMob] Failed to show interstitial ❌", err);
    }
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

/* ---------------- Banner Ads ---------------- */

export async function showGameplayBanner() {
  console.log("[AdMob] Showing gameplay banner…");
  try {
    await AdMob.showBanner({
      adId: bannerAdId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: useTestAds,
    });
    console.log("[AdMob] Gameplay banner shown ✅");
  } catch (err) {
    console.error("[AdMob] Failed to show gameplay banner ❌", err);
  }
}

export async function hideGameplayBanner() {
  console.log("[AdMob] Hiding gameplay banner…");
  try {
    await AdMob.hideBanner();
    console.log("[AdMob] Gameplay banner hidden ✅");
  } catch (err) {
    console.error("[AdMob] Failed to hide banner ❌", err);
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

/* ---------------- Event Listeners ---------------- */

function attachAdListeners() {
  console.log("[AdMob] Attaching event listeners…");

  AdMob.addListener("interstitialAdLoaded", () => {
    console.log("[AdMob] Event: Interstitial loaded");
  });

  AdMob.addListener("interstitialAdFailedToLoad", (error) => {
    console.error("[AdMob] Event: Interstitial failed to load ❌", error);
  });

  AdMob.addListener("interstitialAdDismissed", () => {
    console.log("[AdMob] Event: Interstitial dismissed");
    loadInterstitialAd(); // preload next
  });

  AdMob.addListener("bannerAdLoaded", () => {
    console.log("[AdMob] Event: Banner loaded ✅");
  });

  AdMob.addListener("bannerAdFailedToLoad", (error) => {
    console.error("[AdMob] Event: Banner failed to load ❌", error);
  });

  AdMob.addListener("bannerAdClicked", () => {
    console.log("[AdMob] Event: Banner clicked 👆");
  });
}

/* ---------------- Reset Counter (for testing) ---------------- */

export function resetRoundCounter() {
  roundCounter = 0;
  console.log("[AdMob] Round counter reset to 0");
}