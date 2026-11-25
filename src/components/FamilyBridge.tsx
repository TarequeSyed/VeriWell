import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Stethoscope, Heart, FileText } from 'lucide-react';
import { generateFamilyForwardMessage, generateDoctorVisitChecklist } from '../services/ai/familyBridge';
import { evidenceCorpus } from '../services/evidence';
import { translations, Language } from '../i18n/translations';

interface FamilyBridgeProps {
  lang?: Language;
}

export const FamilyBridge: React.FC<FamilyBridgeProps> = ({ lang = 'en' }) => {
  const t = translations[lang].familyBridge;

  const defaultTopic = lang === 'hi'
    ? "भिंडी का उबला पानी पीने से 7 दिनों में शुगर जड़ से खत्म हो जाती है"
    : "boiling okra water cures diabetes in 7 days";

  const defaultConcern = lang === 'hi'
    ? "लंबे समय तक दवा लेने से किडनी पर बुरा असर पड़ने का डर"
    : "fear of long-term medication side effects on kidneys";

  const [selectedEvidenceId, setSelectedEvidenceId] = useState(evidenceCorpus[0].id);
  const [claimTopic, setClaimTopic] = useState(defaultTopic);
  const [tone, setTone] = useState<'respectful' | 'casual' | 'gentle_warning'>('respectful');
  const [copiedFamily, setCopiedFamily] = useState(false);
  const [copiedDoctor, setCopiedDoctor] = useState(false);

  const selectedEvidence = evidenceCorpus.find(e => e.id === selectedEvidenceId) || evidenceCorpus[0];
  const familyMessage = generateFamilyForwardMessage(claimTopic, selectedEvidence, tone, lang);
  const doctorQuestions = generateDoctorVisitChecklist(
    claimTopic,
    defaultConcern,
    selectedEvidence.paraphrase,
    lang
  );

  const handleCopyFamily = () => {
    navigator.clipboard.writeText(familyMessage);
    setCopiedFamily(true);
    setTimeout(() => setCopiedFamily(false), 2500);
  };

  const handleCopyDoctor = () => {
    const text = (lang === 'hi' ? `डॉक्टर से पूछने योग्य सवाल:\n\n` : `Questions for My Doctor:\n\n`) + doctorQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedDoctor(true);
    setTimeout(() => setCopiedDoctor(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro Banner */}
      <div className="brutal-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-forest-900 text-cream-50 rounded-xl border-2 border-forest-950 shadow-[2px_2px_0px_0px_#0F2923] mt-1">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-forest-900 tracking-tight">{t.title}</h2>
            <p className="text-forest-800 text-sm leading-relaxed font-medium">
              {t.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Forward Generator */}
        <div className="brutal-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-forest-900/10">
              <Share2 className="w-5 h-5 text-emerald-800" />
              <h3 className="font-black text-forest-900 text-lg">{t.whatsappTitle}</h3>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-forest-900">{t.selectTopic}</label>
              <select
                value={selectedEvidenceId}
                onChange={(e) => setSelectedEvidenceId(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-forest-900 bg-white text-forest-900 text-xs font-medium focus:ring-2 focus:ring-forest-900"
              >
                {evidenceCorpus.map((card) => (
                  <option key={card.id} value={card.id}>
                    {(lang === 'hi' && card.title_hi) ? card.title_hi : card.title} ({(lang === 'hi' && card.organization_hi) ? card.organization_hi : card.organization})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-forest-900">{t.topicSummary}</label>
              <input
                type="text"
                value={claimTopic}
                onChange={(e) => setClaimTopic(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-forest-900 bg-white text-forest-900 text-xs font-medium focus:ring-2 focus:ring-forest-900"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-forest-900">{t.toneLabel}</label>
              <div className="flex gap-2">
                {(['respectful', 'casual', 'gentle_warning'] as const).map((toneKey) => (
                  <button
                    key={toneKey}
                    type="button"
                    onClick={() => setTone(toneKey)}
                    className={`px-3 py-1.5 rounded-xl border-2 border-forest-900 text-xs font-bold transition-all ${
                      tone === toneKey
                        ? 'bg-forest-900 text-cream-50 shadow-[2px_2px_0px_0px_#0F2923]'
                        : 'bg-cream-100 text-forest-900 hover:bg-sage-100'
                    }`}
                  >
                    {t.tones[toneKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview */}
            <div className="p-4 rounded-xl bg-cream-50 border-2 border-forest-900 text-xs text-forest-900 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto shadow-[2px_2px_0px_0px_#0F2923]">
              {familyMessage}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyFamily}
              className="brutal-button w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs"
            >
              {copiedFamily ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> {t.copyWhatsapp}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Doctor Visit Checklist */}
        <div className="brutal-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-forest-900/10">
              <Stethoscope className="w-5 h-5 text-forest-900" />
              <h3 className="font-black text-forest-900 text-lg">{t.clinicianTitle}</h3>
            </div>

            <p className="text-xs text-forest-800 leading-relaxed font-medium">
              {t.clinicianDesc}
            </p>

            <div className="space-y-3 pt-1">
              {doctorQuestions.map((q, idx) => (
                <div key={idx} className="p-3.5 bg-cream-50 border-2 border-forest-900 rounded-xl space-y-1 shadow-[2px_2px_0px_0px_#0F2923]">
                  <div className="text-[11px] font-black uppercase tracking-wider text-forest-800 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-600 inline" /> {lang === 'hi' ? `सवाल ${idx + 1}:` : `Question ${idx + 1}:`}
                  </div>
                  <p className="text-forest-950 text-xs italic font-medium leading-relaxed">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyDoctor}
              className="brutal-button-secondary w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs"
            >
              {copiedDoctor ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" /> {t.copiedDoctor}
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" /> {t.copyDoctor}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
