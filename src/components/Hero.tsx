import React from 'react';
import { Shield, Lock, Users, Cpu, Cloud, ArrowRight, Sparkles, BookOpen, GitFork } from 'lucide-react';
import { Language } from '../i18n/translations';

interface HeroProps {
  lang: Language;
  onNavigate: (tab: 'claim-lab' | 'belief-engine' | 'family-bridge' | 'stories' | 'monitor') => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const isHindi = lang === 'hi';

  const headline = isHindi
    ? 'व्हाट्सऐप की झूठी स्वास्थ्य जानकारी को\nAI से उजागर करें'
    : 'Stop Health Misinformation\nBefore it Harms Your Family';

  const subline = isHindi
    ? 'VeriWell Gemini Nano (ऑन-डिवाइस) और Firebase AI Logic दोनों का उपयोग करता है — पर जब बात आपकी व्यक्तिगत चिंताओं की हो, तो कोई भी डेटा आपके डिवाइस से बाहर नहीं जाता।'
    : 'VeriWell uses both Gemini Nano on your device and Firebase AI Logic in the cloud — switching automatically so your personal health concerns never leave your device.';

  const features = [
    {
      icon: Shield,
      color: 'bg-emerald-50 border-forest-900 text-forest-900',
      iconColor: 'text-emerald-800',
      tab: 'claim-lab' as const,
      title: isHindi ? 'क्लेम लैब' : 'Claim Lab',
      desc: isHindi
        ? 'वायरल दावों को क्लाउड AI से वेरिफाई करें'
        : 'Verify viral health claims with cloud AI',
      badge: isHindi ? 'क्लाउड AI' : 'Cloud AI',
      badgeColor: 'bg-sky-100 text-sky-950 border-sky-900',
    },
    {
      icon: Lock,
      color: 'bg-forest-900 border-forest-950 text-cream-50',
      iconColor: 'text-cream-50',
      tab: 'belief-engine' as const,
      title: isHindi ? 'बिलीफ इंजन' : 'Belief Engine',
      desc: isHindi
        ? 'निजी चिंताएं — ऑन-डिवाइस Gemini Nano'
        : 'Private health concerns processed only on your device',
      badge: isHindi ? 'ऑन-डिवाइस' : 'On-Device',
      badgeColor: 'bg-emerald-400 text-emerald-950 border-emerald-900',
    },
    {
      icon: Users,
      color: 'bg-sage-50 border-forest-900 text-forest-900',
      iconColor: 'text-forest-800',
      tab: 'family-bridge' as const,
      title: isHindi ? 'फैमिली ब्रिज' : 'Family Bridge',
      desc: isHindi
        ? 'परिवार के लिए सुधारात्मक WhatsApp संदेश'
        : 'Generate corrective messages for family WhatsApp groups',
      badge: isHindi ? 'AI संदेश' : 'AI Message',
      badgeColor: 'bg-sage-200 text-forest-950 border-forest-900',
    },
  ];

  const stats = [
    { value: '2+', label: isHindi ? 'AI मोड' : 'AI Modes' },
    { value: '5', label: isHindi ? 'WHO स्रोत' : 'WHO Sources' },
    { value: '0KB', label: isHindi ? 'प्राइवेट डेटा' : 'Private Data Sent' },
    { value: '100%', label: isHindi ? 'ओपन सोर्स' : 'Open Source' },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Hero headline block */}
      <div className="brutal-card p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Ambient green glow */}
        <div className="absolute inset-0 ambient-glow pointer-events-none" aria-hidden="true" />

        {/* Hackathon badge row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="brutal-badge bg-forest-900 text-cream-50 border-forest-950 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            #BuildHybridAI 2026
          </span>
          <span className="brutal-badge bg-sage-200 text-forest-950 border-forest-900 flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            {isHindi ? 'ऑन-डिवाइस Gemini Nano' : 'On-Device · Gemini Nano'}
          </span>
          <span className="brutal-badge bg-sky-100 text-sky-950 border-sky-900 flex items-center gap-1.5">
            <Cloud className="w-3 h-3" />
            {isHindi ? 'Firebase AI Logic' : 'Firebase AI Logic'}
          </span>
        </div>

        <h2 className="heading-display mb-5 whitespace-pre-line">
          {headline}
        </h2>

        <p className="body-lead max-w-2xl mb-8">
          {subline}
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('claim-lab')}
            className="brutal-button inline-flex items-center gap-2 px-6 py-3 text-sm shadow-[3px_3px_0px_0px_#0A221C]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {isHindi ? 'वेरिफाई करें' : 'Verify a Claim'}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('belief-engine')}
            className="brutal-button-emerald inline-flex items-center gap-2 px-6 py-3 text-sm shadow-[3px_3px_0px_0px_#0A221C]"
          >
            <Lock className="w-4 h-4 text-forest-950" />
            {isHindi ? 'निजी चिंता' : 'Private Concern'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('stories')}
            className="brutal-button-secondary inline-flex items-center gap-2 px-6 py-3 text-sm shadow-[3px_3px_0px_0px_#0A221C]"
          >
            <BookOpen className="w-4 h-4 text-forest-900" />
            {isHindi ? 'WHO तथ्य' : 'WHO Facts'}
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="brutal-card-sm p-4 text-center shadow-[2px_2px_0px_0px_#0A221C]">
            <div className="text-3xl font-mono font-black text-forest-950">{s.value}</div>
            <div className="eyebrow mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature triptych */}
      <div>
        <h3 className="eyebrow mb-4">
          {isHindi ? 'तीन शक्तिशाली टूल्स — एक हाइब्रिड सिस्टम' : 'Three powerful tools — one hybrid system'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            const isInverse = f.tab === 'belief-engine';
            return (
              <button
                key={f.tab}
                type="button"
                onClick={() => onNavigate(f.tab)}
                className={`brutal-card p-6 text-left space-y-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0A221C] transition-all shadow-[4px_4px_0px_0px_#0A221C] ${f.color}`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-7 h-7 ${f.iconColor}`} />
                  <span className={`brutal-badge text-[10px] ${f.badgeColor}`}>{f.badge}</span>
                </div>
                <div>
                  <div className={`heading-md leading-tight ${isInverse ? 'text-cream-50' : 'text-forest-950'}`}>
                    {f.title}
                  </div>
                  <p className={`text-sm font-medium mt-1 leading-relaxed ${isInverse ? 'text-sage-200' : 'text-forest-800'}`}>
                    {f.desc}
                  </p>
                </div>
                <div className={`text-xs font-black flex items-center gap-1 ${isInverse ? 'text-sage-300' : 'text-forest-700'}`}>
                  {isHindi ? 'खोलें' : 'Open'} <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hybrid routing explanation */}
      <div className="brutal-card p-6 bg-cream-50 space-y-4 shadow-[4px_4px_0px_0px_#0A221C]">
        <h3 className="heading-lg flex items-center gap-2">
          <GitFork className="w-5 h-5 text-emerald-800" />
          {isHindi ? 'हाइब्रिड AI रूटिंग कैसे काम करती है?' : 'How Hybrid AI Routing Works'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-white border-2 border-forest-900 rounded-xl space-y-2 shadow-[2px_2px_0px_0px_#0A221C]">
            <div className="heading-sm flex items-center gap-2 text-forest-950">
              <Cpu className="w-4 h-4 text-emerald-800" />
              {isHindi ? 'ऑन-डिवाइस · Gemini Nano' : 'On-Device · Gemini Nano'}
            </div>
            <ul className="text-forest-800 font-medium space-y-1 text-xs list-disc list-inside">
              {isHindi ? (
                <>
                  <li>व्यक्तिगत स्वास्थ्य चिंताएं</li>
                  <li>Teach-Back मूल्यांकन</li>
                  <li>सरल व्याख्याएं (ऑफलाइन)</li>
                  <li>कोई डेटा डिवाइस से बाहर नहीं</li>
                </>
              ) : (
                <>
                  <li>Personal health concerns</li>
                  <li>Teach-back comprehension checks</li>
                  <li>Offline evidence simplification</li>
                  <li>Zero bytes leave your device</li>
                </>
              )}
            </ul>
          </div>
          <div className="p-4 bg-white border-2 border-forest-900 rounded-xl space-y-2 shadow-[2px_2px_0px_0px_#0F2923]">
            <div className="flex items-center gap-2 font-black text-forest-950">
              <Cloud className="w-4 h-4 text-sky-800" />
              {isHindi ? 'क्लाउड · Firebase AI Logic' : 'Cloud · Firebase AI Logic'}
            </div>
            <ul className="text-forest-800 font-medium space-y-1 text-xs list-disc list-inside">
              {isHindi ? (
                <>
                  <li>वायरल दावों की जांच</li>
                  <li>छवि / स्क्रीनशॉट विश्लेषण</li>
                  <li>परिवार संदेश निर्माण</li>
                  <li>मल्टी-मोडल सामग्री</li>
                </>
              ) : (
                <>
                  <li>Viral public health claims</li>
                  <li>Screenshot & image analysis</li>
                  <li>Family counter-message generation</li>
                  <li>Multimodal content (images)</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
