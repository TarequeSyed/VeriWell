import React, { useState, useEffect } from 'react';
import { Lock, HeartHandshake, Sparkles, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Send, Shield, Volume2, VolumeX } from 'lucide-react';
import { exploreBeliefOnDevice, evaluateTeachBackOnDevice } from '../services/ai/router';
import { speakTextLocally, stopSpeakingLocally } from '../services/speech';
import { BeliefResult, TeachBackResult } from '../types';
import { translations, Language } from '../i18n/translations';

interface BeliefEngineProps {
  initialClaimText?: string;
  initialEvidenceExcerpt?: string;
  lang?: Language;
}

export const BeliefEngine: React.FC<BeliefEngineProps> = ({
  initialClaimText,
  initialEvidenceExcerpt,
  lang = 'en'
}) => {
  const t = translations[lang].beliefEngine;

  const defaultClaim = lang === 'hi'
    ? "भिंडी का पानी 7 दिनों में शुगर जड़ से खत्म कर देता है और इंसुलिन छुड़वा देता है।"
    : "Natural okra water cures diabetes in 7 days and replaces prescription pills.";

  const defaultEvidence = lang === 'hi'
    ? "टाइप 2 डायबिटीज 7 दिनों में ठीक नहीं हो सकती। भिंडी पोषक हो सकती है लेकिन इंसुलिन या दवा रोकने से ब्लड शुगर खतरनाक स्तर पर बढ़ जाता है।"
    : "Type 2 diabetes cannot be cured in 7 days. While herbs provide minor dietary nutrients, abruptly stopping prescribed insulin or metformin causes dangerous glucose spikes and organ complications.";

  const defaultConcern = lang === 'hi'
    ? "मुझे रोज दवाइयां लेने से डर लगता है क्योंकि मेरे एक दोस्त ने कहा कि लंबे समय तक दवा खाने से किडनी हमेशा के लिए सड़ जाती है और डायलिसिस कराना पड़ता है।"
    : "I hate taking pills every day because my friend told me long-term medicines will permanently destroy my kidneys and make me end up on dialysis.";

  const [claimText, setClaimText] = useState(initialClaimText || defaultClaim);
  const [evidenceExcerpt, setEvidenceExcerpt] = useState(initialEvidenceExcerpt || defaultEvidence);
  const [userConcern, setUserConcern] = useState(defaultConcern);

  const [isAnalyzingConcern, setIsAnalyzingConcern] = useState(false);
  const [beliefResult, setBeliefResult] = useState<BeliefResult | null>(null);

  // Teach-back step
  const [teachBackAnswer, setTeachBackAnswer] = useState("");
  const [isEvaluatingTeachBack, setIsEvaluatingTeachBack] = useState(false);
  const [teachBackResult, setTeachBackResult] = useState<TeachBackResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeakingLocally();
    };
  }, []);

  useEffect(() => {
    if (initialClaimText) setClaimText(initialClaimText);
    else setClaimText(defaultClaim);

    if (initialEvidenceExcerpt) setEvidenceExcerpt(initialEvidenceExcerpt);
    else setEvidenceExcerpt(defaultEvidence);

    setUserConcern(defaultConcern);
    stopSpeakingLocally();
    setIsSpeaking(false);
  }, [lang, initialClaimText, initialEvidenceExcerpt]);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeakingLocally();
      setIsSpeaking(false);
    } else if (beliefResult) {
      const fullText = `${beliefResult.reply}. ${lang === 'hi' ? 'चिंतन प्रश्न' : 'Reflection question'}: ${beliefResult.teachBackQuestion}`;
      speakTextLocally(
        fullText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        lang === 'hi' ? 'hi-IN' : 'en-US'
      );
    }
  };

  const handleAnalyzeConcern = async () => {
    if (!userConcern.trim()) return;
    setIsAnalyzingConcern(true);
    setError(null);
    setBeliefResult(null);
    setTeachBackResult(null);
    stopSpeakingLocally();
    setIsSpeaking(false);

    try {
      const result = await exploreBeliefOnDevice(userConcern, claimText, evidenceExcerpt, lang);
      setBeliefResult(result);
    } catch (err: any) {
      setError(err.message || "On-device analysis error. Ensure Chrome on-device Gemini Nano is enabled.");
    } finally {
      setIsAnalyzingConcern(false);
    }
  };

  const handleEvaluateTeachBack = async () => {
    if (!teachBackAnswer.trim() || !beliefResult) return;
    setIsEvaluatingTeachBack(true);

    try {
      const result = await evaluateTeachBackOnDevice(
        teachBackAnswer,
        evidenceExcerpt,
        beliefResult.teachBackQuestion,
        lang
      );
      setTeachBackResult(result);
    } catch (err: any) {
      setError(err.message || "Teach-back evaluation error.");
    } finally {
      setIsEvaluatingTeachBack(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* On-device privacy banner - Neo-Brutalist Bio-Clinical Palette */}
      <div className="brutal-card p-6 bg-gradient-to-br from-white via-emerald-50/40 to-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-forest-900 text-cream-50 rounded-xl border-2 border-forest-950 shadow-[2px_2px_0px_0px_#0A221C] mt-1 flex-shrink-0">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="space-y-2 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="brutal-badge bg-emerald-100 text-emerald-950 border-emerald-800 font-bold">
                {t.bannerBadge}
              </span>
              <span className="eyebrow text-emerald-800 font-semibold">{t.bannerSub}</span>
              <span className="brutal-badge bg-slate-100 text-forest-800 border-forest-900/20 font-bold ml-auto text-[10px] hidden sm:inline-block">
                0 KB Cloud Egress Guaranteed
              </span>
            </div>
            <h2 className="heading-xl text-forest-950">{t.bannerTitle}</h2>
            <p className="body-base text-forest-700">
              {t.bannerDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Selected claim context */}
      <div className="brutal-card p-6 space-y-4">
        <h3 className="eyebrow flex items-center gap-2 text-forest-900">
          <Shield className="w-4 h-4 text-forest-900" /> {t.topicTitle}
        </h3>
        
        <div className="p-4 bg-cream-50 rounded-xl border-2 border-forest-900 space-y-2 text-sm">
          <div>
            <span className="font-bold text-forest-950">{t.viralClaimLabel} </span>
            <span className="text-forest-900 font-medium italic">"{claimText}"</span>
          </div>
          <div className="pt-2 border-t-2 border-forest-900/10">
            <span className="font-bold text-forest-950">{t.verifiedFactLabel} </span>
            <span className="text-forest-900 font-medium">{evidenceExcerpt}</span>
          </div>
        </div>

        {/* User concern input */}
        <div className="space-y-2 pt-2">
          <label className="block heading-sm text-forest-950">
            {t.inputLabel}
          </label>
          <p className="body-sm text-forest-700">
            {t.inputSubtitle}
          </p>
          <textarea
            rows={4}
            value={userConcern}
            onChange={(e) => setUserConcern(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full rounded-xl border-2 border-forest-900 p-4 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-900 text-sm leading-relaxed font-medium bg-cream-50/50"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleAnalyzeConcern}
            disabled={isAnalyzingConcern || !userConcern.trim()}
            className="brutal-button inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            {isAnalyzingConcern ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> {t.reflecting}
              </>
            ) : (
              <>
                <HeartHandshake className="w-4 h-4 text-emerald-400" /> {t.reflectButton}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-900 rounded-xl text-red-950 text-sm font-bold flex items-center gap-3 shadow-[2px_2px_0px_0px_#7f1d1d]">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Belief Engine Reflection Results */}
      {beliefResult && (
        <div className="space-y-6">
          <div className="brutal-card p-6 space-y-4 bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/20 border-2 border-forest-900 shadow-[4px_4px_0px_0px_#064E3B]">
            <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-forest-900/10 flex-wrap">
              <span className="eyebrow text-forest-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> {t.reflectionTitle}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className="px-3 py-1 rounded-xl border-2 border-forest-900 bg-white text-forest-900 hover:bg-emerald-50 hover:text-emerald-950 text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0F172A] transition-all"
                  title={lang === 'hi' ? 'सहानुभूतिपूर्ण सलाह सुनें' : 'Listen aloud to the empathetic advice'}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                      <span>{lang === 'hi' ? 'आवाज़ रोकें' : 'Stop Narration'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{lang === 'hi' ? 'ऑडियो सुनें (TTS)' : 'Listen Aloud (TTS)'}</span>
                    </>
                  )}
                </button>
                <span className="brutal-badge bg-emerald-100 text-emerald-950 border-emerald-900 font-bold">
                  {t.concernBadge} {beliefResult.concern.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <p className="body-lead font-bold text-forest-950 leading-relaxed">
              "{beliefResult.reply}"
            </p>

            {/* Teach-back question */}
            <div className="p-5 bg-emerald-50/70 border-2 border-forest-900 rounded-xl space-y-3 mt-4 shadow-[2px_2px_0px_0px_#0A221C]">
              <div className="flex items-center gap-2 text-forest-950 heading-sm">
                <HelpCircle className="w-5 h-5 text-emerald-800" />
                <span>{t.teachBackTitle}</span>
              </div>
              <p className="body-base italic font-medium leading-relaxed text-forest-900">
                "{beliefResult.teachBackQuestion}"
              </p>

              <div className="pt-2 space-y-3">
                <textarea
                  rows={3}
                  value={teachBackAnswer}
                  onChange={(e) => setTeachBackAnswer(e.target.value)}
                  placeholder={t.teachBackPlaceholder}
                  className="w-full rounded-xl border-2 border-forest-900 p-3 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-900 text-sm font-medium bg-white"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleEvaluateTeachBack}
                    disabled={isEvaluatingTeachBack || !teachBackAnswer.trim()}
                    className="brutal-button inline-flex items-center gap-2 px-5 py-2.5 text-xs"
                  >
                    {isEvaluatingTeachBack ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.evaluating}
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> {t.submitTeachBack}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Teach-Back Evaluation Feedback */}
          {teachBackResult && (
            <div className="brutal-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-forest-900/10">
                {teachBackResult.comprehension === 'understood' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-800" />
                )}
                <h4 className="heading-md">
                  {t.feedbackTitle} ({teachBackResult.comprehension.toUpperCase()})
                </h4>
              </div>

              <p className="body-base text-forest-900">
                {teachBackResult.explanation}
              </p>

              {teachBackResult.nextQuestion && (
                <div className="p-4 bg-cream-50 rounded-xl border-2 border-forest-900 space-y-1 shadow-[2px_2px_0px_0px_#0A221C]">
                  <span className="eyebrow text-forest-800">{t.doctorQuestionLabel}</span>
                  <p className="body-lead font-bold text-forest-950">
                    "{teachBackResult.nextQuestion}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
