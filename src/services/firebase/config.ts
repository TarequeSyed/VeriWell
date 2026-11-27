import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, CustomProvider } from 'firebase/app-check';

// Firebase configuration strictly from environment variables (.env.local)
// NEVER hardcode raw API keys or project IDs in source code.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase configuration missing! Please ensure .env.local contains all required VITE_FIREBASE_* variables.");
}

// Singleton App Instance
export const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Configure App Check
let appCheckInstance: any = null;

export function initAppCheck() {
  if (appCheckInstance) return appCheckInstance;
  if (typeof window === 'undefined') return null;

  try {
    const isDebug = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG === 'true' || import.meta.env.DEV;
    const debugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;

    if (debugToken) {
      // @ts-ignore
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
    } else if (isDebug) {
      // In local dev without explicit debug token, let Firebase SDK generate a valid debug token
      // @ts-ignore
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;
    if (siteKey) {
      appCheckInstance = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } else if (debugToken) {
      // Only initialize debug CustomProvider if a registered debug token is explicitly supplied
      appCheckInstance = initializeAppCheck(app, {
        provider: new CustomProvider({
          getToken: () => {
            return Promise.resolve({
              token: debugToken,
              expireTimeMillis: Date.now() + 60 * 60 * 1000,
            });
          },
        }),
        isTokenAutoRefreshEnabled: true,
      });
    } else {
      // Without a valid siteKey or registered debugToken, do NOT attach a dummy fake token.
      // Attaching an invalid token causes Google APIs (like Vertex AI) to return HTTP 401 App Check invalid.
      console.info("App Check: Running in development mode without token enforcement.");
      return null;
    }
  } catch (err) {
    console.warn("App Check initialization notice (continuing in monitoring mode):", err);
  }

  return appCheckInstance;
}
