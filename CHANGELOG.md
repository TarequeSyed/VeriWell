# VeriWell — Project Development Changelog

> Comprehensive record of implementations, modifications, bug fixes, and security remediations.
> Updated after each step.

---

## [2026-11-19] - Initial Scaffolding & Security Remediation

### 1. What Was Done
- Scaffolded the complete React 18 + TypeScript + Vite project architecture.
- Established design tokens with Tailwind CSS (Manrope/Inter typography, sage/forest/cream accessible palette).
- Configured Firebase JS SDK with Firebase AI Logic hybrid routing architecture.
- Curated 5 authentic evidence cards from WHO and NIDDK on Type 2 diabetes and hypertension.
- Built the complete vertical slice UI:
  - **Claim Lab**: Forwarded message analysis, privacy consent gate, structured claim extraction, and verdict badges.
  - **Belief Engine**: 100% on-device private exploration of fears/hesitations, empathetic reflection, and interactive teach-back loop.
  - **Hybrid Monitor**: Real-time telemetry inspector displaying latency (ms), actual execution source (`ON_DEVICE` vs `IN_CLOUD`), and hardware status.
  - **Evidence Stories**: Swipeable cards with audited clinical guidelines.
  - **App Shell**: Emergency stroke triage warnings and tab navigation.
- Verified TypeScript compilation (`npm run typecheck`) and Vite production bundling (`npm run build`).

### 2. Changes Made
- **Security Remediation in `src/services/firebase/config.ts`**:
  - Removed all hardcoded fallback strings.
  - Switched strictly to environment variables (`import.meta.env.VITE_FIREBASE_*`).
  - Added warning check if `.env.local` is missing or unconfigured.
- **Git Commit Reset & Policy Enforced**:
  - Purged the initial commit containing the fallback string from git history (`git update-ref -d HEAD`).
  - Unstaged all files (`git rm -r -f --cached .`).
  - Repository now has 0 commits, clean working tree, ready for developer to review and commit.
  - Enforced policy: **Agent will NEVER run `git commit` or `git push`. All version control commits will be executed solely by the developer.**
- **Added `src/vite-env.d.ts`**:
  - Typed all Vite environment variables for strict TypeScript compliance.
- **Implemented Winning Hackathon Features (Milestone 2 & Feature Expansion)**:
  - **Multimodal Screenshot Verification**: Added `verifyPublicImageCloud` in `src/services/ai/router.ts` and image file dropzone in `src/components/ClaimLab.tsx` supporting screenshot uploads (PNG/JPG/WEBP) with Base64 conversion and preview.
  - **Offline Simulation Switch**: Added toggle in `src/services/ai/router.ts` and `src/components/HybridMonitor.tsx` enabling judges to simulate losing network connection with one click and observe local Gemini Nano on-device resilience.
  - **Family Bridge & Doctor Checklist**: Created `src/services/ai/familyBridge.ts` and `src/components/FamilyBridge.tsx` for generating culturally respectful WhatsApp counter-forwards and tailored clinician consultation question cards.
  - **Interactive Hybrid Privacy Boundary Visualizer**: Built `src/components/PrivacyBoundaryVisualizer.tsx` showing an animated dual-domain architectural diagram distinguishing the 0KB on-device Gemini Nano boundary from the Firebase AI Logic cloud boundary.
  - **Local Browser Audio Narration (TTS)**: Built `src/services/speech/index.ts` enabling on-device read-aloud functionality in `EvidenceStories.tsx` using `window.speechSynthesis` (0 cloud audio costs, 0 network audio leakage).
  - **Bilingual Interface Support (English ↔ Hindi)**: Created `src/i18n/translations.ts` and integrated a language switcher into `src/App.tsx`, providing culturally resonant Devanagari Hindi translations for South Asian health misinformation scenarios.
  - **Tactile UI System**: Added Bento-box card styles, ambient gradient glows, and tactile button physics in `src/index.css`.
- **Neo-Brutalist Minimalism Design Redesign**:
  - Re-engineered the visual language to **Neo-Brutalist Minimalism**: stark 2px dark borders (`border-2 border-forest-900`), hard offset shadows (`shadow-[4px_4px_0px_0px_#0F2923]`), tactile button press mechanics (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`), and high-contrast monospace metadata badges.
  - Gives the platform an authoritative, memorable, editorial aesthetic reflecting clinical clarity and unyielding evidence.
- **Deep End-to-End English ↔ Hindi Localization**:
  - Upgraded `src/data/evidence.json` with authentic Hindi clinical translations (`title_hi`, `organization_hi`, `paraphrase_hi`, `scope_hi`) for all 5 WHO and NIDDK evidence cards.
  - Expanded `src/i18n/translations.ts` to cover every UI element: sample viral forwards in Hindi, Claim Lab inputs/verdicts, Belief Engine empathetic questions/teach-backs, Family Bridge counter-messages, Evidence Stories, Hybrid Monitor telemetry labels, and Privacy Boundary diagrams.
  - Upgraded on-device local speech synthesis in `src/services/speech/index.ts` to dynamically switch speech voice locale to `hi-IN` when Hindi is selected.
  - Enabled dynamic `lang` prop propagation across all components (`ClaimLab`, `BeliefEngine`, `FamilyBridge`, `EvidenceStories`, `HybridMonitor`, `PrivacyBoundaryVisualizer`).

### 3. Bugs Encountered & How They Were Fixed
- **Bug 1: GitHub Secret Alert on Fallback API Key**:
  - *Cause*: Hardcoded fallback values in `src/services/firebase/config.ts` matched Google's `AIzaSy...` regex pattern.
  - *Fix*: Eradicated all fallback literals from code; deleted git commit from history; updated `.gitignore`; guided developer on key rotation and domain restriction in Google Cloud Console.
- **Bug 2: Missing TypeScript definitions for `import.meta.env`**:
  - *Cause*: Vite's `import.meta.env` properties threw `Property 'env' does not exist on type 'ImportMeta'`.
  - *Fix*: Created `src/vite-env.d.ts` with explicit `ImportMetaEnv` interface.
- **Bug 3: Unused React state setters in `BeliefEngine.tsx`**:
  - *Cause*: `setClaimText` and `setEvidenceExcerpt` triggered `TS6133: declared but never read`.
  - *Fix*: Added `useEffect` hook to synchronize props with internal state when navigating from Claim Lab.
- **Bug 4: Sandbox Network Restriction during npm install**:
  - *Cause*: Initial `npm install` inside sandbox failed with `ENOTFOUND registry.npmjs.org`.
  - *Fix*: Ran `npm install` with unsandboxed permission, completing installation of 223 packages.
- **Bug 5: Syntax Error in Router Comment**:
  - *Cause*: JSDoc comment opened without `/**` block delimiter on line 185 of `router.ts`.
  - *Fix*: Formatted comment delimiters properly.
- **Bug 6: Unused variable in `familyBridge.ts`**:
  - *Cause*: `evidenceSummary` parameter was declared but unused.
  - *Fix*: Integrated `evidenceSummary` directly into the generated doctor consultation checklist.
- **Bug 7: Unused `Globe` icon import in `App.tsx`**:
  - *Cause*: `Globe` imported from `lucide-react` triggered `TS6133: declared but never read`.
  - *Fix*: Removed unused `Globe` import from `App.tsx`.
- **Bug 8: Unused `title` variable in `familyBridge.ts`**:
  - *Cause*: `title` was extracted from `evidenceCard` but not concatenated in the Hindi counter-forward string.
  - *Fix*: Integrated `"${title}"` into the Hindi medical guideline citation.

---

## [2026-11-25] - Firestore Integration, Landing Hero & Resilient Hybrid Simplification

### 1. What Was Done
- **Firebase Anonymous Authentication**:
  - Implemented `src/services/firebase/auth.ts` providing seamless, privacy-preserving session authentication via `ensureAnonymousAuth()`.
  - Ensures all cloud writes (telemetry and verification logs) are securely tied to an authenticated session without requiring personal login credentials.
- **Firestore Telemetry & Verification Event Logging**:
  - Implemented `src/services/firebase/firestore.ts` managing `evidence_traces` (routing telemetry) and `verification_logs` (anonymized clinical outcomes).
  - Configured `firestore` block in `firebase.json` and delegated authoring of production `firestore.rules` to the `firestore-rules-author` subagent.
- **Wired Telemetry Logging into Hybrid Router**:
  - Updated `emitTrace()` in `src/services/ai/router.ts` to automatically persist all on-device and cloud routing traces to Firestore.
- **Landing Hero Section**:
  - Created `src/components/Hero.tsx` featuring high-impact Neo-Brutalist design, #BuildHybridAI 2026 badge indicators, live stat metrics (2+ AI Modes, 5 WHO Sources, 0KB Private Data, 100% Open Source), interactive 3-card feature triptych, and an intuitive dual-domain architecture breakdown.
  - Set as the default landing view in `src/App.tsx` with a Home icon in the navigation bar.
- **PREFER_ON_DEVICE Public Evidence Simplification**:
  - Upgraded `simplifyPublicEvidence` in `src/services/ai/router.ts` with bilingual Devanagari Hindi support and automated Chrome Prompt API on-device fallback.
  - Surfaced the feature in `src/components/EvidenceStories.tsx` with an "AI Plain-Language Points" button and dedicated breakdown card.
- **Shimmer Skeleton Loading States**:
  - Added `@keyframes shimmer` and `.skeleton-shimmer` utility in `src/index.css`.
  - Added animated skeleton placeholder cards in `src/components/ClaimLab.tsx` displaying the active `ONLY_IN_CLOUD` inference status while cloud AI is executing.
- **Smooth Navigation Transitions**:
  - Added `@keyframes fadeIn` and `.animate-fade-in` in `src/index.css` for slick tab switching.
- **Build & Verification**:
  - Verified full TypeScript compliance (`npm run typecheck` returned code 0).
  - Verified production bundle build (`npm run build` completed in 16.60s with 0 errors).

### 2. Changes Made
- `src/services/firebase/auth.ts`: Created anonymous authentication service.
- `src/services/firebase/firestore.ts`: Created Firestore telemetry and verification event services.
- `src/services/ai/router.ts`: Integrated Firestore trace logging into `emitTrace()`; upgraded `simplifyPublicEvidence()` with language awareness and offline simulation direct-route.
- `src/components/Hero.tsx`: Created Neo-Brutalist landing hero component.
- `src/components/EvidenceStories.tsx`: Added "AI Plain-Language Points" simplification button and card.
- `src/components/ClaimLab.tsx`: Added skeleton loader during verification and Firestore event persistence.
- `src/App.tsx`: Added `Hero` component, Home tab navigation button, and animated tab transitions.
- `src/i18n/translations.ts`: Added simplification keys for English and Hindi.
- `src/index.css`: Added `@keyframes fadeIn`, `.animate-fade-in`, `@keyframes shimmer`, and `.skeleton-shimmer`.
- `firebase.json`: Configured `firestore` section with rules path.

### 3. Bugs Encountered & How They Were Fixed
- **Bug 1: Missing Animation Utilities in CSS**:
  - *Cause*: `animate-fade-in` was referenced in `App.tsx` and `ClaimLab.tsx` but was not declared in Tailwind config or `index.css`.
  - *Fix*: Added custom `@keyframes fadeIn` and `@keyframes shimmer` directly into `@layer utilities` in `src/index.css`.
- **Bug 2: Unhandled Simplification during Simulated Offline Mode**:
  - *Cause*: Calling `simplifyPublicEvidence()` while `isOfflineSimulated` is true would attempt to call Firebase Cloud AI and throw an error before falling back.
  - *Fix*: Added check for `isOfflineSimulated` at the top of `simplifyPublicEvidence()` to immediately route directly to the on-device Chrome `LanguageModel` session.
- **Bug 3: Key mismatch in i18n translation strings**:
  - *Cause*: `simplifiedTitle` and `simplifyButton` were initially missing from `TranslationStrings` interface and Hindi translations.
  - *Fix*: Synchronized interface and both `en` and `hi` dictionaries in `src/i18n/translations.ts`.

---

## [2026-11-25] - Awwwards-Inspired Homepage, Google Auth & 1-Click Judge Demo Access

### 1. What Was Done
- **Awwwards-Inspired Homepage (`LandingPage.tsx`)**:
  - Built an editorial, high-contrast homepage inspired by Awwwards-winning site designs.
  - Integrated a marquee ribbon (`.animate-marquee`) emphasizing Google Chrome Built-in AI, Gemini Nano, Firebase AI Logic, and zero-knowledge privacy.
  - Giant hero typography with accessible high-contrast badges and live hardware availability indicator.
  - Dual-Domain architectural breakdown comparing the Public Cloud Domain (`ONLY_IN_CLOUD`) with the On-Device Sanctum (`ONLY_ON_DEVICE`).
  - Interactive 5-module feature Bento Grid showcasing Claim Lab, Belief Engine, Family Bridge, Evidence Stories, and Real-Time Telemetry.
  - High-impact bottom CTA banner for launching live demonstrations.
- **Firebase Google Sign-In & 1-Click Judge Access (`auth.ts` & `AuthModal.tsx`)**:
  - Extended `src/services/firebase/auth.ts` with `signInWithGoogle()` (using `GoogleAuthProvider` popup) and `signInAsJudgeDemo()` (using Firebase Anonymous Auth with an explicit "Hackathon Judge (Demo)" user persona).
  - Built `src/components/AuthModal.tsx` modal dialog supporting both Google authentication and immediate 1-click Judge Demo access with zero signup required.
  - Added user session tracking in `src/App.tsx` displaying live avatar/name or `[⚡ Judge Demo]` pill with one-click sign out.
- **Judge Bypass Flow**:
  - Added 1-Click "Judge Demo" button directly in the header and on the landing hero, instantly unlocking the full interactive suite (`ClaimLab`, `BeliefEngine`, `FamilyBridge`, `EvidenceStories`, `HybridMonitor`) without requiring any OAuth account setup.
- **CSS Animations**:
  - Added `@keyframes marquee` and `.animate-marquee` in `src/index.css`.

### 2. Changes Made
- `src/services/firebase/auth.ts`: Added `signInWithGoogle()`, `signInAsJudgeDemo()`, `signOutUser()`, and `subscribeToAuth()`.
- `src/components/AuthModal.tsx`: Created Neo-Brutalist authentication dialog with Google Sign-in and Judge Demo options.
- `src/components/LandingPage.tsx`: Created Awwwards-inspired landing page with interactive feature tabs and marquee ribbon.
- `src/App.tsx`: Integrated `LandingPage`, `AuthModal`, authentication lifecycle listener, and user status indicators in header.
- `src/index.css`: Added marquee animation keyframes.

### 3. Bugs Encountered & How They Were Fixed
- **Bug 1: Type mismatch in AuthModal state setter**:
  - *Cause*: Calling `setIsLoading(false)` on a `'google' | 'judge' | null` state threw `TS2345: Argument of type 'false' is not assignable to parameter`.
  - *Fix*: Changed `setIsLoading(false)` to `setIsLoading(null)`.
- **Bug 2: Unused icon imports in `LandingPage.tsx`**:
  - *Cause*: `Volume2`, `WifiOff`, `Layers`, `Heart`, `ChevronRight`, `ExternalLink` triggered `TS6133: declared but never read`.
  - *Fix*: Cleaned up unused imports from `lucide-react`.
