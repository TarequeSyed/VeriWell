import React, { useState } from 'react';
import { X, Shield, Lock, AlertCircle, ArrowRight, CheckCircle2, User as UserIcon, Zap } from 'lucide-react';
import { signInWithGoogle, signInAsJudgeDemo, signInAsGuestDemo } from '../services/firebase/auth';
import { Language } from '../i18n/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, lang }) => {
  const isHindi = lang === 'hi';
  const [isLoading, setIsLoading] = useState<'google' | 'judge' | 'guest' | null>(null);
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

  const handleGuestLogin = async () => {
    setIsLoading('guest');
    setError(null);
    try {
      await signInAsGuestDemo();
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Guest demo login failed. Please try again.');
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
        setError(isHindi ? 'ब्राउज़र पॉप-अप अवरुद्ध हो गया। कृपया अनुमति दें या 1-क्लिक डेमो का उपयोग करें।' : 'Browser popup was blocked. Please allow popups or use 1-Click Demo.');
      } else if (err.code === 'auth/configuration-not-found') {
        setError(
          isHindi
            ? 'Firebase Console में Google साइन-इन सक्षम नहीं है। कृपया त्वरित 1-क्लिक डेमो बटन का उपयोग करें।'
            : 'Google Sign-in is not yet enabled in Firebase Console. Please click the 1-Click Demo button above.'
        );
      } else {
        setError(err.message || 'Google sign-in failed. You can use 1-Click Demo instead.');
      }
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md brutal-card bg-white p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_#0A221C]">
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
            <span className="brutal-badge bg-emerald-200 text-emerald-950 border-forest-900">
              {isHindi ? 'सुरक्षित एक्सेस' : 'Secure Access'}
            </span>
            <span className="brutal-badge bg-forest-950 text-cream-50 border-forest-950 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              {isHindi ? 'गोपनीयता प्रथम' : 'Privacy-First'}
            </span>
          </div>

          <h3 className="heading-xl">
            {isHindi ? 'VeriWell में प्रवेश करें' : 'Enter VeriWell Workspace'}
          </h3>

          <p className="body-sm text-forest-800 leading-relaxed">
            {isHindi
              ? 'हाइब्रिड AI आर्किटेक्चर (जेमिनी नैनो + फायरबेस एआई लॉजिक) को लाइव टेस्ट करें।'
              : 'Experience on-device Gemini Nano paired with Firebase AI Logic.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-100 border-2 border-red-900 rounded-xl text-red-950 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Option 1: 1-Click Judge & Hackathon Evaluator Access (Primary) */}
        <div className="p-5 bg-emerald-50/80 border-2 border-emerald-900/40 rounded-xl space-y-3 shadow-[3px_3px_0px_0px_#064E3B]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-forest-950 text-white text-[10px] font-mono">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              {isHindi ? 'जज व रिव्यूअर हेतु' : 'FOR HACKATHON JUDGES'}
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-800">1-Click Bypass</span>
          </div>

          <div>
            <div className="heading-sm text-forest-950">
              {isHindi ? 'त्वरित जज डेमो एक्सेस' : 'Instant Judge Demo Access'}
            </div>
            <p className="body-sm text-forest-700 mt-0.5">
              {isHindi
                ? 'बिना किसी साइनअप के तुरंत सभी 5 मॉड्यूल्स और टेलीमेट्री का लाइव टेस्ट करें।'
                : 'Zero credentials required. Instantly unlocks all 5 modules, telemetry, and offline simulation.'}
            </p>
          </div>

          <ul className="text-[11px] text-forest-800 font-medium space-y-1.5">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>{isHindi ? 'सभी 5 टूल्स और ऑफलाइन सिम्युलेटर अनलॉक' : 'All 5 tools + offline simulator unlocked'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>{isHindi ? 'जेमिनी नैनो ऑन-डिवाइस मूल्यांकन सक्रिय' : 'Live on-device Gemini Nano evaluation'}</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleJudgeLogin}
            disabled={isLoading !== null}
            className="w-full brutal-button-emerald py-3 px-4 text-xs flex items-center justify-center gap-2 mt-1 shadow-[2px_2px_0px_0px_#064E3B]"
          >
            {isLoading === 'judge' ? (
              <span>{isHindi ? 'एक्सेस तैयार हो रहा है...' : 'Launching Demo Session...'}</span>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
                <span>{isHindi ? 'डेमो शुरू करें (1-क्लिक)' : 'Launch 1-Click Judge Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-white" />
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

        {/* General User Options */}
        <div className="space-y-2.5">
          {/* Option 2: Sign in with Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading !== null}
            className="w-full brutal-button-secondary py-2.5 px-4 text-xs flex items-center justify-center gap-3 shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
                : (isHindi ? 'Google खाते से साइन इन करें' : 'Sign In with Google')}
            </span>
          </button>

          {/* Option 3: Continue as Guest Demo (No OAuth needed) */}
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isLoading !== null}
            className="w-full bg-white hover:bg-slate-100 text-forest-900 border-2 border-forest-900 rounded-xl py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_0px_#0F172A]"
          >
            <UserIcon className="w-3.5 h-3.5 text-forest-700" />
            <span>
              {isLoading === 'guest'
                ? (isHindi ? 'अतिथि सत्र शुरू हो रहा है...' : 'Starting Guest Session...')
                : (isHindi ? 'अतिथि (मरीज) डेमो के रूप में देखें' : 'Explore as Guest Patient Demo')}
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
