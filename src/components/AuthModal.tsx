import React, { useState } from 'react';
import { X, Sparkles, Shield, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { signInWithGoogle, signInAsJudgeDemo } from '../services/firebase/auth';
import { Language } from '../i18n/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, lang }) => {
  const isHindi = lang === 'hi';
  const [isLoading, setIsLoading] = useState<'google' | 'judge' | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleJudgeLogin = async () => {
    setIsLoading('judge');
    setError(null);
    try {
      await signInAsJudgeDemo();
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Demo login failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading('google');
    setError(null);
    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError(isHindi ? 'लॉगिन विंडो बंद कर दी गई थी।' : 'Sign-in popup was closed before completion.');
      } else if (err.code === 'auth/popup-blocked') {
        setError(isHindi ? 'ब्राउज़र पॉप-अप अवरुद्ध हो गया। कृपया अनुमति दें या जज डेमो का उपयोग करें।' : 'Browser popup was blocked. Please allow popups or use 1-Click Judge Demo.');
      } else {
        setError(err.message || 'Google sign-in failed. You can use 1-Click Judge Demo instead.');
      }
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md brutal-card bg-white p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_#0F2923]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-forest-900 hover:bg-sage-100 text-forest-900 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="brutal-badge bg-sage-200 text-forest-950 border-forest-900">
              {isHindi ? 'सुरक्षित एक्सेस' : 'Secure Access'}
            </span>
            <span className="brutal-badge bg-forest-900 text-cream-50 border-forest-950 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              {isHindi ? 'गोपनीयता प्रथम' : 'Privacy-First'}
            </span>
          </div>

          <h3 className="text-2xl font-black text-forest-950 tracking-tight leading-tight">
            {isHindi ? 'VeriWell डेमो में प्रवेश करें' : 'Unlock the VeriWell Experience'}
          </h3>

          <p className="text-xs text-forest-800 font-medium leading-relaxed">
            {isHindi
              ? 'हाइब्रिड AI आर्किटेक्चर (जेमिनी नैनो + फायरबेस एआई लॉजिक) को लाइव टेस्ट करें।'
              : 'Choose how you want to test our dual-domain hybrid AI architecture.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-100 border-2 border-red-900 rounded-xl text-red-950 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Option 1: 1-Click Judge & Hackathon Evaluator Access (Highlighted) */}
        <div className="p-5 bg-sage-100 border-2 border-forest-900 rounded-xl space-y-3 shadow-[3px_3px_0px_0px_#0F2923]">
          <div className="flex items-center justify-between">
            <span className="brutal-badge bg-forest-900 text-cream-50 text-[10px] border-forest-950 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {isHindi ? 'जज व रिव्यूअर हेतु' : 'FOR HACKATHON JUDGES'}
            </span>
            <span className="text-[11px] font-mono font-bold text-forest-700">1-Click</span>
          </div>

          <div>
            <div className="font-black text-forest-950 text-base">
              {isHindi ? 'त्वरित जज डेमो एक्सेस' : 'Instant Judge Demo Access'}
            </div>
            <p className="text-xs text-forest-800 font-medium mt-0.5">
              {isHindi
                ? 'बिना किसी साइनअप के तुरंत सभी 5 मॉड्यूल्स और टेलीमेट्री का लाइव टेस्ट करें।'
                : 'Zero registration or credentials required. Instantly unlock the complete interactive suite.'}
            </p>
          </div>

          <ul className="text-[11px] text-forest-800 font-medium space-y-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>{isHindi ? 'सभी 5 टूल्स और ऑफलाइन सिम्युलेटर अनलॉक' : 'All 5 tools + offline simulator unlocked'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>{isHindi ? 'जेमिनी नैनो ऑन-डिवाइस सत्यापन सक्रिय' : 'Live on-device Gemini Nano evaluation'}</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleJudgeLogin}
            disabled={isLoading !== null}
            className="w-full brutal-button py-2.5 px-4 text-xs flex items-center justify-center gap-2 mt-1"
          >
            {isLoading === 'judge' ? (
              <span>{isHindi ? 'एक्सेस तैयार हो रहा है...' : 'Launching Demo Session...'}</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isHindi ? 'डेमो शुरू करें (1-क्लिक)' : 'Launch 1-Click Judge Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t-2 border-forest-900/15 w-full" />
          <span className="bg-white px-3 text-[11px] font-black uppercase text-forest-700 tracking-wider">
            {isHindi ? 'या' : 'or'}
          </span>
        </div>

        {/* Option 2: Sign in with Google */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading !== null}
            className="w-full brutal-button-secondary py-3 px-4 text-xs flex items-center justify-center gap-3"
          >
            {/* Google SVG Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>
              {isLoading === 'google'
                ? (isHindi ? 'Google से जुड़ रहे हैं...' : 'Connecting to Google...')
                : (isHindi ? 'Google से साइन इन करें' : 'Sign in with Google')}
            </span>
          </button>
        </div>

        {/* Security Footnote */}
        <div className="pt-2 border-t-2 border-forest-900/10 text-center">
          <p className="text-[11px] text-forest-700 font-medium leading-tight">
            <Shield className="w-3 h-3 inline text-emerald-800 mr-1" />
            {isHindi
              ? 'आपकी व्यक्तिगत स्वास्थ्य चिंताएं हमेशा डिवाइस पर ही रहती हैं (0KB बाहर भेजा जाता है)।'
              : 'Your personal health thoughts remain on-device with Gemini Nano. 0KB sent to server.'}
          </p>
        </div>
      </div>
    </div>
  );
};
