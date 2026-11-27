import { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Activity,
  BookOpen,
  AlertCircle,
  Heart,
  Users,
  Layers,
  LogOut,
  Sparkles,
  Zap,
  Globe,
  ArrowRight,
  User as UserIcon,
} from 'lucide-react';
import { ClaimLab } from './components/ClaimLab';
import { BeliefEngine } from './components/BeliefEngine';
import { HybridMonitor } from './components/HybridMonitor';
import { EvidenceStories } from './components/EvidenceStories';
import { FamilyBridge } from './components/FamilyBridge';
import { PrivacyBoundaryVisualizer } from './components/PrivacyBoundaryVisualizer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { VeriWellLogo } from './components/VeriWellLogo';
import { subscribeToAuth, signOutUser, signInAsJudgeDemo, signInAsGuestDemo } from './services/firebase/auth';
import { User } from 'firebase/auth';
import { translations, Language } from './i18n/translations';

type WorkspaceTab = 'claim-lab' | 'belief-engine' | 'family-bridge' | 'stories' | 'monitor';
type ViewMode = 'landing' | 'workspace';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('claim-lab');
  const [lang, setLang] = useState<Language>('en');
  const [showArchVisualizer, setShowArchVisualizer] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedClaimForBelief, setSelectedClaimForBelief] = useState<{
    claimText: string;
    evidenceExcerpt: string;
  } | null>(null);

  const t = translations[lang];
  const isHindi = lang === 'hi';

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectClaimForBelief = (claimText: string, evidenceExcerpt: string) => {
    setSelectedClaimForBelief({ claimText, evidenceExcerpt });
    setActiveTab('belief-engine');
    setViewMode('workspace');
  };

  // 1-Click Judge launch directly into the live workspace
  const handleJudgeDirectLaunch = async () => {
    try {
      await signInAsJudgeDemo();
    } catch (err) {
      console.warn('Judge Demo fallback execution:', err);
    }
    setViewMode('workspace');
    setActiveTab('claim-lab');
  };

  // Direct feature launch from landing bento cards
  const handleLaunchFeature = async (tab: WorkspaceTab) => {
    if (!currentUser) {
      try {
        await signInAsGuestDemo();
      } catch {
        // Continue even if offline
      }
    }
    setActiveTab(tab);
    setViewMode('workspace');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setViewMode('landing');
  };

  const isJudge = currentUser?.displayName?.includes('Judge') || currentUser?.isAnonymous;

  const tabBtnClass = (tab: WorkspaceTab) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-bold text-xs ${
      activeTab === tab
        ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
        : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
    }`;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col selection:bg-sage-300 selection:text-forest-950 font-sans">
      {/* Top Emergency Safety Banner */}
      <div className="bg-red-800 text-cream-50 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 border-b-2 border-red-950">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{t.emergencyBanner}</span>
      </div>

      {/* Main Header with Adaptive Startup vs Workspace View */}
      <header className="bg-white border-b-2 border-forest-900 sticky top-0 z-30 shadow-[0px_2px_0px_0px_#0A221C]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* ─── BRAND LOGO AREA ─── */}
          {viewMode === 'landing' ? (
            <a href="#" className="hover:opacity-90 transition-opacity">
              <VeriWellLogo
                size="md"
                showText={true}
                showBadge={true}
                badgeText="Hybrid AI"
                subtitle={isHindi ? 'क्लीनिकल साक्ष्य · ऑन-डिवाइस प्राइवेसी' : 'Clinical Truth · On-Device Privacy'}
              />
            </a>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="hover:opacity-90 transition-opacity text-left"
                title="Return to Public Site"
              >
                <VeriWellLogo
                  size="sm"
                  showText={true}
                  showBadge={false}
                  subtitle=""
                />
              </button>

              <span className="brutal-badge bg-forest-950 text-cream-50 text-[10px] uppercase font-mono tracking-wider hidden sm:inline-block">
                Workspace
              </span>

              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="hidden md:inline-flex items-center gap-1 text-[11px] text-forest-700 hover:text-forest-950 font-bold border border-forest-900/25 px-2 py-1 rounded-lg hover:bg-sage-100 transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>{isHindi ? 'वेबसाइट' : 'Public Site'}</span>
              </button>
            </div>
          )}

          {/* ─── CENTER NAVIGATION AREA ─── */}
          {viewMode === 'landing' ? (
            /* Startup Marketing Anchor Links (Shown ONLY on Landing Page) */
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-forest-800">
              <a href="#how-it-works" className="hover:text-forest-950 transition-colors">
                {isHindi ? 'कार्यप्रणाली' : 'How It Works'}
              </a>
              <a href="#features" className="hover:text-forest-950 transition-colors">
                {isHindi ? 'सुविधाएं' : 'Features'}
              </a>
              <a href="#clinical-evidence" className="hover:text-forest-950 transition-colors">
                {isHindi ? 'WHO साक्ष्य' : 'Clinical Grounding'}
              </a>
              <a href="#specs" className="hover:text-forest-950 transition-colors">
                {isHindi ? 'स्पेक्स' : 'Tech Specs'}
              </a>
            </nav>
          ) : (
            /* Clinical Workspace Console Tabs (Revealed ONLY inside Workspace) */
            <nav className="flex items-center gap-1 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs shadow-[2px_2px_0px_0px_#0A221C] overflow-x-auto max-w-[calc(100vw-220px)] sm:max-w-none">
              <button
                type="button"
                onClick={() => setActiveTab('claim-lab')}
                className={tabBtnClass('claim-lab')}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.tabs.claimLab}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('belief-engine')}
                className={tabBtnClass('belief-engine')}
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.tabs.beliefEngine}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('family-bridge')}
                className={tabBtnClass('family-bridge')}
              >
                <Users className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.tabs.familyBridge}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stories')}
                className={tabBtnClass('stories')}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.tabs.stories}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monitor')}
                className={tabBtnClass('monitor')}
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{t.tabs.monitor}</span>
              </button>
            </nav>
          )}

          {/* ─── RIGHT ACTION CONTROLS ─── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs font-black shadow-[2px_2px_0px_0px_#0A221C]">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  lang === 'en' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  lang === 'hi' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* In Workspace View: Architecture Visualizer Button */}
            {viewMode === 'workspace' && (
              <button
                type="button"
                onClick={() => setShowArchVisualizer(!showArchVisualizer)}
                title="Toggle Hybrid Architecture Visualizer"
                className={`p-2 rounded-xl border-2 border-forest-900 transition-all ${
                  showArchVisualizer
                    ? 'bg-forest-900 text-cream-50 shadow-[2px_2px_0px_0px_#0A221C]'
                    : 'bg-white text-forest-900 shadow-[2px_2px_0px_0px_#0A221C] hover:bg-sage-100'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
            )}

            {/* In Workspace View: Active User Profile Pill & Sign Out */}
            {viewMode === 'workspace' ? (
              <div className="flex items-center gap-1.5 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs shadow-[2px_2px_0px_0px_#0A221C]">
                <div className="flex items-center gap-1.5 px-2 py-1 font-bold text-forest-900">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Avatar"
                      className="w-5 h-5 rounded-full border border-forest-900"
                    />
                  ) : isJudge ? (
                    <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-forest-800" />
                  )}
                  <span className="font-black text-[11px] truncate max-w-[100px]">
                    {isJudge
                      ? (isHindi ? 'जज डेमो' : 'Judge Demo')
                      : (currentUser?.displayName || (isHindi ? 'उपयोगकर्ता' : 'Demo User'))}
                  </span>
                  {isJudge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse hidden sm:inline-block" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign Out to Public Site"
                  className="p-1 rounded-lg hover:bg-red-100 text-red-800 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* In Landing View: 1-Click Judge Demo + Primary Get Started */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleJudgeDirectLaunch}
                  className="brutal-button-emerald py-1.5 px-3 text-xs inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0A221C]"
                  title="1-Click Direct Demo Launch for Evaluators"
                >
                  <Zap className="w-3.5 h-3.5 text-forest-950 fill-forest-950" />
                  <span className="hidden sm:inline">{isHindi ? 'जज डेमो' : 'Judge Demo'}</span>
                </button>

                {currentUser ? (
                  <button
                    type="button"
                    onClick={() => setViewMode('workspace')}
                    className="brutal-button py-1.5 px-3 text-xs inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0A221C]"
                  >
                    <span>{isHindi ? 'वर्कस्पेस' : 'Console'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="brutal-button py-1.5 px-3 text-xs inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0A221C]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isHindi ? 'साइन इन' : 'Get Started'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Architecture Inspector Overlay (When active inside workspace) */}
        {viewMode === 'workspace' && showArchVisualizer && (
          <div className="transition-all duration-300 animate-fade-in">
            <PrivacyBoundaryVisualizer lang={lang} />
          </div>
        )}

        {/* View Mode Switching: Landing vs Workspace */}
        {viewMode === 'landing' ? (
          <div className="animate-fade-in">
            <LandingPage
              lang={lang}
              onGetStarted={() => setIsAuthModalOpen(true)}
              onJudgeDirectLaunch={handleJudgeDirectLaunch}
              onLaunchFeature={handleLaunchFeature}
              isLoggedIn={!!currentUser}
            />
          </div>
        ) : (
          <div key={activeTab} className="animate-fade-in">
            {activeTab === 'claim-lab' && (
              <ClaimLab
                onSelectClaimForBelief={handleSelectClaimForBelief}
                lang={lang}
              />
            )}

            {activeTab === 'belief-engine' && (
              <BeliefEngine
                initialClaimText={selectedClaimForBelief?.claimText}
                initialEvidenceExcerpt={selectedClaimForBelief?.evidenceExcerpt}
                lang={lang}
              />
            )}

            {activeTab === 'family-bridge' && (
              <FamilyBridge lang={lang} />
            )}

            {activeTab === 'stories' && (
              <EvidenceStories lang={lang} />
            )}

            {activeTab === 'monitor' && (
              <HybridMonitor lang={lang} />
            )}
          </div>
        )}
      </main>

      {/* Auth Modal / Dialog (Google Auth, Judge Demo, Guest Demo) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setViewMode('workspace');
          setActiveTab('claim-lab');
        }}
        lang={lang}
      />

      {/* Footer */}
      <footer className="border-t-2 border-forest-900 bg-white py-6 mt-12 text-center text-xs text-forest-800 font-bold space-y-1">
        <p className="flex items-center justify-center gap-1">
          Built for <strong className="text-forest-950">#BuildHybridAI 2026</strong> with Google Firebase AI Logic & Chrome Gemini Nano.
        </p>
        <p className="flex items-center justify-center gap-1 text-[11px] text-forest-600">
          Powered by Antigravity <Heart className="w-3.5 h-3.5 text-red-600 inline" /> Apache-2.0 Open Source.
        </p>
      </footer>
    </div>
  );
}

export default App;
