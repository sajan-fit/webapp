import React, { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Camera as CameraIcon, 
  Radio, 
  Sparkles, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  UserCheck, 
  Grid, 
  Square,
  CheckCircle2,
  Download
} from 'lucide-react';
import { Camera, EvidenceItem, SecurityEvent } from '../types';
import { IMAGES } from '../mockData';

interface LiveMonitoringViewProps {
  cameras: Camera[];
  onTakeSnapshot: (cam: Camera) => void;
  onSimulateThreat: () => void;
}

export const LiveMonitoringView: React.FC<LiveMonitoringViewProps> = ({
  cameras,
  onTakeSnapshot,
  onSimulateThreat
}) => {
  const [selectedCamId, setSelectedCamId] = useState<string | null>(null);
  const [aiBoundingActive, setAiBoundingActive] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [snapshotToast, setSnapshotToast] = useState<string | null>(null);

  const handleCapture = (cam: Camera) => {
    onTakeSnapshot(cam);
    setSnapshotToast(`Snapshot captured from ${cam.id} and added to Evidence Vault!`);
    setTimeout(() => setSnapshotToast(null), 3000);
  };

  const currentFocusedCam = selectedCamId ? cameras.find(c => c.id === selectedCamId) : null;

  return (
    <div id="live-monitoring-view" className="p-4 lg:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {snapshotToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{snapshotToast}</span>
        </div>
      )}

      {/* Control Header Bar */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#26fedc] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#dae2fd]">LIVE CCTV MATRIX:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCamId(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                selectedCamId === null
                  ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50'
                  : 'bg-[#171f33] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]/40'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Multi-Grid (4x)</span>
            </button>

            {cameras.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCamId(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCamId === c.id
                    ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50'
                    : 'bg-[#171f33] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]/40'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Global Matrix Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiBoundingActive(!aiBoundingActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              aiBoundingActive
                ? 'bg-[#26fedc]/15 text-[#26fedc] border border-[#26fedc]/40'
                : 'bg-[#171f33] text-[#859399] border border-[#3c494e]/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Reticle {aiBoundingActive ? 'Active' : 'Off'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-[#171f33] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors"
            title={isMuted ? "Unmute Ambient Mic" : "Mute Mic"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#26fedc]" />}
          </button>

          <button
            onClick={onSimulateThreat}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#93000a]/80 hover:bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#ffb4ab]" />
            <span>Simulate Alarm</span>
          </button>
        </div>
      </div>

      {/* Main Stream Area */}
      {selectedCamId && currentFocusedCam ? (
        /* SINGLE FOCUSED FEED VIEW WITH PTZ CONTROLS */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 overflow-hidden shadow-2xl">
            <div className="p-3.5 bg-[#171f33] border-b border-[#3c494e]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#93000a] animate-ping" />
                <span className="text-[#dae2fd] font-bold">{currentFocusedCam.id}: {currentFocusedCam.name}</span>
                <span className="text-[#859399]">({currentFocusedCam.location})</span>
              </div>
              <button 
                onClick={() => setSelectedCamId(null)}
                className="px-2.5 py-1 rounded-lg bg-[#0b1326] text-xs font-mono text-[#a5e7ff] hover:text-[#26fedc] border border-[#3c494e]/40"
              >
                Back to Grid View
              </button>
            </div>

            <div className="relative aspect-video bg-black overflow-hidden group">
              <img
                src={currentFocusedCam.thumbnail}
                alt={currentFocusedCam.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 cctv-scanline" />

              {/* HUD */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-md bg-[#0b1326]/80 text-xs font-mono text-[#a5e7ff] border border-[#3c494e]/50 backdrop-blur-md">
                <span className="text-[#ffb4ab] font-bold">● LIVE 4K</span>
                <span>{currentFocusedCam.fps} FPS</span>
                <span>{currentFocusedCam.latency}ms</span>
              </div>

              {aiBoundingActive && (
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute border-2 border-[#26fedc] rounded-md shadow-[0_0_15px_rgba(38,254,220,0.6)]"
                    style={{ top: '22%', left: '34%', width: '28%', height: '62%' }}
                  >
                    <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-[#0b1326]/90 border border-[#26fedc] text-xs font-mono text-[#26fedc] flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{currentFocusedCam.id === 'CAM-01' ? 'Sajan K. • 98.7%' : currentFocusedCam.id === 'CAM-03' ? 'INTRUSION THREAT' : 'TARGET ACQUIRED • 94.2%'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stream bar */}
            <div className="p-3 bg-[#131b2e] border-t border-[#3c494e]/30 flex items-center justify-between">
              <span className="text-xs font-mono text-[#859399]">Stream Protocol: {currentFocusedCam.streamUrl}</span>
              <button
                onClick={() => handleCapture(currentFocusedCam)}
                className="px-3 py-1.5 rounded-xl bg-[#00d2ff]/20 hover:bg-[#00d2ff]/30 text-[#26fedc] border border-[#00d2ff]/40 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <CameraIcon className="w-3.5 h-3.5" />
                <span>Capture Snapshot</span>
              </button>
            </div>
          </div>

          {/* PTZ and Camera Stats Inspector */}
          <div className="space-y-4">
            {/* PTZ Controller */}
            <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
              <h4 className="font-mono text-xs font-bold text-[#dae2fd] pb-2 border-b border-[#3c494e]/30">
                PTZ CAMERA CONTROLLER
              </h4>

              <div className="flex flex-col items-center justify-center py-2">
                <button className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors mb-2">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <button className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-[#0b1326] border border-[#00d2ff]/40 flex items-center justify-center font-mono text-[10px] text-[#26fedc]">
                    PTZ
                  </div>
                  <button className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors mt-2">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Zoom Buttons */}
              <div className="pt-2 border-t border-[#3c494e]/30 flex items-center justify-between gap-2 font-mono text-xs">
                <button 
                  onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                  className="flex-1 py-1.5 rounded-xl bg-[#171f33] text-[#bbc9cf] hover:text-[#dae2fd] border border-[#3c494e]/40 flex items-center justify-center gap-1"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>Zoom -</span>
                </button>
                <span className="text-[#26fedc] font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
                <button 
                  onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
                  className="flex-1 py-1.5 rounded-xl bg-[#171f33] text-[#bbc9cf] hover:text-[#dae2fd] border border-[#3c494e]/40 flex items-center justify-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Zoom +</span>
                </button>
              </div>
            </div>

            {/* Stream Telemetry */}
            <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl font-mono text-xs space-y-2.5">
              <h4 className="font-bold text-[#dae2fd] pb-2 border-b border-[#3c494e]/30">STREAM TELEMETRY</h4>
              <div className="flex justify-between text-[#859399]">
                <span>Resolution</span>
                <span className="text-[#dae2fd]">{currentFocusedCam.resolution}</span>
              </div>
              <div className="flex justify-between text-[#859399]">
                <span>Bitrate</span>
                <span className="text-[#26fedc]">4.8 Mbps (H.265)</span>
              </div>
              <div className="flex justify-between text-[#859399]">
                <span>IP Address</span>
                <span className="text-[#dae2fd]">{currentFocusedCam.ip}</span>
              </div>
              <div className="flex justify-between text-[#859399]">
                <span>Zone Clearance</span>
                <span className="text-[#00d2ff]">{currentFocusedCam.zone}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 4-GRID CCTV MATRIX */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {cameras.slice(0, 4).map((cam) => (
            <div 
              key={cam.id}
              id={`grid-camera-${cam.id}`}
              className="group rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/50 overflow-hidden shadow-xl transition-all"
            >
              {/* Card top bar */}
              <div className="p-2.5 bg-[#171f33] border-b border-[#3c494e]/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cam.status === 'Alert' ? 'bg-[#93000a] animate-ping' : 'bg-[#26fedc] animate-pulse'}`} />
                  <span className="font-bold text-[#dae2fd]">{cam.id}: {cam.name}</span>
                </div>
                <span className="text-[10px] text-[#859399]">{cam.location}</span>
              </div>

              {/* Feed Preview */}
              <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setSelectedCamId(cam.id)}>
                <img
                  src={cam.thumbnail}
                  alt={cam.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 cctv-scanline" />

                {/* Status HUD */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b1326]/80 text-[10px] font-mono text-[#a5e7ff] border border-[#3c494e]/40 backdrop-blur-sm">
                  {cam.fps} FPS • {cam.latency}ms
                </div>

                {cam.status === 'Alert' && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[10px] font-mono font-bold border border-[#ffb4ab] animate-pulse">
                    ALERT ACTIVE
                  </div>
                )}

                {/* AI Reticle if enabled */}
                {aiBoundingActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    {cam.id === 'CAM-01' ? (
                      <div 
                        className="absolute border border-[#26fedc] rounded shadow-[0_0_8px_#26fedc]"
                        style={{ top: '25%', left: '35%', width: '25%', height: '55%' }}
                      >
                        <span className="absolute -top-5 left-0 px-1 rounded bg-[#0b1326]/90 text-[9px] font-mono text-[#26fedc] border border-[#26fedc]">
                          Sajan K. (98.7%)
                        </span>
                      </div>
                    ) : cam.id === 'CAM-03' ? (
                      <div 
                        className="absolute border-2 border-[#ffb4ab] rounded bg-[#93000a]/20 shadow-[0_0_8px_#ffb4ab]"
                        style={{ top: '20%', left: '25%', width: '45%', height: '60%' }}
                      >
                        <span className="absolute -top-5 left-0 px-1 rounded bg-[#93000a] text-[9px] font-mono text-[#ffdad6] border border-[#ffb4ab]">
                          RESTRICTED INTRUSION
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-[11px] font-mono text-[#dae2fd]">Click to Expand Stream</span>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleCapture(cam)}
                      className="p-1.5 rounded-lg bg-[#0b1326]/90 text-[#26fedc] hover:bg-[#00d2ff] hover:text-[#003543] border border-[#26fedc]/40 transition-colors"
                      title="Take Snapshot"
                    >
                      <CameraIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedCamId(cam.id)}
                      className="p-1.5 rounded-lg bg-[#0b1326]/90 text-[#a5e7ff] hover:bg-[#00d2ff] hover:text-[#003543] border border-[#00d2ff]/40 transition-colors"
                      title="Expand View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
