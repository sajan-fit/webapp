import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Server, 
  Wifi, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  RefreshCw, 
  Sliders, 
  Terminal, 
  Zap,
  Sparkles
} from 'lucide-react';
import { SystemLog, SystemMetric } from '../types';

interface SystemStatusViewProps {
  metrics: SystemMetric[];
  logs: SystemLog[];
  onTriggerDiagnostics: () => void;
}

export const SystemStatusView: React.FC<SystemStatusViewProps> = ({
  metrics,
  logs,
  onTriggerDiagnostics
}) => {
  const [selectedLogLevel, setSelectedLogLevel] = useState<string>('All');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRunSweep = () => {
    setIsDiagnosing(true);
    setToastMessage('Initiating neural diagnostic sweep across all 6 CCTV nodes...');
    setTimeout(() => {
      onTriggerDiagnostics();
      setIsDiagnosing(false);
      setToastMessage('Diagnostic sweep complete. 100% integrity verified.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const filteredLogs = logs.filter(l => selectedLogLevel === 'All' || l.level === selectedLogLevel);

  return (
    <div id="system-status-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto font-mono text-xs">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Health Overview Header Card */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Circular animated pulse gauge */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d2ff]/20 to-[#26fedc]/10 border border-[#00d2ff]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.25)]">
            <Zap className="w-8 h-8 text-[#26fedc] animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#26fedc] ring-2 ring-[#0b1326] animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#dae2fd]">SYSTEM HEALTH: 98.4% OPTIMAL</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#26fedc]/15 text-[#26fedc] border border-[#26fedc]/30">
                ALL SUBSYSTEMS GREEN
              </span>
            </div>
            <p className="text-xs text-[#859399] mt-0.5">Uptime: 24d 18h 42m • Node Sync: 100% • GPU Acceleration: CUDA Active</p>
          </div>
        </div>

        <button
          onClick={handleRunSweep}
          disabled={isDiagnosing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff]/20 to-[#26fedc]/20 hover:from-[#00d2ff]/30 hover:to-[#26fedc]/30 border border-[#00d2ff]/50 text-[#26fedc] font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isDiagnosing ? 'animate-spin text-[#00d2ff]' : ''}`} />
          <span>{isDiagnosing ? 'Running Diagnostics...' : 'Trigger Integrity Sweep'}</span>
        </button>
      </div>

      {/* 4 Core Neural & Hardware Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            id={`metric-module-${metric.id}`}
            className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/40 shadow-xl space-y-3 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#26fedc]" />
                <h3 className="font-bold text-[#dae2fd] text-xs">{metric.name}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#26fedc]/15 text-[#26fedc] border border-[#26fedc]/30">
                {metric.status}
              </span>
            </div>

            <p className="text-xs text-[#bbc9cf]">{metric.details}</p>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#859399]">PROCESSING LOAD:</span>
                <span className="text-[#a5e7ff] font-bold">{metric.load}% (Latency: {metric.latency})</span>
              </div>
              <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    metric.load > 80 ? 'bg-[#93000a]' : metric.load > 60 ? 'bg-[#00d2ff]' : 'bg-[#26fedc]'
                  }`}
                  style={{ width: `${metric.load}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Rolling System Audit Logs */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#3c494e]/30">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00d2ff]" />
            <h3 className="text-sm font-bold text-[#dae2fd]">LIVE SYSTEM TELEMETRY & EVENT LOG</h3>
          </div>

          <div className="flex items-center gap-1.5">
            {['All', 'CRITICAL', 'WARN', 'SUCCESS', 'INFO'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLogLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                  selectedLogLevel === lvl
                    ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50'
                    : 'bg-[#0b1326] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]/40'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-[#0b1326]/70 border border-[#3c494e]/30 hover:border-[#00d2ff]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#859399] text-[11px] shrink-0">{log.timestamp}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  log.level === 'CRITICAL'
                    ? 'bg-[#93000a] text-[#ffdad6]'
                    : log.level === 'WARN'
                    ? 'bg-amber-950 text-amber-300'
                    : log.level === 'SUCCESS'
                    ? 'bg-[#00382f] text-[#26fedc]'
                    : 'bg-[#171f33] text-[#bbc9cf]'
                }`}>
                  {log.level}
                </span>
                <span className="text-[#00d2ff] shrink-0">[{log.service}]</span>
                <span className="text-[#dae2fd]">{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
