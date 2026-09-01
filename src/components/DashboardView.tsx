import React, { useState } from 'react';
import { 
  Video, 
  ShieldAlert, 
  UserCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  Maximize2, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  ExternalLink,
  Flame,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { Camera, EvidenceItem, NavigationTab, RegisteredPerson, SecurityEvent } from '../types';
import { IMAGES } from '../mockData';

interface DashboardViewProps {
  cameras: Camera[];
  events: SecurityEvent[];
  people: RegisteredPerson[];
  evidence: EvidenceItem[];
  onSelectTab: (tab: NavigationTab) => void;
  onSelectEvent: (event: SecurityEvent) => void;
  onSimulateThreat: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cameras,
  events,
  people,
  evidence,
  onSelectTab,
  onSelectEvent,
  onSimulateThreat
}) => {
  const [selectedFeedId, setSelectedFeedId] = useState<string>('CAM-01');
  const [isAiOverlayActive, setIsAiOverlayActive] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(true);

  const currentCam = cameras.find(c => c.id === selectedFeedId) || cameras[0];
  const criticalThreats = events.filter(e => e.severity === 'critical' || e.severity === 'high');

  return (
    <div id="dashboard-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* 4 Top KPI Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Cameras */}
        <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/50 transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#859399]">ONLINE CAMERAS</span>
            <div className="p-2 rounded-xl bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20 group-hover:scale-110 transition-transform">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dae2fd]">{cameras.filter(c => c.status === 'Online').length}/{cameras.length}</span>
            <span className="text-xs font-mono text-[#26fedc] flex items-center">
              100% Operational
            </span>
          </div>
          <div className="mt-3 w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#26fedc] h-full rounded-full shadow-[0_0_8px_#26fedc]" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Card 2: Security Events Today */}
        <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/50 transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#859399]">SECURITY EVENTS (24H)</span>
            <div className="p-2 rounded-xl bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/20 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dae2fd]">{events.length + 18}</span>
            <span className="text-xs font-mono text-[#a5e7ff] flex items-center">
              <ArrowUpRight className="w-3 h-3 text-[#26fedc]" /> +12% vs yesterday
            </span>
          </div>
          <div className="mt-3 w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00d2ff] h-full rounded-full shadow-[0_0_8px_#00d2ff]" style={{ width: '74%' }} />
          </div>
        </div>

        {/* Card 3: Active Threat Level */}
        <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#ffb4ab]/30 hover:border-[#ffb4ab]/60 transition-all shadow-lg group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#93000a]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#ffb4ab]">ACTIVE INCIDENTS</span>
            <div className="p-2 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30 group-hover:scale-110 transition-transform animate-pulse">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#ffdad6]">{criticalThreats.length}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30">
              HIGH PRIORITY
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#bbc9cf]">
            <span>Zone 4 Server Vault</span>
            <span className="text-[#ffb4ab] cursor-pointer hover:underline" onClick={() => onSelectTab('events')}>Inspect →</span>
          </div>
        </div>

        {/* Card 4: Biometric Face Match Accuracy */}
        <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#26fedc]/50 transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#859399]">FACIAL MATCH ACCURACY</span>
            <div className="p-2 rounded-xl bg-[#26fedc]/10 text-[#26fedc] border border-[#26fedc]/20 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#26fedc]">98.7%</span>
            <span className="text-xs font-mono text-[#a5e7ff]">Neural ResNet</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#859399]">
            <span>Active Residents: {people.length}</span>
            <span className="text-[#26fedc]">Cosine: 0.88</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Monitoring Stream + Threat Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Live CCTV Stream Panel */}
        <div className="lg:col-span-2 flex flex-col rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 overflow-hidden shadow-xl">
          {/* Header Bar with camera switcher tabs */}
          <div className="p-3.5 bg-[#171f33]/90 border-b border-[#3c494e]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#26fedc] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#dae2fd]">LIVE CCTV STREAM:</span>
              </div>
              
              {/* Camera Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {cameras.slice(0, 4).map((cam) => (
                  <button
                    key={cam.id}
                    id={`cam-tab-${cam.id}`}
                    onClick={() => setSelectedFeedId(cam.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedFeedId === cam.id
                        ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50 shadow-[0_0_8px_rgba(0,210,255,0.2)]'
                        : 'bg-[#0b1326]/60 text-[#859399] hover:text-[#dae2fd] border border-transparent'
                    }`}
                  >
                    {cam.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAiOverlayActive(!isAiOverlayActive)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isAiOverlayActive
                    ? 'bg-[#26fedc]/15 text-[#26fedc] border border-[#26fedc]/40'
                    : 'bg-[#0b1326] text-[#859399] border border-[#3c494e]'
                }`}
                title="Toggle AI Bounding Box & Face Recognition Overlay"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Bounding {isAiOverlayActive ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => onSelectTab('live')}
                className="p-1.5 rounded-lg bg-[#0b1326] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e] transition-colors"
                title="Open 4-Grid Matrix"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CCTV Feed Screen with HUD Overlays */}
          <div className="relative aspect-video bg-black overflow-hidden group">
            {/* Live Camera Image */}
            <img
              src={currentCam.thumbnail}
              alt={currentCam.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Scanline CRT overlay */}
            <div className="absolute inset-0 cctv-scanline" />

            {/* Top HUD Stats: Timestamp, FPS, REC */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none font-mono text-xs z-10">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0b1326]/80 border border-[#3c494e]/60 text-[#a5e7ff] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#93000a] animate-ping" />
                <span className="text-[#ffb4ab] font-bold">REC</span>
                <span className="border-l border-[#3c494e] pl-2">{currentCam.id} • {currentCam.name}</span>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0b1326]/80 border border-[#3c494e]/60 text-[#26fedc] backdrop-blur-sm">
                <span>{currentCam.fps} FPS</span>
                <span>{currentCam.resolution.split(' ')[0]}</span>
                <span>{currentCam.latency}ms</span>
              </div>
            </div>

            {/* AI Bounding Box & Target Identifier Overlay */}
            {isAiOverlayActive && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Person 1 Reticle */}
                <div 
                  className="absolute border-2 border-[#26fedc] rounded-md shadow-[0_0_12px_rgba(38,254,220,0.5)] transition-all duration-700"
                  style={{ top: '24%', left: '38%', width: '22%', height: '56%' }}
                >
                  {/* Bounding tag header */}
                  <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-[#0b1326]/90 border border-[#26fedc] text-[11px] font-mono text-[#26fedc] flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md">
                    <UserCheck className="w-3 h-3 text-[#26fedc]" />
                    <span>Sajan K. • 98.7%</span>
                  </div>

                  {/* Facial reticle corner marks */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#a5e7ff]" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#a5e7ff]" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#a5e7ff]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#a5e7ff]" />

                  {/* Status chip */}
                  <div className="absolute -bottom-6 left-0 px-1.5 py-0.5 rounded bg-[#0b1326]/90 border border-[#3c494e] text-[10px] font-mono text-[#859399]">
                    HOSTEL RESIDENT (RM 304)
                  </div>
                </div>

                {/* Restricted Zone Perimeter Boundary */}
                {selectedFeedId === 'CAM-03' && (
                  <div className="absolute top-1/2 left-1/4 right-1/4 bottom-4 border-2 border-dashed border-[#ffb4ab] bg-[#93000a]/15 rounded-lg flex items-center justify-center">
                    <div className="px-3 py-1 rounded bg-[#93000a] text-[#ffdad6] font-mono text-xs font-bold border border-[#ffb4ab] flex items-center gap-2 animate-pulse">
                      <ShieldAlert className="w-4 h-4" />
                      RESTRICTED ZONE PERIMETER VIOLATION
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Stream Footer details */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-xs z-10">
              <div className="px-2.5 py-1 rounded-md bg-[#0b1326]/80 border border-[#3c494e]/60 text-[#bbc9cf] backdrop-blur-sm">
                ZONE: <span className="text-[#a5e7ff] font-semibold">{currentCam.zone}</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[#0b1326]/80 border border-[#3c494e]/60 text-[#26fedc] backdrop-blur-sm">
                ENCRYPTION: AES-256 RTSP
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="p-3 bg-[#131b2e] border-t border-[#3c494e]/30 flex items-center justify-between">
            <span className="text-xs text-[#859399] font-mono">Location: {currentCam.location}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectTab('live')}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#a5e7ff] hover:text-[#26fedc] hover:bg-[#171f33] border border-[#3c494e]/40 transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Multi-View Grid</span>
              </button>
              <button
                onClick={() => onSelectTab('cameras')}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#00d2ff] hover:text-[#26fedc] hover:bg-[#171f33] border border-[#00d2ff]/40 transition-colors flex items-center gap-1.5"
              >
                <span>Camera Fleet</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Recent Threat & Alert Inspector */}
        <div className="flex flex-col rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3c494e]/30">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />
              <h3 className="font-mono text-xs font-bold text-[#dae2fd]">LATEST INCIDENT DETECTED</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30">
              ACTION REQ.
            </span>
          </div>

          {/* Threat Feature Box */}
          <div className="p-3 rounded-xl bg-[#171f33] border border-[#ffb4ab]/30 space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-[#3c494e]/50 bg-black">
              <img
                src={IMAGES.evidence1}
                alt="Threat evidence"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[10px] font-mono font-bold">
                UNAUTHORIZED ACCESS
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0b1326]/80 text-[#26fedc] text-[10px] font-mono">
                CONFIDENCE: 94.2%
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#dae2fd] font-bold">EVT-9042 • Server Vault</span>
                <span className="text-[#859399]">10:42 AM</span>
              </div>
              <p className="text-xs text-[#bbc9cf] line-clamp-2">
                Unregistered subject detected attempting badge bypass at restricted vault entrance.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  const ev = events.find(e => e.id === 'EVT-9042') || events[0];
                  onSelectEvent(ev);
                  onSelectTab('events');
                }}
                className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-[#00d2ff]/20 to-[#26fedc]/20 hover:from-[#00d2ff]/30 hover:to-[#26fedc]/30 border border-[#00d2ff]/50 text-xs font-mono font-semibold text-[#a5e7ff] hover:text-[#26fedc] transition-all"
              >
                Inspect Evidence Details
              </button>
            </div>
          </div>

          {/* Quick System Integrity Progress */}
          <div className="p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#859399]">AI INFERENCE ENGINE LOAD</span>
              <span className="text-[#26fedc] font-bold">42% (12ms)</span>
            </div>
            <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#26fedc] to-[#00d2ff] h-full rounded-full" style={{ width: '42%' }} />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#859399]">
              <span>YOLO v11: OPTIMAL</span>
              <span>RESNET-512: READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Security Events Table */}
      <div className="rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 p-4 lg:p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#3c494e]/30">
          <div>
            <h3 className="font-mono text-sm font-bold text-[#dae2fd]">RECENT AUDIT & EVENT LOG</h3>
            <p className="text-xs text-[#859399] font-mono">Real-time classification feed across all camera sectors</p>
          </div>
          <button
            onClick={() => onSelectTab('events')}
            className="text-xs font-mono text-[#00d2ff] hover:text-[#26fedc] flex items-center gap-1 transition-colors"
          >
            View Complete Logs ({events.length}) →
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#3c494e]/40 text-[#859399] uppercase text-[11px]">
                <th className="py-2.5 px-3">Event ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Event Type</th>
                <th className="py-2.5 px-3">Camera / Sector</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">AI Confidence</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3c494e]/20 text-[#dae2fd]">
              {events.slice(0, 5).map((ev) => (
                <tr 
                  key={ev.id}
                  onClick={() => {
                    onSelectEvent(ev);
                    onSelectTab('events');
                  }}
                  className="hover:bg-[#171f33]/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-bold text-[#a5e7ff] group-hover:text-[#26fedc]">{ev.id}</td>
                  <td className="py-3 px-3 text-[#bbc9cf] whitespace-nowrap">{ev.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      ev.severity === 'critical'
                        ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                        : ev.severity === 'high'
                        ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                        : 'bg-[#00d2ff]/15 text-[#26fedc] border border-[#00d2ff]/30'
                    }`}>
                      {ev.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#bbc9cf]">{ev.camera}</td>
                  <td className="py-3 px-3 text-[#dae2fd] font-medium">{ev.personName || 'Unregistered'}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#0b1326] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${ev.confidence > 90 ? 'bg-[#26fedc]' : 'bg-[#00d2ff]'}`} 
                          style={{ width: `${ev.confidence}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#26fedc]">{ev.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[#bbc9cf] text-[11px]">{ev.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="px-2.5 py-1 rounded-lg bg-[#171f33] group-hover:bg-[#00d2ff]/20 text-[#a5e7ff] group-hover:text-[#26fedc] border border-[#3c494e]/50 text-[11px] transition-all">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
