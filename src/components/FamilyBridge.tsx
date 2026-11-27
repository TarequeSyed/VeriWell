import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Stethoscope, Heart, FileText, HelpCircle, PenLine } from 'lucide-react';
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
    : "boiling okra water cures diabetes in 7 days and replaces prescription pills";

  const defaultConcern = lang === 'hi'
    ? "लंबे समय तक दवा लेने से किडनी पर बुरा असर पड़ने और डायलिसिस का डर"
    : "fear of long-term prescription pill side effects on kidneys and dialysis risk";

  const concernChips = lang === 'hi' ? [
    "दवाइयों से किडनी खराब होने का डर",
    "रोज-रोज गोलियां खाने से थकान और ऊब",
    "आयुर्वेदिक/घरेलू नुस्खे बिना साइड इफेक्ट के होने की बात",
    "दवाइयों पर हमेशा के लिए निर्भर हो जाने की चिंता",
    "महीने भर की महंगी दवाओं का खर्च"
  ] : [
    "Fear of kidney damage from lifelong pills",
    "Tired of swallowing daily medications",
    "Heard natural herbs have zero side effects",
    "Anxiety about lifelong drug dependency",
    "High monthly prescription refill expenses"
  ];

  const [topicMode, setTopicMode] = useState<'preset' | 'custom'>('preset');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(evidenceCorpus[0].id);
  const [claimTopic, setClaimTopic] = useState(defaultTopic);
  const [userConcern, setUserConcern] = useState(defaultConcern);
  const [tone, setTone] = useState<'respectful' | 'casual' | 'gentle_warning'>('respectful');
  const [copiedFamily, setCopiedFamily] = useState(false);
  const [copiedDoctor, setCopiedDoctor] = useState(false);

  const selectedEvidence = evidenceCorpus.find(e => e.id === selectedEvidenceId) || evidenceCorpus[0];

  const handleSelectPreset = (id: string) => {
    setSelectedEvidenceId(id);
    const card = evidenceCorpus.find(c => c.id === id);
    if (card) {
      if (card.topic === 'diabetes') {
        setClaimTopic(lang === 'hi' ? "भिंडी का उबला पानी पीने से 7 दिनों में शुगर जड़ से खत्म हो जाती है" : "boiling okra water cures diabetes in 7 days");
      } else if (card.topic === 'hypertension') {
        setClaimTopic(lang === 'hi' ? "सेंधा नमक खाने से बिना दवाइयों के बीपी सामान्य रहता है" : "using Himalayan rock salt cures high blood pressure without pills");
      } else {
        setClaimTopic(lang === 'hi' ? (card.title_hi || card.title) : card.title);
      }
    }
  };

  const familyMessage = generateFamilyForwardMessage(claimTopic, selectedEvidence, tone, lang);
  const doctorQuestions = generateDoctorVisitChecklist(
    claimTopic,
    userConcern,
    selectedEvidence.paraphrase,
    lang
  );

  const handleCopyFamily = () => {
    navigator.clipboard.writeText(familyMessage);
    setCopiedFamily(true);
    setTimeout(() => setCopiedFamily(false), 2500);
  };

  const handleCopyDoctor = () => {
    const header = lang === 'hi' ? "डॉक्टर से पूछने योग्य सवाल:\n\n" : "Questions for My Doctor:\n\n";
    const text = header + doctorQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedDoctor(true);
    setTimeout(() => setCopiedDoctor(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro Banner */}
      <div className="brutal-card p-6 bg-gradient-to-br from-white via-slate-50 to-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-forest-900 text-cream-50 rounded-xl border-2 border-forest-950 shadow-[2px_2px_0px_0px_#0A221C] mt-1 flex-shrink-0">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="brutal-badge bg-emerald-100 text-emerald-950 border-emerald-800 font-bold">
                FAMILY HARMONY & CLINICIAN BRIDGE
              </span>
            </div>
            <h2 className="heading-xl text-forest-950">{t.title}</h2>
            <p className="body-base text-forest-700">
              {t.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Custom Topic & Personal Thoughts Workspace */}
      <div className="brutal-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-forest-900/10 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-emerald-700" />
            <h3 className="heading-md text-forest-950">
              {lang === 'hi' ? 'विषय और अपने निजी विचार दर्ज करें' : 'Configure Topic & Your Personal Thoughts'}
            </h3>
          </div>
          {/* Preset vs Custom Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-forest-900/20 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTopicMode('preset')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                topicMode === 'preset'
                  ? 'bg-forest-900 text-white shadow-sm font-black'
                  : 'text-forest-700 hover:text-forest-950'
              }`}
            >
              {lang === 'hi' ? 'क्लीनिकल प्रिसेट्स' : 'Clinical Presets'}
            </button>
            <button
              type="button"
              onClick={() => setTopicMode('custom')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                topicMode === 'custom'
                  ? 'bg-forest-900 text-white shadow-sm font-black'
                  : 'text-forest-700 hover:text-forest-950'
              }`}
            >
              {lang === 'hi' ? 'कस्टम विषय / विचार' : 'Custom Health Topic'}
            </button>
          </div>
        </div>

        {/* Topic Input Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicMode === 'preset' ? (
            <div className="space-y-2 text-xs">
              <label className="font-bold text-forest-950">{t.selectTopic}</label>
              <select
                value={selectedEvidenceId}
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-forest-900 bg-white text-forest-900 text-xs font-medium focus:ring-2 focus:ring-forest-900 shadow-sm"
              >
                {evidenceCorpus.map((card) => (
                  <option key={card.id} value={card.id}>
                    {(lang === 'hi' && card.title_hi) ? card.title_hi : card.title} ({(lang === 'hi' && card.organization_hi) ? card.organization_hi : card.organization})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <label className="font-bold text-forest-950">
                {lang === 'hi' ? 'वायरल दावा / नुस्खा जो आपने देखा या सुना:' : 'Viral Health Claim / Forward You Received:'}
              </label>
              <input
                type="text"
                value={claimTopic}
                onChange={(e) => setClaimTopic(e.target.value)}
                placeholder={lang === 'hi' ? 'उदा. अमरूद के पत्ते उबालकर पीने से शुगर हमेशा के लिए खत्म...' : 'e.g., Boiling guava leaves cures arthritis and lowers blood sugar in 10 days...'}
                className="w-full p-2.5 rounded-xl border-2 border-forest-900 bg-white text-forest-900 text-xs font-medium focus:ring-2 focus:ring-forest-900 shadow-sm"
              />
            </div>
          )}

          {/* Claim Summary */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-forest-950">{t.topicSummary}</label>
            <input
              type="text"
              value={claimTopic}
              onChange={(e) => setClaimTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border-2 border-forest-900 bg-white text-forest-900 text-xs font-medium focus:ring-2 focus:ring-forest-900 shadow-sm"
            />
          </div>
        </div>

        {/* User's Personal Thoughts / Doubts / Hesitations Input */}
        <div className="space-y-2 pt-2">
          <label className="font-bold text-forest-950 text-xs flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {lang === 'hi'
                ? 'डॉक्टर से पूछने के लिए अपने निजी विचार, डर या शंकाएं:'
                : 'Your Personal Doubts, Fears, or Thoughts to Address with the Doctor:'}
            </span>
          </label>
          <textarea
            rows={2}
            value={userConcern}
            onChange={(e) => setUserConcern(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'आप या आपके परिवार वाले दवाइयों या इलाज को लेकर किस बात से चिंतित हैं...'
                : 'What makes you or your loved one anxious or hesitant about treatment (e.g., kidney strain, side effects, pill fatigue)?'
            }
            className="w-full rounded-xl border-2 border-forest-900 p-3 text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-900 text-xs font-medium bg-cream-50/50 leading-relaxed shadow-sm"
          />

          {/* Quick thought chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[10px] font-bold text-forest-600 mr-1">
              {lang === 'hi' ? 'त्वरित विचार चुनें:' : 'Quick Prompts:'}
            </span>
            {concernChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setUserConcern(chip)}
                className="text-[10px] px-2.5 py-1 rounded-lg border border-forest-900/20 bg-white text-forest-800 hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-950 transition-colors font-medium shadow-sm"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Forward Generator */}
        <div className="brutal-card p-6 space-y-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_#0A221C]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-forest-900/10">
              <Share2 className="w-5 h-5 text-emerald-700" />
              <h3 className="heading-md text-forest-950">{t.whatsappTitle}</h3>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-forest-950">{t.toneLabel}</label>
              <div className="flex gap-2">
                {(['respectful', 'casual', 'gentle_warning'] as const).map((toneKey) => (
                  <button
                    key={toneKey}
                    type="button"
                    onClick={() => setTone(toneKey)}
                    className={`px-3 py-1.5 rounded-xl border-2 border-forest-900 text-xs font-bold transition-all ${
                      tone === toneKey
                        ? 'bg-forest-900 text-cream-50 shadow-[2px_2px_0px_0px_#0A221C]'
                        : 'bg-cream-100 text-forest-900 hover:bg-sage-100'
                    }`}
                  >
                    {t.tones[toneKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview */}
            <div className="p-4 rounded-xl bg-cream-50 border-2 border-forest-900 text-xs text-forest-900 font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto shadow-[2px_2px_0px_0px_#0A221C]">
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
        <div className="brutal-card p-6 space-y-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_#0A221C]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-forest-900/10">
              <Stethoscope className="w-5 h-5 text-emerald-800" />
              <h3 className="heading-md text-forest-950">{t.clinicianTitle}</h3>
            </div>

            <p className="body-sm text-forest-800">
              {t.clinicianDesc}
            </p>

            <div className="space-y-3 pt-1">
              {doctorQuestions.map((q, idx) => (
                <div key={idx} className="p-3.5 bg-cream-50 border-2 border-forest-900 rounded-xl space-y-1 shadow-[2px_2px_0px_0px_#0A221C]">
                  <div className="eyebrow flex items-center gap-1 text-forest-800">
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
