export default {
  expo: {
    name: 'ai-logo',
    slug: 'ai-logo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseClientEmail: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_EMAIL,
      firebaseAuthUri: process.env.EXPO_PUBLIC_FIREBASE_AUTH_URI,
      firebaseTokenUri: process.env.EXPO_PUBLIC_FIREBASE_TOKEN_URI,
      firebaseAuthProviderX509CertUrl: process.env.EXPO_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      firebaseClientX509CertUrl: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL
    }
  }
}; 