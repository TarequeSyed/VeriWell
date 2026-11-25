# VeriWell — Implementation Plan

> Master Engineering Roadmap for #BuildHybridAI 2026 Devpost Hackathon
> Target: Web / Chrome Prize & Grand Prize

---

## 1. Project Overview & Architecture

**VeriWell** is a privacy-first, evidence-driven health claim verification and empathetic comprehension platform.
It uses **Firebase AI Logic Hybrid Inference** to achieve a closed-loop claim-to-understanding workflow:
- **Cloud Inference (`ONLY_IN_CLOUD`)**: Multimodal public claim extraction, structured claim classification, and evidence synthesis. Public, de-identified claims only.
- **On-Device Inference (`ONLY_ON_DEVICE`)**: Private Belief Engine and adaptive teach-back. Evaluates user concerns (cost, side-effects, distrust) locally via Chrome's on-device Gemini Nano (`LanguageModel`). Private thoughts NEVER leave the client.
- **Resilient Fallback (`PREFER_ON_DEVICE`)**: Public plain-language explanation and summarization using cached evidence cards. Routes to Gemini Nano when available, seamlessly falling back to cloud Gemini.

---

## 2. Technology Stack

- **Frontend Framework**: React 18 / 19 + TypeScript + Vite
- **Styling**: Tailwind CSS, Manrope / Inter typography, Lucide Icons
- **Backend & Cloud AI**: Firebase JS SDK (`firebase` >= 12.5.0)
  - `firebase/app`
  - `firebase/ai` (Firebase AI Logic: `GoogleAIBackend`, `InferenceMode`)
  - `firebase/app-check` (ReCAPTCHA Enterprise / DebugProvider)
  - `firebase/firestore` (Public evidence database & trace metadata)
  - `firebase/auth` (Anonymous auth for secure App Check / Firestore rules)
- **Local Storage & Offline**: IndexedDB (Dexie or direct idb) + Cache API / Service Worker
- **Validation**: Zod runtime schema validation

---

## 3. Milestones & Acceptance Checks

### Milestone 0: Workspace Scaffolding & Firebase Initialization
- [x] Git repository initialization & `.gitignore`
- [x] Environment configuration (`.env.example`, `.env.local`)
- [ ] Vite + React + TypeScript scaffolding
- [ ] Dependencies installation (`firebase`, `lucide-react`, `zod`, `tailwindcss`)
- [ ] Firebase App, App Check (DebugProvider), and AI Logic initialization module (`src/services/firebase/`)
- [ ] Initial smoke test verification for both Cloud (`ONLY_IN_CLOUD`) and On-Device (`LanguageModel` / `ONLY_ON_DEVICE`)

### Milestone 1: Curated Evidence Corpus & Schema Contracts
- [ ] Typed Zod contracts (`EvidenceCard`, `Claim`, `ClaimResult`, `BeliefResult`, `TeachBackResult`, `InferenceTrace`)
- [ ] Initial versioned evidence corpus (`src/data/evidence.json`) featuring 5 verified WHO/NIDDK diabetes & hypertension claims
- [ ] Evidence retrieval service (`src/services/evidence/`) with keyword matching, tag matching, and citation validator
- [ ] Unit tests for citation validator and hallucination guardrails

### Milestone 2: Cloud Claim Lab (`ONLY_IN_CLOUD`)
- [ ] Intake component: Paste viral forwarded text or synthetic health tip
- [ ] Consent & Pre-transmission redaction review (stripping names, phone numbers)
- [ ] Claim extraction & verification service using `firebase/ai` with `InferenceMode.ONLY_IN_CLOUD`
- [ ] Structured JSON output validation with Zod
- [ ] Result cards with verdict badges, evidence sources, and doctor discussion guides

### Milestone 3: On-Device Belief Engine (`ONLY_ON_DEVICE`)
- [ ] Local belief exploration: "What makes this claim appealing or prescription difficult?"
- [ ] On-device concern classifier (cost, fear of side-effects, institutional distrust)
- [ ] Empathetic teach-back loop: checks understanding against evidence card without judgment
- [ ] Offline resilience: Works completely disconnected from internet with local model
- [ ] Network verification: Zero bytes transmitted over network for private thoughts

### Milestone 4: Hybrid Monitor & Resilient Fallback (`PREFER_ON_DEVICE`)
- [ ] Hybrid Diagnostics Monitor dashboard showing real-time `inferenceSource` (`ON_DEVICE` vs `IN_CLOUD`), latency (ms), and cache hits
- [ ] Public simplified summary using `InferenceMode.PREFER_ON_DEVICE`
- [ ] Honest fallback and graceful error messaging (no deceptive mock AI states)

### Milestone 5: UI Polish, Evidence Stories, & Hackathon Packaging
- [ ] Sage & cream accessible palette (`#153B32`, `#F6F5EF`, `#DDECE2`, AA contrast)
- [ ] Swipeable 3-card Evidence Story component
- [ ] Family Bridge respectful share card generator
- [ ] Apache-2.0 License, comprehensive `README.md` with Chrome setup instructions & architecture diagram
- [ ] Firebase Hosting deployment & demo video walkthrough preparation
