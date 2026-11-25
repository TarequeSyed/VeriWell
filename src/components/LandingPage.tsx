import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Lock,
  Cpu,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Users,
  Activity,
  BookOpen,
  Flame
} from 'lucide-react';
import { Language } from '../i18n/translations';

interface LandingPageProps {
  lang: Language;
  onGetStarted: () => void;
  onJudgeDirectLaunch: () => void;
  onExploreStories: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onGetStarted,
  onJudgeDirectLaunch,
  onExploreStories,
}) => {
  const isHindi = lang === 'hi';
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  const features = [
    {
      id: 'claim-lab',
      tag: 'ONLY_IN_CLOUD',
      icon: Shield,
      title: isHindi ? '01 / पब्लिक क्लेम लैब' : '01 / Public Claim Lab',
      headline: isHindi
        ? 'मल्टी-मोडल स्क्रीनशॉट और टेक्स्ट फॉरवर्ड विश्लेषण'
        : 'Multimodal Screenshot & Text Claim Verification',
      description: isHindi
        ? 'व्हाट्सएप पर वायरल नुस्खे या स्क्रीनशॉट ड्रॉप करें। Firebase AI Logic क्लाउड मॉडल (Gemini 3.5 Flash-Lite) द्वारा WHO व NIDDK के मेडिकल दस्तावेजों से सटीक मिलान करता है।'
        : 'Drop viral WhatsApp screenshots or forwarded messages. Firebase AI Logic in the cloud extracts structured claims and cross-references them against official WHO and NIDDK guidelines.',
      stats: isHindi ? 'मल्टीमोडल ओसीआर · सेकंड्स में नतीजा' : 'Multimodal Vision · Citation Guard',
      color: 'bg-sky-50 border-sky-900',
      badgeColor: 'bg-sky-100 text-sky-950 border-sky-900',
    },
    {
      id: 'belief-engine',
      tag: 'ONLY_ON_DEVICE',
      icon: Lock,
      title: isHindi ? '02 / द बिलीफ इंजन' : '02 / The Belief Engine',
      headline: isHindi
        ? '100% निजी ऑन-डिवाइस जेमिनी नैनो सहानुभूति संवाद'
        : '100% On-Device Empathetic Reflection on Gemini Nano',
      description: isHindi
        ? 'मरीज अक्सर दवाइयों के साइड-इफेक्ट्स या डर के कारण नीम-हकीम के दावों पर विश्वास करते हैं। Chrome LanguageModel API आपके निजी विचारों को शून्य नेटवर्क लीकेज के साथ डिवाइस पर ही समझता है।'
        : 'Users fall for fake cures because of unaddressed fears. Chrome Built-in Prompt API processes patient hesitations locally on-device — zero bytes ever leave the hardware.',
      stats: isHindi ? '0KB क्लाउड डेटा · स्थानीय क्रोम नैनो' : '0KB Sent to Cloud · Chrome Prompt API',
      color: 'bg-emerald-50 border-emerald-950',
      badgeColor: 'bg-emerald-300 text-emerald-950 border-emerald-950',
    },
    {
      id: 'family-bridge',
      tag: 'HYBRID',
      icon: Users,
      title: isHindi ? '03 / फैमिली ब्रिज व डॉक्टर चेकलिस्ट' : '03 / Family Bridge & Doctor Visit Prep',
      headline: isHindi
        ? 'पारिवारिक व्हाट्सएप संदेश व क्लिनिकल प्रश्न पत्र'
        : 'Culturally Respectful WhatsApp Counter-Forwards',
      description: isHindi
        ? 'बिना बड़ों का अपमान किए गलत जानकारी सुधारने के लिए शिष्ट पारिवारिक संदेश तैयार करता है। साथ ही डॉक्टर की अगली मुलाकात में पूछने योग्य सटीक सवालों की सूची देता है।'
        : 'Generate non-confrontational messages tailored for family WhatsApp groups, plus a personalized clinician consultation card so patients make the most of limited doctor appointments.',
      stats: isHindi ? '3 टोन विकल्प · 1-क्लिक कॉपी' : '3 Conversation Tones · Clinician Card',
      color: 'bg-amber-50 border-amber-950',
      badgeColor: 'bg-amber-200 text-amber-950 border-amber-950',
    },
    {
      id: 'stories',
      tag: 'PREFER_ON_DEVICE',
      icon: BookOpen,
      title: isHindi ? '04 / प्रमाणित स्वास्थ्य कहानियां व लोकल TTS' : '04 / Audited Evidence Stories & Local TTS',
      headline: isHindi
        ? 'सरल भाषा में तथ्य और ब्राउज़र ऑन-डिवाइस ऑडियो'
        : 'Bite-Sized WHO Clinical Facts & Local Speech Synthesis',
      description: isHindi
        ? 'WHO और NIDDK द्वारा प्रमाणित तथ्य कार्ड। PREFER_ON_DEVICE मोड से एआई इन तथ्यों को सरल बुलेट बिंदुओं में बदलता है, और ब्राउज़र का लोकल TTS बिना किसी क्लाउड ऑडियो के पढ़कर सुनाता है।'
        : 'Audited facts explaining diabetes and hypertension in everyday language. Features PREFER_ON_DEVICE hybrid plain-language breakdown and on-device browser TTS narration.',
      stats: isHindi ? 'द्विभाषी (EN+HI) · शून्य ऑडियो शुल्क' : 'Bilingual · 0 Cloud Audio Egress',
      color: 'bg-purple-50 border-purple-950',
      badgeColor: 'bg-purple-200 text-purple-950 border-purple-950',
    },
    {
      id: 'monitor',
      tag: 'OBSERVABILITY',
      icon: Activity,
      title: isHindi ? '05 / लाइव हाइब्रिड टेलीमेट्री व ऑफलाइन सिम्युलेटर' : '05 / Live Hybrid Telemetry & Offline Sim',
      headline: isHindi
        ? 'जज हेतु वास्तविक समय लेटेंसी व नेटवर्क फॉलबैक ट्रैकर'
        : 'Real-Time Routing Observability & 1-Click Offline Simulator',
      description: isHindi
        ? 'जजों के लिए विशेष रूप से डिज़ाइन किया गया टेलीमेट्री डैशबोर्ड: वास्तविक समय लेटेंसी (ms), निष्पादन स्रोत (क्लाउड बनाम ऑन-डिवाइस), और वाई-फाई बंद किए बिना ऑफलाइन लचीलेपन की जांच।'
        : 'Engineered specifically for hackathon judges: inspect exact execution latency, verify whether an inference resolved on-device or in cloud, and simulate network outages with 1 click.',
      stats: isHindi ? 'मिलीसेकंड लेटेंसी · फायरबेस ट्रेस' : 'Real-time Latency · Firestore Log',
      color: 'bg-sage-50 border-forest-900',
      badgeColor: 'bg-sage-200 text-forest-950 border-forest-900',
    },
  ];

  const currentFeature = features[activeFeatureTab];

  return (
    <div className="space-y-16 max-w-6xl mx-auto pb-12">
      {/* ─── Awwwards Marquee Ribbon ─── */}
      <div className="overflow-hidden bg-forest-900 text-cream-50 border-y-2 border-forest-950 py-2.5 shadow-[2px_2px_0px_0px_#0F2923]">
        <div className="flex items-center gap-8 whitespace-nowrap text-xs font-mono font-black uppercase tracking-widest animate-marquee">
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            #BuildHybridAI 2026 Grand Prize Submission
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            Chrome Built-in Gemini Nano On-Device
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-sky-400" />
            Firebase AI Logic Gemini 3.5 Flash-Lite
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-300" />
            Zero-Knowledge Privacy Sanctum
          </span>
          <span>•</span>
          <span>WHO & NIDDK Audited Evidence Corpus</span>
          <span>•</span>
          <span>100% Apache-2.0 Open Source</span>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative brutal-card p-8 sm:p-12 md:p-16 overflow-hidden bg-white">
        <div className="absolute inset-0 ambient-glow pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          {/* Top Pill / Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="brutal-badge bg-forest-900 text-cream-50 border-forest-950 flex items-center gap-1.5 shadow-[1px_1px_0px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              #BuildHybridAI 2026
            </span>
            <span className="brutal-badge bg-emerald-200 text-emerald-950 border-emerald-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Chrome 157+ Gemini Nano Available
            </span>
            <span className="brutal-badge bg-sky-100 text-sky-950 border-sky-900">
              Firebase AI Logic Hybrid SDK
            </span>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-forest-950 tracking-tight leading-[1.05] whitespace-pre-line">
              {isHindi ? (
                <>
                  स्वास्थ्य सत्य,<br />
                  <span className="underline decoration-4 decoration-emerald-500 underline-offset-8">
                    गोपनीयता के साथ।
                  </span>
                </>
              ) : (
                <>
                  Health Truth,<br />
                  <span className="underline decoration-4 decoration-emerald-500 underline-offset-8">
                    Engineered for Privacy.
                  </span>
                </>
              )}
            </h1>

            <p className="text-forest-800 font-medium text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
              {isHindi
                ? 'व्हाट्सएप की झूठी स्वास्थ्य सूचनाओं को उजागर करने वाला पहला हाइब्रिड AI प्लेटफॉर्म। वायरल दावों की जांच क्लाउड में, जबकि आपकी व्यक्तिगत शंकाएं 100% आपके डिवाइस (Gemini Nano) पर सुरक्षित रहती हैं।'
                : 'The first hybrid health verification engine pairing on-device Gemini Nano with Firebase AI Logic. Viral claims are verified against WHO guidelines in the cloud — while personal patient fears never leave your device.'}
            </p>
          </div>

          {/* Dual Call-To-Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Get Started Button */}
            <button
              type="button"
              onClick={onGetStarted}
              className="brutal-button inline-flex items-center gap-3 px-8 py-4 text-base shadow-[4px_4px_0px_0px_#0F2923] hover:shadow-[6px_6px_0px_0px_#0F2923]"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{isHindi ? 'शुरू करें (गेट स्टार्टेड)' : 'Get Started'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Direct Judge 1-Click Launch Button */}
            <button
              type="button"
              onClick={onJudgeDirectLaunch}
              className="brutal-button-secondary inline-flex items-center gap-2.5 px-6 py-4 text-sm font-black border-2 border-forest-900 bg-amber-200 text-forest-950 hover:bg-amber-300 shadow-[4px_4px_0px_0px_#0F2923]"
              title="Instant 1-Click Demo for Hackathon Judges"
            >
              <Flame className="w-4 h-4 text-red-600" />
              <span>{isHindi ? '⚡ जज 1-क्लिक लाइव डेमो' : '⚡ 1-Click Judge Demo'}</span>
            </button>

            {/* Quick Explore WHO Evidence */}
            <button
              type="button"
              onClick={onExploreStories}
              className="text-xs text-forest-800 font-black underline hover:text-forest-950 px-2 py-2"
            >
              {isHindi ? 'WHO तथ्य देखें →' : 'Browse WHO Facts →'}
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t-2 border-forest-900/10">
            <div className="space-y-0.5">
              <div className="text-3xl font-black text-forest-950">0 KB</div>
              <div className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                {isHindi ? 'प्राइवेट डेटा लीकेज' : 'Private Data Egress'}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-3xl font-black text-forest-950">&lt; 350ms</div>
              <div className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                {isHindi ? 'ऑन-डिवाइस लेटेंसी' : 'On-Device Latency'}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-3xl font-black text-forest-950">100%</div>
              <div className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                {isHindi ? 'WHO/NIDDK प्रमाणित' : 'Clinically Audited'}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-3xl font-black text-forest-950">Hybrid</div>
              <div className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                {isHindi ? 'ड्यूल डोमेन आर्किटेक्चर' : 'Dual-Domain Routing'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Architectural Duality (Cloud vs On-Device) ─── */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="brutal-badge bg-forest-900 text-cream-50 border-forest-950 text-xs">
            {isHindi ? 'हाइब्रिड आर्किटेक्चर' : 'Architectural Partitioning'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            {isHindi ? 'दो डोमेन — एक अखंड अनुभव' : 'Two Domains. Zero Privacy Compromise.'}
          </h2>
          <p className="text-xs sm:text-sm text-forest-800 font-medium">
            {isHindi
              ? 'सामान्य वायरल दावों को शक्तिशाली क्लाउड AI प्रोसेस करता है, जबकि व्यक्तिगत स्वास्थ्य भय केवल लोकल चिप पर रहते हैं।'
              : 'VeriWell cleanly splits intelligence between high-compute cloud AI and absolute-privacy on-device compute.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cloud Column */}
          <div className="brutal-card p-8 bg-sky-50/70 border-2 border-forest-900 space-y-4 shadow-[4px_4px_0px_0px_#0F2923]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-forest-900/15">
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-sky-800" />
                <span className="font-black text-forest-950 text-lg">
                  {isHindi ? 'क्लाउड इंटेलिजेंस' : 'Public Cloud Domain'}
                </span>
              </div>
              <span className="brutal-badge bg-sky-200 text-sky-950 border-sky-950 text-[10px]">
                ONLY_IN_CLOUD
              </span>
            </div>

            <p className="text-xs sm:text-sm text-forest-800 font-medium leading-relaxed">
              {isHindi
                ? 'वायरल व्हाट्सएप टेक्स्ट और स्क्रीनशॉट में बड़े संदर्भ और मल्टी-मोडल ओसीआर की आवश्यकता होती है। इसे Firebase AI Logic (Gemini 3.5 Flash-Lite) द्वारा सुरक्षित रूप से संसाधित किया जाता है।'
                : 'Viral health claims, forwarded memes, and medical image screenshots require extensive clinical knowledge context and multimodal OCR vision. Processed via Firebase AI Logic.'}
            </p>

            <ul className="text-xs text-forest-800 space-y-2 font-bold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 flex-shrink-0" />
                <span>{isHindi ? 'मल्टीमोडल स्क्रीनशॉट दावा निष्कर्षण' : 'Multimodal Vision Screenshot Extraction'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 flex-shrink-0" />
                <span>{isHindi ? 'WHO और NIDDK दिशानिर्देशों से मिलान' : 'Grounding against WHO / NIDDK Corpus'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 flex-shrink-0" />
                <span>{isHindi ? 'पारिवारिक व्हाट्सएप सुधारात्मक संदेश' : 'Culturally Tuned WhatsApp Counter-Forwards'}</span>
              </li>
            </ul>
          </div>

          {/* On-Device Column */}
          <div className="brutal-card p-8 bg-emerald-50/70 border-2 border-forest-900 space-y-4 shadow-[4px_4px_0px_0px_#0F2923]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-forest-900/15">
              <div className="flex items-center gap-2">
                <Cpu className="w-6 h-6 text-emerald-800" />
                <span className="font-black text-forest-950 text-lg">
                  {isHindi ? 'ऑन-डिवाइस प्राइवेसी' : 'On-Device Sanctum'}
                </span>
              </div>
              <span className="brutal-badge bg-emerald-300 text-emerald-950 border-emerald-950 text-[10px]">
                ONLY_ON_DEVICE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-forest-800 font-medium leading-relaxed">
              {isHindi
                ? 'मरीज की आंतरिक चिंताएं (जैसे "मुझे डर है कि दवा से मेरी किडनी खराब हो जाएगी") कभी किसी सर्वर पर नहीं भेजी जाती हैं। यह Chrome Built-in Prompt API (Gemini Nano) द्वारा 100% स्थानीय रूप से चलती हैं।'
                : 'Intimate patient fears ("I stopped insulin because I fear dialysis") never touch an external server or API. Executed entirely inside Chrome via on-device Gemini Nano.'}
            </p>

            <ul className="text-xs text-forest-800 space-y-2 font-bold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>{isHindi ? 'शून्य नेटवर्क ट्रांसमिशन (0KB Egress)' : 'Zero Network Transmission (0KB Egress)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>{isHindi ? 'सहानुभूतिपूर्ण समझ और टीक-बैक प्रश्न' : 'Empathetic Reflection & Socratic Teach-Back'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>{isHindi ? 'ऑफलाइन व खराब नेटवर्क में पूर्ण कार्यशील' : 'Resilient Operation even when Offline'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Interactive Feature Bento Grid (All 5 Modules) ─── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="brutal-badge bg-forest-900 text-cream-50 border-forest-950 text-xs">
              {isHindi ? 'सुविधाएं व मॉड्यूल' : 'Core Capabilities'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mt-1">
              {isHindi ? 'पांच विशेष उपकरण' : 'Explore the 5 VeriWell Modules'}
            </h2>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-cream-50 p-1.5 rounded-xl border-2 border-forest-900">
            {features.map((f, idx) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFeatureTab(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  activeFeatureTab === idx
                    ? 'bg-forest-900 text-cream-50 shadow-[1px_1px_0px_0px_#000]'
                    : 'text-forest-800 hover:text-forest-950 hover:bg-sage-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Showcase Card */}
        <div className={`brutal-card p-8 md:p-10 transition-all ${currentFeature.color}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-forest-900/15">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`brutal-badge text-xs ${currentFeature.badgeColor}`}>
                  {currentFeature.tag}
                </span>
                <span className="text-xs font-mono font-bold text-forest-700">
                  {currentFeature.stats}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-forest-950 tracking-tight">
                {currentFeature.headline}
              </h3>
            </div>

            <button
              type="button"
              onClick={onGetStarted}
              className="brutal-button px-5 py-2.5 text-xs inline-flex items-center gap-2 self-start md:self-auto flex-shrink-0"
            >
              <span>{isHindi ? 'लाइव आजमाएं' : 'Try in Demo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm sm:text-base text-forest-900 font-medium leading-relaxed">
                {currentFeature.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-bold text-forest-800 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  {isHindi ? 'पूर्णतः क्रियान्वित' : 'Fully Implemented'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  {isHindi ? 'द्विभाषी (EN/HI)' : 'Bilingual EN/HI'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  {isHindi ? 'फायरबेस सुरक्षा' : 'Firebase Rules Protected'}
                </span>
              </div>
            </div>

            {/* Quick module selector list */}
            <div className="space-y-2 border-l-2 border-forest-900/15 pl-6 hidden md:block">
              <div className="text-[11px] font-black uppercase text-forest-700 tracking-wider mb-2">
                {isHindi ? 'सभी मॉड्यूल चुनें:' : 'Jump to module:'}
              </div>
              {features.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFeatureTab(i)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-bold transition-all block ${
                    activeFeatureTab === i
                      ? 'bg-forest-900 text-cream-50 font-black shadow-[2px_2px_0px_0px_#0F2923]'
                      : 'text-forest-800 hover:bg-white/80'
                  }`}
                >
                  {f.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Box ─── */}
      <section className="brutal-card p-8 sm:p-12 text-center bg-forest-900 text-cream-50 space-y-6 shadow-[6px_6px_0px_0px_#064e3b]">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="brutal-badge bg-emerald-400 text-emerald-950 border-emerald-950 text-xs">
            {isHindi ? 'तुरंत शुरू करें' : 'Live Interactive Demo'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-cream-50 tracking-tight leading-tight">
            {isHindi
              ? 'हाइब्रिड स्वास्थ्य AI का भविष्य लाइव परखें'
              : 'Experience the Next Generation of Privacy-First Health AI.'}
          </h2>
          <p className="text-xs sm:text-sm text-sage-200 font-medium">
            {isHindi
              ? 'जजों और मूल्यांकनकर्ताओं के लिए कोई साइनअप आवश्यक नहीं है। 1-क्लिक एक्सेस से तुरंत पूरी कार्यप्रणाली की जांच करें।'
              : 'Built for #BuildHybridAI 2026. Zero registration needed for evaluators. Launch the full suite instantly.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onJudgeDirectLaunch}
            className="px-8 py-4 rounded-xl font-black text-sm bg-amber-300 text-forest-950 border-2 border-forest-950 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-red-600" />
            <span>{isHindi ? '⚡ 1-क्लिक जज डेमो लॉन्च' : '⚡ 1-Click Judge Demo Launch'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onGetStarted}
            className="px-6 py-4 rounded-xl font-black text-sm bg-white text-forest-950 border-2 border-forest-950 shadow-[4px_4px_0px_0px_#000] hover:bg-sage-100 transition-all flex items-center gap-2"
          >
            <span>{isHindi ? 'Google से साइन इन करें' : 'Sign In with Google'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
