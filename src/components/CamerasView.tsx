import React, { useState } from 'react';
import { 
  Camera as CameraIcon, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Sliders, 
  Trash2, 
  Activity, 
  Wifi, 
  Eye, 
  X,
  Play,
  Settings
} from 'lucide-react';
import { Camera, NavigationTab } from '../types';
import { IMAGES } from '../mockData';

interface CamerasViewProps {
  cameras: Camera[];
  onAddCamera: (newCam: Camera) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const CamerasView: React.FC<CamerasViewProps> = ({
  cameras,
  onAddCamera,
  onSelectTab
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for new camera
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [ip, setIp] = useState<string>('192.168.10.107');
  const [resolution, setResolution] = useState<string>('1080p (1920x1080)');
  const [fps, setFps] = useState<number>(30);
  const [zone, setZone] = useState<string>('Zone 2 (Hostel Common)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    const newId = `CAM-0${cameras.length + 1}`;
    const newCamera: Camera = {
      id: newId,
      name,
      location,
      ip,
      resolution,
      fps,
      status: 'Online',
      uptime: '100.0%',
      latency: Math.floor(Math.random() * 10) + 12,
      aiActive: true,
      streamUrl: `rtsp://visionguard-hostel/${newId.toLowerCase()}/live`,
      thumbnail: IMAGES.cctvCorridor,
      zone
    };

    onAddCamera(newCamera);
    setShowAddModal(false);
    setName('');
    setLocation('');
    showToast(`Camera ${newId} initialized and mounted to defense grid.`);
  };

  return (
    <div id="cameras-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Add Action */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CameraIcon className="w-5 h-5 text-[#26fedc]" />
            <h2 className="font-mono text-sm font-bold text-[#dae2fd]">CAMERA FLEET & RTSP INGESTION</h2>
          </div>
          <p className="font-mono text-xs text-[#859399]">6 Hardware Nodes • 120 FPS Aggregate • H.265 Hardware Decoded</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff]/20 to-[#26fedc]/20 hover:from-[#00d2ff]/30 hover:to-[#26fedc]/30 border border-[#00d2ff]/50 text-xs font-mono font-bold text-[#26fedc] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Mount New Camera</span>
        </button>
      </div>

      {/* Camera Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            id={`camera-fleet-card-${cam.id}`}
            className="rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all font-mono"
          >
            {/* Header */}
            <div className="p-3 bg-[#171f33] border-b border-[#3c494e]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cam.status === 'Alert' ? 'bg-[#93000a] animate-ping' : 'bg-[#26fedc] animate-pulse'}`} />
                <span className="font-bold text-[#dae2fd]">{cam.id}</span>
                <span className="text-[#859399]">({cam.ip})</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                cam.status === 'Online' ? 'bg-[#26fedc]/15 text-[#26fedc] border border-[#26fedc]/30' : 'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30'
              }`}>
                {cam.status}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-video bg-black overflow-hidden group">
              <img 
                src={cam.thumbnail} 
                alt={cam.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 cctv-scanline" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b1326]/80 text-[10px] text-[#a5e7ff] border border-[#3c494e]/50">
                {cam.resolution.split(' ')[0]} • {cam.fps} FPS
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0b1326]/80 text-[10px] text-[#26fedc] border border-[#26fedc]/30">
                LATENCY: {cam.latency}ms
              </div>
            </div>

            {/* Info details */}
            <div className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#dae2fd] text-sm">{cam.name}</h3>
                <p className="text-[#bbc9cf] text-[11px] mt-0.5">{cam.location}</p>
                <div className="mt-2 text-[10px] text-[#859399]">
                  Zone: <span className="text-[#a5e7ff]">{cam.zone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#3c494e]/30 flex items-center justify-between">
                <button
                  onClick={() => showToast(`Ping heartbeat on ${cam.id}: 12ms (Loss: 0%)`)}
                  className="px-2.5 py-1 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] text-[11px] border border-[#3c494e]/40 transition-colors flex items-center gap-1"
                >
                  <Wifi className="w-3 h-3" />
                  <span>Ping</span>
                </button>

                <button
                  onClick={() => onSelectTab('live')}
                  className="px-3 py-1 rounded-xl bg-[#00d2ff]/20 hover:bg-[#00d2ff]/30 text-[#26fedc] text-[11px] border border-[#00d2ff]/40 transition-all flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Live Stream</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Camera Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#131b2e] border border-[#00d2ff]/40 shadow-2xl overflow-hidden font-mono animate-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#171f33] border-b border-[#3c494e]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CameraIcon className="w-4 h-4 text-[#26fedc]" />
                <h3 className="text-xs font-bold text-[#dae2fd]">MOUNT NEW CAMERA STREAM</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded bg-[#0b1326] text-[#859399] hover:text-[#dae2fd]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCamera} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#859399]">Camera Name / Descriptor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. East Wing Bicycle Shed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#859399]">Physical Location & Hostel Block</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Block B - 1st Floor Entry"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#859399]">Static IP Address</label>
                  <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#859399]">FPS Target</label>
                  <select
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                  >
                    <option value={25}>25 FPS (Standard)</option>
                    <option value={30}>30 FPS (Smooth)</option>
                    <option value={60}>60 FPS (High Speed)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#859399]">Zone Clearance Level</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
                >
                  <option value="Zone 1 (Public Access)">Zone 1 (Public Access)</option>
                  <option value="Zone 2 (Hostel Common)">Zone 2 (Hostel Common)</option>
                  <option value="Zone 3 (Perimeter)">Zone 3 (Perimeter)</option>
                  <option value="Zone 4 (Restricted Level 3)">Zone 4 (Restricted Level 3)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#3c494e]/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#0b1326] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#26fedc] text-[#003543] font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all"
                >
                  Mount Camera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
