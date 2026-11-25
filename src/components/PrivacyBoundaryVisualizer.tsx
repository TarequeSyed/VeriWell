import React from 'react';
import { Lock, Cloud, ShieldCheck, ArrowRight, CheckCircle2, Cpu, Database } from 'lucide-react';
import { translations, Language } from '../i18n/translations';

interface PrivacyBoundaryVisualizerProps {
  lang?: Language;
}

export const PrivacyBoundaryVisualizer: React.FC<PrivacyBoundaryVisualizerProps> = ({ lang = 'en' }) => {
  const t = translations[lang].privacyVisualizer;

  return (
    <div className="brutal-card p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-forest-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="brutal-badge bg-forest-800 text-cream-50">
              {t.tag}
            </span>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.activeStatus}
            </span>
          </div>
          <h3 className="text-2xl font-black text-forest-900 tracking-tight mt-1.5">
            {t.title}
          </h3>
        </div>
        <p className="text-xs text-forest-700 max-w-xs leading-relaxed font-medium">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* On-Device Private Domain */}
        <div className="bg-emerald-50/70 border-2 border-emerald-900 rounded-xl p-6 space-y-4 relative shadow-[3px_3px_0px_0px_#064e3b]">
          <div className="absolute top-0 right-0 bg-emerald-800 text-cream-50 text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1 border-b-2 border-l-2 border-emerald-950">
            <Lock className="w-3 h-3" /> {t.privateBadge}
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-800 text-cream-50 rounded-xl border-2 border-emerald-950 shadow-[2px_2px_0px_0px_#064e3b]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-forest-900 text-base">{t.privateTitle}</h4>
              <p className="text-xs font-mono text-emerald-800 font-bold">{t.privateSub}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-forest-800">
            <div className="font-black text-forest-900 uppercase tracking-wider text-[11px]">{t.privateOperationsTitle}</div>
            <ul className="space-y-1.5 list-disc list-inside text-forest-800 font-medium">
              {t.privateOperations.map((op, i) => (
                <li key={i}>{op}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t-2 border-emerald-900/20 flex items-center justify-between text-[11px] font-bold text-emerald-950">
            <span>{t.privateModel}</span>
            <span className="text-emerald-800 uppercase tracking-wider">{t.privateCapability}</span>
          </div>
        </div>

        {/* Cloud Public Domain */}
        <div className="bg-sky-50/70 border-2 border-sky-900 rounded-xl p-6 space-y-4 relative shadow-[3px_3px_0px_0px_#0c4a6e]">
          <div className="absolute top-0 right-0 bg-sky-800 text-cream-50 text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1 border-b-2 border-l-2 border-sky-950">
            <Cloud className="w-3 h-3" /> {t.cloudBadge}
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-800 text-cream-50 rounded-xl border-2 border-sky-950 shadow-[2px_2px_0px_0px_#0c4a6e]">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-forest-900 text-base">{t.cloudTitle}</h4>
              <p className="text-xs font-mono text-sky-800 font-bold">{t.cloudSub}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-forest-800">
            <div className="font-black text-forest-900 uppercase tracking-wider text-[11px]">{t.cloudOperationsTitle}</div>
            <ul className="space-y-1.5 list-disc list-inside text-forest-800 font-medium">
              {t.cloudOperations.map((op, i) => (
                <li key={i}>{op}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t-2 border-sky-900/20 flex items-center justify-between text-[11px] font-bold text-sky-950">
            <span>{t.cloudModel}</span>
            <span className="text-sky-800 uppercase tracking-wider">{t.cloudPlatform}</span>
          </div>
        </div>
      </div>

      {/* Security Statement Footer */}
      <div className="p-4 bg-cream-50 rounded-xl border-2 border-forest-900/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest-900 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800 flex-shrink-0" />
          <span>
            <strong>{t.assuranceTitle}</strong> {t.assuranceDesc}
          </span>
        </div>
        <div className="text-[11px] text-forest-700 font-mono font-bold flex items-center gap-1 flex-shrink-0">
          <span>Local Device</span> <ArrowRight className="w-3.5 h-3.5 inline" /> <span>Firebase AI Logic</span>
        </div>
      </div>
    </div>
  );
};
