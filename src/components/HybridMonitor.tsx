import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Cloud, CheckCircle, XCircle, Clock, ShieldCheck, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { subscribeToTraces, checkOnDeviceAvailability, setOfflineSimulation, getOfflineSimulation } from '../services/ai/router';
import { InferenceTrace } from '../types';
import { translations, Language } from '../i18n/translations';

interface HybridMonitorProps {
  lang?: Language;
}

export const HybridMonitor: React.FC<HybridMonitorProps> = ({ lang = 'en' }) => {
  const t = translations[lang].monitor;

  const [traces, setTraces] = useState<InferenceTrace[]>([]);
  const [deviceStatus, setDeviceStatus] = useState<'available' | 'downloadable' | 'unavailable'>('unavailable');
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(getOfflineSimulation());

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkAvailability();

    // Subscribe to AI Router inference traces
    const unsubscribe = subscribeToTraces((newTrace) => {
      setTraces((prev) => [newTrace, ...prev]);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  const checkAvailability = async () => {
    setIsChecking(true);
    const status = await checkOnDeviceAvailability();
    setDeviceStatus(status);
    setIsChecking(false);
  };

  const toggleOfflineSimulation = () => {
    const nextState = !isSimulatedOffline;
    setIsSimulatedOffline(nextState);
    setOfflineSimulation(nextState);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* On-Device Status */}
        <div className="brutal-card p-5 space-y-2 shadow-[3px_3px_0px_0px_#0A221C]">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{t.localNanoTitle}</span>
            <Cpu className="w-5 h-5 text-emerald-800" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full border border-forest-900 ${deviceStatus === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-xl font-mono font-black text-forest-900 capitalize">{deviceStatus}</span>
          </div>
          <p className="text-[11px] font-mono text-forest-700 font-medium">
            {t.promptApiSub}
          </p>
        </div>

        {/* Cloud AI Status */}
        <div className="brutal-card p-5 space-y-2 shadow-[3px_3px_0px_0px_#0A221C]">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{t.cloudAiTitle}</span>
            <Cloud className="w-5 h-5 text-sky-800" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full border border-forest-900 ${(!isSimulatedOffline && isOnline) ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-xl font-mono font-black text-forest-900">{(!isSimulatedOffline && isOnline) ? (lang === 'hi' ? 'कनेक्टेड' : 'Connected') : (lang === 'hi' ? 'ऑफलाइन' : 'Offline')}</span>
          </div>
          <p className="text-[11px] font-mono text-forest-700 font-medium">
            {t.cloudAiSub}
          </p>
        </div>

        {/* Total Inferences */}
        <div className="brutal-card p-5 space-y-2 shadow-[3px_3px_0px_0px_#0A221C]">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{t.inferencesTitle}</span>
            <Activity className="w-5 h-5 text-forest-900" />
          </div>
          <div className="text-3xl font-mono font-black text-forest-900">
            {traces.length}
          </div>
          <p className="text-[11px] font-mono text-forest-700 font-medium">
            {traces.filter(t => t.actualSource === 'ON_DEVICE').length} {lang === 'hi' ? 'ऑन-डिवाइस' : 'on-device'} | {traces.filter(t => t.actualSource === 'IN_CLOUD').length} {lang === 'hi' ? 'क्लाउड' : 'cloud'}
          </p>
        </div>

        {/* Judge Testing: Offline Simulator Toggle */}
        <div className="brutal-card p-5 space-y-2 flex flex-col justify-between shadow-[3px_3px_0px_0px_#0A221C]">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{t.offlineSimTitle}</span>
            {isSimulatedOffline ? <WifiOff className="w-5 h-5 text-red-600" /> : <Wifi className="w-5 h-5 text-emerald-700" />}
          </div>
          <div>
            <button
              type="button"
              onClick={toggleOfflineSimulation}
              className={`w-full py-2 px-3 rounded-xl text-xs font-black border-2 border-forest-950 transition-all ${
                isSimulatedOffline
                  ? 'bg-red-600 text-white shadow-[2px_2px_0px_0px_#450a0a]'
                  : 'bg-emerald-300 text-forest-950 shadow-[2px_2px_0px_0px_#0A221C] hover:bg-emerald-400'
              }`}
            >
              {isSimulatedOffline ? t.offlineSimButtonOn : t.offlineSimButtonOff}
            </button>
          </div>
          <p className="text-[10px] text-forest-700 font-medium leading-tight">
            {t.offlineSimSub}
          </p>
        </div>
      </div>

      {/* Hardware & Diagnostics Details */}
      <div className="brutal-card p-6 space-y-4 shadow-[4px_4px_0px_0px_#0A221C]">
        <div className="flex items-center justify-between pb-3 border-b-2 border-forest-900/10">
          <h3 className="heading-md flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800" /> {t.archTitle}
          </h3>
          <button
            type="button"
            onClick={checkAvailability}
            disabled={isChecking}
            className="brutal-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} /> {t.refreshButton}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-emerald-50/70 rounded-xl border-2 border-forest-900 space-y-1.5 shadow-[2px_2px_0px_0px_#0A221C]">
            <div className="heading-sm flex items-center gap-1.5 text-forest-950">
              <Cpu className="w-4 h-4 text-emerald-800" /> {t.privateDomainTitle}
            </div>
            <p className="body-sm text-forest-800">
              {t.privateDomainDesc}
            </p>
          </div>

          <div className="p-4 bg-sky-50/70 rounded-xl border-2 border-forest-900 space-y-1.5 shadow-[2px_2px_0px_0px_#0A221C]">
            <div className="heading-sm flex items-center gap-1.5 text-forest-950">
              <Cloud className="w-4 h-4 text-sky-800" /> {t.publicDomainTitle}
            </div>
            <p className="body-sm text-forest-800">
              {t.publicDomainDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Live Trace Logs */}
      <div className="brutal-card p-6 space-y-4 shadow-[4px_4px_0px_0px_#0A221C]">
        <h3 className="heading-md flex items-center gap-2 pb-3 border-b-2 border-forest-900/10">
          <Clock className="w-5 h-5 text-forest-900" /> {t.liveTelemetryTitle}
        </h3>

        {traces.length === 0 ? (
          <div className="text-center py-8 text-forest-700 text-sm font-medium italic">
            {t.noTraces}
          </div>
        ) : (
          <div className="space-y-3">
            {traces.map((trace) => (
              <div
                key={trace.id}
                className="p-4 rounded-xl border-2 border-forest-900 bg-cream-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-[2px_2px_0px_0px_#0F2923]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-forest-950 text-sm">{trace.task}</span>
                    <span className="text-forest-700 font-mono text-[11px] font-bold">{trace.timestamp}</span>
                  </div>
                  {trace.details && (
                    <p className="text-forest-800 text-xs font-medium">{trace.details}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-forest-900 bg-white border border-forest-900 px-2 py-1 rounded-md font-bold">
                    {trace.elapsedMs} ms
                  </span>

                  {trace.actualSource === 'ON_DEVICE' ? (
                    <span className="brutal-badge bg-emerald-200 text-emerald-950 border-emerald-950 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" /> ON_DEVICE
                    </span>
                  ) : trace.actualSource === 'IN_CLOUD' ? (
                    <span className="brutal-badge bg-sky-200 text-sky-950 border-sky-950 flex items-center gap-1">
                      <Cloud className="w-3.5 h-3.5" /> IN_CLOUD
                    </span>
                  ) : (
                    <span className="brutal-badge bg-gray-200 text-gray-950 border-gray-950">
                      UNKNOWN
                    </span>
                  )}

                  {trace.outcome === 'ok' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-800" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-700" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
