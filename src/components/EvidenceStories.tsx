import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, CheckCircle2, Volume2, VolumeX, Sparkles, RefreshCw, Cpu } from 'lucide-react';
import { evidenceCorpus } from '../services/evidence';
import { speakTextLocally, stopSpeakingLocally } from '../services/speech';
import { simplifyPublicEvidence } from '../services/ai/router';
import { translations, Language } from '../i18n/translations';

interface EvidenceStoriesProps {
  lang?: Language;
}

export const EvidenceStories: React.FC<EvidenceStoriesProps> = ({ lang = 'en' }) => {
  const t = translations[lang].stories;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [isSimplifying, setIsSimplifying] = useState(false);

  const currentCard = evidenceCorpus[currentIndex];

  const resetCardState = () => {
    stopSpeakingLocally();
    setIsSpeaking(false);
    setSimplifiedText(null);
  };

  const handleNext = () => {
    resetCardState();
    setCurrentIndex((prev) => (prev + 1) % evidenceCorpus.length);
  };

  const handlePrev = () => {
    resetCardState();
    setCurrentIndex((prev) => (prev - 1 + evidenceCorpus.length) % evidenceCorpus.length);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeakingLocally();
      setIsSpeaking(false);
    } else if (currentCard) {
      const titleToRead = (lang === 'hi' && currentCard.title_hi) ? currentCard.title_hi : currentCard.title;
      const orgToRead = (lang === 'hi' && currentCard.organization_hi) ? currentCard.organization_hi : currentCard.organization;
      const textToRead = simplifiedText || ((lang === 'hi' && currentCard.paraphrase_hi) ? currentCard.paraphrase_hi : currentCard.paraphrase);
      
      const fullText = `${titleToRead}. ${orgToRead}: ${textToRead}`;
      speakTextLocally(
        fullText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        lang === 'hi' ? 'hi-IN' : 'en-US'
      );
    }
  };

  const handleSimplify = async () => {
    if (!currentCard || isSimplifying) return;
    setIsSimplifying(true);
    try {
      const textToSimplify = (lang === 'hi' && currentCard.paraphrase_hi) ? currentCard.paraphrase_hi : currentCard.paraphrase;
      const simplified = await simplifyPublicEvidence(textToSimplify, lang);
      setSimplifiedText(simplified);
    } catch (err) {
      console.error('Simplification error:', err);
    } finally {
      setIsSimplifying(false);
    }
  };

  const cardTitle = (lang === 'hi' && currentCard?.title_hi) ? currentCard.title_hi : currentCard?.title;
  const cardOrg = (lang === 'hi' && currentCard?.organization_hi) ? currentCard.organization_hi : currentCard?.organization;
  const cardParaphrase = (lang === 'hi' && currentCard?.paraphrase_hi) ? currentCard.paraphrase_hi : currentCard?.paraphrase;
  const cardScope = (lang === 'hi' && currentCard?.scope_hi) ? currentCard.scope_hi : currentCard?.scope;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Intro */}
      <div className="brutal-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-forest-900 text-cream-50 rounded-xl border-2 border-forest-950 shadow-[2px_2px_0px_0px_#0A221C] mt-1">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="heading-xl">{t.title}</h2>
            <p className="body-base mt-1">
              {t.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Swipeable Story Card */}
      {currentCard && (
        <div className="brutal-card p-8 space-y-6 relative overflow-hidden bg-white shadow-[6px_6px_0px_0px_#0A221C]">
          {/* Progress indicators */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-forest-900/10">
            <div className="flex gap-2">
              {evidenceCorpus.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    resetCardState();
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full border-2 border-forest-900 transition-all ${i === currentIndex ? 'w-10 bg-forest-900' : 'w-3 bg-sage-200'}`}
                />
              ))}
            </div>
            <span className="eyebrow text-forest-800">
              {t.cardOf} {currentIndex + 1} / {evidenceCorpus.length}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="brutal-badge bg-emerald-100 text-emerald-950 border-forest-900 font-bold">
                  {currentCard.topic}
                </span>
                <span className="text-xs text-forest-700 font-mono font-bold">
                  {t.auditedOn} {currentCard.checkedAt}
                </span>
              </div>

              {/* Action Buttons: TTS + Hybrid AI Simplification */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimplify}
                  disabled={isSimplifying}
                  className="brutal-card-sm inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-sage-100 text-forest-900 hover:bg-sage-200 transition-all"
                >
                  {isSimplifying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.simplifying}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-forest-900" /> {t.simplifyButton}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`brutal-card-sm inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all ${
                    isSpeaking 
                      ? 'bg-amber-300 text-amber-950 border-amber-950 animate-pulse' 
                      : 'bg-cream-100 text-forest-900 hover:bg-sage-100'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" /> {t.stopButton}
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-forest-900" /> {t.listenButton}
                    </>
                  )}
                </button>
              </div>
            </div>

            <h3 className="heading-lg">
              {cardTitle}
            </h3>

            <p className="body-lead font-normal text-forest-900 pt-1">
              {cardParaphrase}
            </p>

            {/* AI Simplified View */}
            {simplifiedText && (
              <div className="p-5 bg-emerald-50/80 border-2 border-forest-900 rounded-xl space-y-2 mt-3 animate-fade-in shadow-[2px_2px_0px_0px_#0A221C]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-forest-950 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-800" /> {t.simplifiedTitle}
                  </span>
                  <span className="brutal-badge bg-emerald-200 text-emerald-950 border-forest-900 flex items-center gap-1 text-[10px] font-bold">
                    <Cpu className="w-3 h-3" /> PREFER_ON_DEVICE
                  </span>
                </div>
                <div className="body-base text-forest-900 whitespace-pre-line pt-1">
                  {simplifiedText}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-cream-50 rounded-xl border-2 border-forest-900 space-y-1 text-xs">
            <div className="font-black text-forest-950 uppercase tracking-wider">{t.scopeLabel}</div>
            <div className="text-forest-800 font-medium">{cardScope}</div>
          </div>

          {/* Source footer */}
          <div className="pt-4 border-t-2 border-forest-900/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-forest-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>{t.sourceLabel} <strong className="text-forest-950">{cardOrg}</strong></span>
            </div>

            <a
              href={currentCard.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-forest-900 hover:text-forest-950 font-black hover:underline"
            >
              {t.officialGuidelines} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-3">
            <button
              type="button"
              onClick={handlePrev}
              className="brutal-button-secondary p-3 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-forest-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t.verifiedStamp}</span>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="brutal-button p-3 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
