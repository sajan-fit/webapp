import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Radio
} from 'lucide-react';
import { SettingsConfig } from '../types';

interface SettingsViewProps {
  settings: SettingsConfig;
  onSaveSettings: (newSettings: SettingsConfig) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings
}) => {
  const [config, setConfig] = useState<SettingsConfig>({ ...settings });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    onSaveSettings(config);
    setToastMessage('Security neural parameters updated and saved to grid controller.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReset = () => {
    setConfig({
      detectionConfidence: 75,
      facialStrictness: 88,
      restrictedAreaDetect: true,
      continuousFaceRec: true,
      autoSnapshot: true,
      systemAlarms: true,
      alertPush: true,
      routineLogs: false,
      darkTheme: true,
      wsInterval: 1000
    });
    setToastMessage('Settings restored to factory security defaults.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div id="settings-view" className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto font-mono text-xs">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-[#26fedc]" />
          <div>
            <h2 className="text-sm font-bold text-[#dae2fd]">VISIONGUARD SYSTEM CONFIGURATION</h2>
            <p className="text-xs text-[#859399]">AI Detection Thresholds, Notification Relays & Defense Grid Policies</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#dae2fd] border border-[#3c494e]/40 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#26fedc] text-[#003543] font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)] flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      {/* Section 1: AI Neural Detection Thresholds */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#3c494e]/30">
          <Sparkles className="w-4 h-4 text-[#00d2ff]" />
          <h3 className="text-sm font-bold text-[#dae2fd]">AI NEURAL INFERENCE THRESHOLDS</h3>
        </div>

        {/* Detection Confidence Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-[#dae2fd]">YOLO Base Detection Confidence</span>
              <p className="text-[#859399] text-[11px]">Minimum probability required for object bounding & bounding box generation</p>
            </div>
            <span className="text-sm font-bold text-[#26fedc] px-3 py-1 rounded-lg bg-[#171f33] border border-[#00d2ff]/40">
              {config.detectionConfidence}%
            </span>
          </div>
          <input
            type="range"
            min={40}
            max={95}
            value={config.detectionConfidence}
            onChange={(e) => setConfig({ ...config, detectionConfidence: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-[#859399]">
            <span>40% (More sensitive)</span>
            <span>75% (Recommended)</span>
            <span>95% (Strict precision)</span>
          </div>
        </div>

        {/* Facial Recognition Strictness Slider */}
        <div className="space-y-2 pt-2 border-t border-[#3c494e]/20">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-[#dae2fd]">Facial Recognition Cosine Strictness</span>
              <p className="text-[#859399] text-[11px]">Vector match threshold for biometric identity unlocking</p>
            </div>
            <span className="text-sm font-bold text-[#26fedc] px-3 py-1 rounded-lg bg-[#171f33] border border-[#00d2ff]/40">
              {config.facialStrictness}%
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={99}
            value={config.facialStrictness}
            onChange={(e) => setConfig({ ...config, facialStrictness: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-[#859399]">
            <span>50% (Lenient)</span>
            <span>88% (Standard Security)</span>
            <span>99% (Maximum Lock)</span>
          </div>
        </div>
      </div>

      {/* Section 2: Security & Automated Actions */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#3c494e]/30">
          <ShieldCheck className="w-4 h-4 text-[#26fedc]" />
          <h3 className="text-sm font-bold text-[#dae2fd]">THREAT DETECTION POLICIES</h3>
        </div>

        <div className="space-y-3">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
            <div>
              <span className="font-bold text-[#dae2fd]">Restricted-Area Perimeter Trigger</span>
              <p className="text-[#859399] text-[11px]">Automatically trip alarms when unauthorized persons enter Zone 4 (Server Vault)</p>
            </div>
            <input
              type="checkbox"
              checked={config.restrictedAreaDetect}
              onChange={(e) => setConfig({ ...config, restrictedAreaDetect: e.target.checked })}
              className="w-5 h-5 accent-[#26fedc] cursor-pointer"
            />
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
            <div>
              <span className="font-bold text-[#dae2fd]">Continuous Face Recognition Engine</span>
              <p className="text-[#859399] text-[11px]">Run real-time facial vector matching across all active RTSP camera feeds</p>
            </div>
            <input
              type="checkbox"
              checked={config.continuousFaceRec}
              onChange={(e) => setConfig({ ...config, continuousFaceRec: e.target.checked })}
              className="w-5 h-5 accent-[#26fedc] cursor-pointer"
            />
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
            <div>
              <span className="font-bold text-[#dae2fd]">Automatic Forensic Snapshot Archiving</span>
              <p className="text-[#859399] text-[11px]">Capture uncompressed 4K frame to Evidence Vault upon any threat event</p>
            </div>
            <input
              type="checkbox"
              checked={config.autoSnapshot}
              onChange={(e) => setConfig({ ...config, autoSnapshot: e.target.checked })}
              className="w-5 h-5 accent-[#26fedc] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Notification Relays */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#3c494e]/30">
          <Bell className="w-4 h-4 text-[#ffb4ab]" />
          <h3 className="text-sm font-bold text-[#dae2fd]">NOTIFICATION RELAYS & ALARMS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
            <div>
              <span className="font-bold text-[#dae2fd]">Audible Security Siren Relay</span>
              <p className="text-[#859399] text-[11px]">Hardware speaker beep on critical breach</p>
            </div>
            <input
              type="checkbox"
              checked={config.systemAlarms}
              onChange={(e) => setConfig({ ...config, systemAlarms: e.target.checked })}
              className="w-5 h-5 accent-[#26fedc] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
            <div>
              <span className="font-bold text-[#dae2fd]">Push Alerts to Operator Console</span>
              <p className="text-[#859399] text-[11px]">Live banner popups for security officers</p>
            </div>
            <input
              type="checkbox"
              checked={config.alertPush}
              onChange={(e) => setConfig({ ...config, alertPush: e.target.checked })}
              className="w-5 h-5 accent-[#26fedc] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
