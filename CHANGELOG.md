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
