import { useState } from 'react';
import { Shield, Lock, Activity, BookOpen, AlertCircle, Heart, Users, Layers } from 'lucide-react';
import { ClaimLab } from './components/ClaimLab';
import { BeliefEngine } from './components/BeliefEngine';
import { HybridMonitor } from './components/HybridMonitor';
import { EvidenceStories } from './components/EvidenceStories';
import { FamilyBridge } from './components/FamilyBridge';
import { PrivacyBoundaryVisualizer } from './components/PrivacyBoundaryVisualizer';
import { translations, Language } from './i18n/translations';

type Tab = 'claim-lab' | 'belief-engine' | 'family-bridge' | 'stories' | 'monitor';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('claim-lab');
  const [lang, setLang] = useState<Language>('en');
  const [showArchVisualizer, setShowArchVisualizer] = useState(false);
  const [selectedClaimForBelief, setSelectedClaimForBelief] = useState<{
    claimText: string;
    evidenceExcerpt: string;
  } | null>(null);

  const t = translations[lang];

  const handleSelectClaimForBelief = (claimText: string, evidenceExcerpt: string) => {
    setSelectedClaimForBelief({ claimText, evidenceExcerpt });
    setActiveTab('belief-engine');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col selection:bg-sage-300 selection:text-forest-950 font-sans">
      {/* Top Emergency Safety Banner */}
      <div className="bg-red-800 text-cream-50 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 border-b-2 border-red-950">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{t.emergencyBanner}</span>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-2 border-forest-900 sticky top-0 z-30 shadow-[0px_2px_0px_0px_#0F2923]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
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
              <p className="text-xs text-forest-800 font-bold">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex items-center gap-1 bg-cream-50 p-1 rounded-xl border-2 border-forest-900 text-xs font-bold shadow-[2px_2px_0px_0px_#0F2923]">
              <button
                type="button"
                onClick={() => setActiveTab('claim-lab')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'claim-lab'
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
                <Shield className="w-3.5 h-3.5" /> {t.tabs.claimLab}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('belief-engine')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'belief-engine'
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> {t.tabs.beliefEngine}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('family-bridge')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'family-bridge'
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> {t.tabs.familyBridge}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stories')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'stories'
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> {t.tabs.stories}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monitor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'monitor'
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
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
        {/* Architecture Inspector Modal / Hero Panel for Judges */}
        {showArchVisualizer && (
          <div className="transition-all duration-300">
            <PrivacyBoundaryVisualizer lang={lang} />
          </div>
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
      </main>

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
