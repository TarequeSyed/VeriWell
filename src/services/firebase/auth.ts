import {
  getAuth,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { app } from './config';

// Firebase Auth singleton
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Ensure anonymous auth for baseline background sessions
 */
export async function ensureAnonymousAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        try {
          const credential = await signInAnonymously(auth);
          resolve(credential.user);
        } catch (err) {
          console.warn('Anonymous auth failed (continuing without auth):', err);
          reject(err);
        }
      }
    });
  });
}

/**
 * Sign in using Google OAuth Popup
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: any) {
    console.error('Google Sign-in Error:', err);
    throw err;
  }
}

/**
 * 1-Click Instant Demo Access for Hackathon Judges
 * Uses Firebase Anonymous Auth and attaches "Hackathon Judge" persona
 */
export async function signInAsJudgeDemo(): Promise<User> {
  try {
    let currentUser = auth.currentUser;
    if (!currentUser) {
      const cred = await signInAnonymously(auth);
      currentUser = cred.user;
    }
    // Assign judge display name for UI presentation
    try {
      await updateProfile(currentUser, {
        displayName: 'Hackathon Judge (Demo)',
      });
    } catch {
      // Non-fatal if profile update fails on anon
    }
    return currentUser;
  } catch (err: any) {
    console.error('Judge Demo Sign-in Error:', err);
    throw err;
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribe to auth changes
 */
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current user UID
 */
export function currentUid(): string | null {
  return auth.currentUser?.uid ?? null;
}
