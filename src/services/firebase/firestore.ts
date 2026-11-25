import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { app } from './config';
import { InferenceTrace } from '../../types';

// Firestore singleton
let _db: Firestore | null = null;

function getDB(): Firestore {
  if (!_db) _db = getFirestore(app);
  return _db;
}

// ─── evidence_traces collection ───────────────────────────────────────────────
// Persists hybrid AI routing telemetry so judges can inspect real usage in
// the Firebase Console. Only written when user has consented (via ClaimLab).

export async function persistInferenceTrace(
  trace: InferenceTrace,
  uid: string | null
): Promise<void> {
  try {
    const db = getDB();
    const ref = collection(db, 'evidence_traces');
    await addDoc(ref, {
      taskId: trace.id,
      task: trace.task,
      actualSource: trace.actualSource,
      requestedMode: trace.requestedMode,
      elapsedMs: trace.elapsedMs,
      outcome: trace.outcome,
      details: trace.details ?? null,
      uid: uid ?? 'anonymous',
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // Non-fatal: telemetry write failure should never break the user experience
    console.warn('[Firestore] trace persist failed:', err);
  }
}

// ─── verification_logs collection ─────────────────────────────────────────────
// Persists anonymised claim verification events (no claim text stored —
// only verdict + timestamp to protect user privacy).

export async function persistVerificationEvent(
  verdict: string,
  inferenceMode: string,
  uid: string | null
): Promise<void> {
  try {
    const db = getDB();
    const ref = collection(db, 'verification_logs');
    await addDoc(ref, {
      verdict,
      inferenceMode,
      uid: uid ?? 'anonymous',
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('[Firestore] verification event persist failed:', err);
  }
}
