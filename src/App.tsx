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
  Home,
  LogOut,
  Sparkles,
  Flame,
  User as UserIcon
} from 'lucide-react';
import { ClaimLab } from './components/ClaimLab';
import { BeliefEngine } from './components/BeliefEngine';
import { HybridMonitor } from './components/HybridMonitor';
import { EvidenceStories } from './components/EvidenceStories';
import { FamilyBridge } from './components/FamilyBridge';
import { PrivacyBoundaryVisualizer } from './components/PrivacyBoundaryVisualizer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { subscribeToAuth, signOutUser, signInAsJudgeDemo } from './services/firebase/auth';
import { User } from 'firebase/auth';
import { translations, Language } from './i18n/translations';

type Tab = 'home' | 'claim-lab' | 'belief-engine' | 'family-bridge' | 'stories' | 'monitor';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [lang, setLang] = useState<Language>('en');
  const [showArchVisualizer, setShowArchVisualizer] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedClaimForBelief, setSelectedClaimForBelief] = useState<{
    claimText: string;
    evidenceExcerpt: string;
  } | null>(null);

  const t = translations[lang];

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectClaimForBelief = (claimText: string, evidenceExcerpt: string) => {
    setSelectedClaimForBelief({ claimText, evidenceExcerpt });
    setActiveTab('belief-engine');
  };

  const navTo = (tab: Tab) => setActiveTab(tab);

  // 1-Click Judge launch directly into the live Demo
  const handleJudgeDirectLaunch = async () => {
    try {
      await signInAsJudgeDemo();
      setActiveTab('claim-lab');
    } catch (err) {
      console.error('Judge Demo Launch error:', err);
      setActiveTab('claim-lab');
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setActiveTab('home');
  };

  const isJudge = currentUser?.displayName?.includes('Judge') || currentUser?.isAnonymous;

  const tabBtnClass = (tab: Tab) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
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

      {/* Main Header */}
      <header className="bg-white border-b-2 border-forest-900 sticky top-0 z-30 shadow-[0px_2px_0px_0px_#0F2923]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo — clicking returns to Landing Page */}
          <button
            type="button"
            onClick={() => navTo('home')}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-forest-900 border-2 border-forest-950 flex items-center justify-center text-cream-50 font-black text-2xl shadow-[2px_2px_0px_0px_#0F2923]">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-forest-950">
                  {t.appName}
                </h1>
                <span className="brutal-badge bg-sage-200 text-forest-950">
                  Hybrid AI
                </span>
              </div>
              <p className="text-[11px] text-forest-800 font-bold">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Navigation Tabs & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex items-center gap-1 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs font-bold shadow-[2px_2px_0px_0px_#0F2923]">
              <button
                type="button"
                onClick={() => navTo('home')}
                className={tabBtnClass('home')}
                title="Overview & Get Started"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'अवलोकन' : 'Overview'}</span>
              </button>

              <button type="button" onClick={() => navTo('claim-lab')} className={tabBtnClass('claim-lab')}>
                <Shield className="w-3.5 h-3.5" /> {t.tabs.claimLab}
              </button>

              <button type="button" onClick={() => navTo('belief-engine')} className={tabBtnClass('belief-engine')}>
                <Lock className="w-3.5 h-3.5" /> {t.tabs.beliefEngine}
              </button>

              <button type="button" onClick={() => navTo('family-bridge')} className={tabBtnClass('family-bridge')}>
                <Users className="w-3.5 h-3.5" /> {t.tabs.familyBridge}
              </button>

              <button type="button" onClick={() => navTo('stories')} className={tabBtnClass('stories')}>
                <BookOpen className="w-3.5 h-3.5" /> {t.tabs.stories}
              </button>

              <button type="button" onClick={() => navTo('monitor')} className={tabBtnClass('monitor')}>
                <Activity className="w-3.5 h-3.5" /> {t.tabs.monitor}
              </button>
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs font-black shadow-[2px_2px_0px_0px_#0F2923]">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg transition-colors ${lang === 'en' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg transition-colors ${lang === 'hi' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* User Session State / Login Trigger */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs shadow-[2px_2px_0px_0px_#0F2923]">
                <div className="flex items-center gap-1.5 px-2 py-1 font-bold text-forest-900">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Avatar"
                      className="w-5 h-5 rounded-full border border-forest-900"
                    />
                  ) : isJudge ? (
                    <Flame className="w-4 h-4 text-amber-600" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-forest-800" />
                  )}
                  <span className="font-black text-[11px] truncate max-w-[110px]">
                    {isJudge ? (lang === 'hi' ? 'जज डेमो' : 'Judge Demo') : (currentUser.displayName || 'User')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-1 rounded-lg hover:bg-red-100 text-red-800 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleJudgeDirectLaunch}
                  className="brutal-button-secondary py-1.5 px-3 text-xs bg-amber-200 text-forest-950 hover:bg-amber-300 font-black inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_#0F2923]"
                  title="1-Click Judge Access"
                >
                  <Flame className="w-3.5 h-3.5 text-red-600" />
                  <span className="hidden sm:inline">{lang === 'hi' ? 'जज डेमो' : 'Judge Demo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="brutal-button py-1.5 px-3 text-xs inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_#0F2923]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'hi' ? 'साइन इन' : 'Get Started'}</span>
                </button>
              </div>
            )}

            {/* Architecture Visualizer Toggle Button for Judges */}
            <button
              type="button"
              onClick={() => setShowArchVisualizer(!showArchVisualizer)}
              title="Toggle Hybrid Architecture Visualizer"
              className={`p-2 rounded-xl border-2 border-forest-900 transition-all ${
                showArchVisualizer
                  ? 'bg-forest-900 text-cream-50 shadow-[2px_2px_0px_0px_#0F2923]'
                  : 'bg-white text-forest-900 shadow-[2px_2px_0px_0px_#0F2923] hover:bg-sage-100'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Architecture Inspector — always overlays when active */}
        {showArchVisualizer && (
          <div className="transition-all duration-300 animate-fade-in">
            <PrivacyBoundaryVisualizer lang={lang} />
          </div>
        )}

        {/* Animated tab content */}
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'home' && (
            <LandingPage
              lang={lang}
              onGetStarted={() => setIsAuthModalOpen(true)}
              onJudgeDirectLaunch={handleJudgeDirectLaunch}
              onExploreStories={() => navTo('stories')}
            />
          )}

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
      </main>

      {/* Auth Modal / Dialog */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => navTo('claim-lab')}
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
