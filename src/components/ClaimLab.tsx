import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, XCircle, HelpCircle, Sparkles, Lock, RefreshCw, Image as ImageIcon, Type, Upload } from 'lucide-react';
import { verifyPublicClaimsCloud, verifyPublicImageCloud } from '../services/ai/router';
import { ClaimResult } from '../types';
import { translations, Language } from '../i18n/translations';

interface ClaimLabProps {
  onSelectClaimForBelief: (claimText: string, evidenceExcerpt: string) => void;
  lang?: Language;
}

export const ClaimLab: React.FC<ClaimLabProps> = ({ onSelectClaimForBelief, lang = 'en' }) => {
  const t = translations[lang].claimLab;
  const sampleForwards = translations[lang].sampleForwards;

  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [inputText, setInputText] = useState(sampleForwards[0].text);
  
  // Synchronize sample when language switches
  useEffect(() => {
    setInputText(sampleForwards[0].text);
  }, [lang]);

  // Image upload state
  const [selectedImage, setSelectedImage] = useState<{ base64: string; mimeType: string; previewUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasConsented, setHasConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    claims: Array<{ id: string; text: string; excerpt: string; safetyFlag: boolean; result: ClaimResult }>;
    overallSummary: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload a valid image file (PNG, JPG, or WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setSelectedImage({
        base64: base64Data,
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file),
      });
      setAnalysis(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (inputMode === 'text' && !inputText.trim()) return;
    if (inputMode === 'image' && !selectedImage) return;

    if (!hasConsented) {
      alert(t.privacyCheckDesc);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (inputMode === 'image' && selectedImage) {
        result = await verifyPublicImageCloud(selectedImage.base64, selectedImage.mimeType);
      } else {
        result = await verifyPublicClaimsCloud(inputText);
      }
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "Failed to analyze claim. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'contradicted':
        return (
          <span className="brutal-badge bg-red-100 text-red-950 border-red-900 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> {t.verdicts.contradicted}
          </span>
        );
      case 'misleading':
        return (
          <span className="brutal-badge bg-amber-100 text-amber-950 border-amber-900 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> {t.verdicts.misleading}
          </span>
        );
      case 'supported':
        return (
          <span className="brutal-badge bg-emerald-100 text-emerald-950 border-emerald-900 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t.verdicts.supported}
          </span>
        );
      default:
        return (
          <span className="brutal-badge bg-gray-100 text-gray-900 border-gray-900 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> {t.verdicts.insufficient}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro banner */}
      <div className="brutal-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-forest-900 text-cream-50 rounded-xl border-2 border-forest-950 shadow-[2px_2px_0px_0px_#0F2923] mt-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-forest-900 tracking-tight">{t.title}</h2>
            <p className="text-forest-800 text-sm leading-relaxed font-medium">
              {t.description}
            </p>
          </div>
        </div>

        {/* Quick sample chips */}
        <div className="mt-5 pt-4 border-t-2 border-forest-900/10">
          <div className="text-xs font-black uppercase tracking-wider text-forest-800 mb-2">{t.trySample}</div>
          <div className="flex flex-wrap gap-2">
            {sampleForwards.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(s.text);
                  setAnalysis(null);
                }}
                className="brutal-card-sm text-xs font-bold px-3 py-1.5 hover:bg-sage-100 transition-colors"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="brutal-card p-6 space-y-4">
        {/* Input Mode Selector */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-forest-900/10">
          <label className="text-sm font-bold text-forest-900">
            {t.inputFormat}
          </label>
          <div className="flex items-center gap-1.5 bg-cream-100 p-1 rounded-xl border-2 border-forest-900 text-xs font-bold">
            <button
              type="button"
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                inputMode === 'text' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'
              }`}
            >
              <Type className="w-3.5 h-3.5" /> {t.textMode}
            </button>
            <button
              type="button"
              onClick={() => setInputMode('image')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                inputMode === 'image' ? 'bg-forest-900 text-cream-50' : 'text-forest-800 hover:text-forest-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> {t.imageMode}
            </button>
          </div>
        </div>

        {inputMode === 'text' ? (
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.textPlaceholder}
            className="w-full rounded-xl border-2 border-forest-900 p-4 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-800 text-sm leading-relaxed font-medium bg-cream-50/50"
          />
        ) : (
          <div className="space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {selectedImage ? (
              <div className="relative rounded-xl border-2 border-forest-900 p-3 bg-cream-50 flex flex-col items-center gap-3">
                <img
                  src={selectedImage.previewUrl}
                  alt="Uploaded forwarded claim screenshot"
                  className="max-h-64 rounded-lg object-contain border-2 border-forest-900 shadow-[2px_2px_0px_0px_#0F2923]"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-forest-900 font-bold underline hover:text-forest-700"
                >
                  {t.changeScreenshot}
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-forest-900/40 rounded-xl p-8 text-center cursor-pointer hover:border-forest-900 bg-cream-50/70 transition-colors space-y-2"
              >
                <Upload className="w-8 h-8 text-forest-700 mx-auto" />
                <div className="text-sm font-bold text-forest-900">
                  {t.uploadTitle}
                </div>
                <div className="text-xs text-forest-700 font-medium">
                  {t.uploadSubtitle}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Privacy consent checkbox */}
        <div className="p-4 bg-sage-50 border-2 border-forest-900 rounded-xl flex items-start gap-3">
          <input
            id="consent-checkbox"
            type="checkbox"
            checked={hasConsented}
            onChange={(e) => setHasConsented(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-2 border-forest-900 text-forest-900 focus:ring-forest-900 cursor-pointer"
          />
          <label htmlFor="consent-checkbox" className="text-xs text-forest-900 leading-relaxed cursor-pointer font-medium">
            <span className="font-black text-forest-950">{t.privacyCheckTitle} </span>
            {t.privacyCheckDesc}
          </label>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading || !hasConsented || (inputMode === 'text' && !inputText.trim()) || (inputMode === 'image' && !selectedImage)}
            className="brutal-button inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> {t.verifying}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> {t.verifyButton}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-900 rounded-xl text-red-950 text-sm font-bold flex items-center gap-3 shadow-[2px_2px_0px_0px_#7f1d1d]">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results view */}
      {analysis && (
        <div className="space-y-6">
          <div className="brutal-card p-6 bg-sage-100">
            <h3 className="font-black text-forest-900 text-lg mb-1">{t.summaryTitle}</h3>
            <p className="text-forest-900 text-sm leading-relaxed font-medium">{analysis.overallSummary}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-forest-900 text-xl tracking-tight">{t.individualTitle} ({analysis.claims.length})</h3>
            
            {analysis.claims.map((claim) => (
              <div 
                key={claim.id}
                className="brutal-card p-6 space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-forest-900/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-forest-700">{t.extractedClaim}</span>
                    <span className="font-bold text-forest-900 text-sm">{claim.text}</span>
                  </div>
                  {getVerdictBadge(claim.result.verdict)}
                </div>

                {claim.safetyFlag && (
                  <div className="p-3 bg-red-100 border-2 border-red-900 rounded-xl flex items-center gap-2 text-xs font-bold text-red-950">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{t.highRiskWarning}</span>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="text-forest-900 leading-relaxed font-medium">
                    <span className="font-black text-forest-950">{t.evidenceAssessment} </span>
                    {claim.result.rationale}
                  </div>

                  {claim.result.caveat && (
                    <div className="text-forest-900 text-xs italic bg-amber-50 p-3 rounded-lg border-2 border-amber-900/30 font-medium">
                      <span className="font-black not-italic text-amber-950">{t.clinicalNuance} </span>
                      {claim.result.caveat}
                    </div>
                  )}

                  <div className="text-forest-900 pt-1 font-medium">
                    <span className="font-black text-forest-950">{t.safeNextStep} </span>
                    {claim.result.nextStep}
                  </div>
                </div>

                {/* Evidence citations */}
                {claim.result.evidenceIds.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2 items-center text-xs">
                    <span className="text-forest-800 font-bold">{t.sourcesCited}</span>
                    {claim.result.evidenceIds.map((id) => (
                      <span key={id} className="brutal-badge bg-sage-200 text-forest-950 border-forest-900">
                        {id}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button to explore in private Belief Engine */}
                <div className="pt-4 border-t-2 border-forest-900/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSelectClaimForBelief(claim.text, claim.result.rationale)}
                    className="brutal-button-secondary inline-flex items-center gap-2 px-4 py-2 text-xs"
                  >
                    <Lock className="w-3.5 h-3.5 text-forest-900" /> {t.discussInBelief}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
