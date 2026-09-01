import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Flag, 
  UserCheck, 
  Camera as CameraIcon, 
  Clock, 
  MapPin, 
  X,
  FileText,
  BookmarkPlus
} from 'lucide-react';
import { EventStatus, EventType, SecurityEvent } from '../types';

interface SecurityEventsViewProps {
  events: SecurityEvent[];
  selectedEvent: SecurityEvent | null;
  onSelectEvent: (event: SecurityEvent) => void;
  onUpdateEventStatus: (id: string, status: EventStatus, notes?: string) => void;
  onFlagEvent: (id: string) => void;
}

export const SecurityEventsView: React.FC<SecurityEventsViewProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onUpdateEventStatus,
  onFlagEvent
}) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize or fallback selected event
  const activeEvent = selectedEvent || events[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = 
      ev.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      ev.camera.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (ev.personName && ev.personName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      ev.zone.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchesType = selectedType === 'All' || ev.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || ev.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const exportData = (format: 'csv' | 'json') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filteredEvents, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VisionGuard_Security_Events_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    } else {
      const headers = ['ID,Timestamp,Type,Camera,Confidence,Status,Severity,Person,Zone\n'];
      const rows = filteredEvents.map(e => 
        `"${e.id}","${e.timestamp}","${e.type}","${e.camera}","${e.confidence}%","${e.status}","${e.severity}","${e.personName || ''}","${e.zone}"`
      );
      const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VisionGuard_Security_Events_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    }
    showToast(`Exported ${filteredEvents.length} events as ${format.toUpperCase()}`);
  };

  return (
    <div id="security-events-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Action Header */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#26fedc]" />
            <h2 className="font-mono text-sm font-bold text-[#dae2fd]">SECURITY AUDIT LOGS & CLASSIFICATION</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportData('csv')}
              className="px-3 py-1.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => exportData('json')}
              className="px-3 py-1.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[#3c494e]/30 font-mono text-xs">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#859399]" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search event, camera, person..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-[#dae2fd] placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          {/* Event Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
          >
            <option value="All">All Event Types</option>
            <option value="Restricted Area">Restricted Area</option>
            <option value="Authorized Access">Authorized Access</option>
            <option value="Forced Entry">Forced Entry</option>
            <option value="Unrecognized Face">Unrecognized Face</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Verified">Verified</option>
            <option value="Action Taken">Action Taken</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
          >
            <option value="24h">Past 24 Hours</option>
            <option value="7d">Past 7 Days</option>
            <option value="30d">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Forensic Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Table (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl overflow-hidden">
          <div className="p-3 bg-[#171f33] border-b border-[#3c494e]/30 flex items-center justify-between font-mono text-xs">
            <span className="text-[#bbc9cf]">DISPLAYING {filteredEvents.length} INCIDENTS</span>
            <span className="text-[#859399]">CLICK ROW TO INSPECT</span>
          </div>

          <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="sticky top-0 bg-[#131b2e] border-b border-[#3c494e]/40 text-[#859399] z-10">
                <tr>
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Camera</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3c494e]/20 text-[#dae2fd]">
                {filteredEvents.map((ev) => {
                  const isSelected = activeEvent?.id === ev.id;
                  return (
                    <tr
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#00d2ff]/15 border-l-4 border-l-[#26fedc]' 
                          : 'hover:bg-[#171f33]/70'
                      }`}
                    >
                      <td className="py-3 px-3 font-bold text-[#a5e7ff]">{ev.id}</td>
                      <td className="py-3 px-3 text-[#bbc9cf] whitespace-nowrap text-[11px]">{ev.timestamp.split(' ')[0]} {ev.timestamp.split(' ')[1]}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ev.severity === 'critical'
                            ? 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30'
                            : ev.severity === 'high'
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                            : 'bg-[#00d2ff]/15 text-[#26fedc] border border-[#00d2ff]/30'
                        }`}>
                          {ev.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#bbc9cf] text-[11px]">{ev.cameraId}</td>
                      <td className="py-3 px-3 text-[#dae2fd]">{ev.personName || 'Unknown'}</td>
                      <td className="py-3 px-3 text-[#26fedc]">{ev.confidence}%</td>
                      <td className="py-3 px-3 text-[11px] text-[#bbc9cf]">{ev.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forensic Event Inspector (1 Col) */}
        {activeEvent && (
          <div className="rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 p-4 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#3c494e]/30">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />
                <h3 className="font-bold text-[#dae2fd]">FORENSIC INSPECTOR: {activeEvent.id}</h3>
              </div>
              <button
                onClick={() => {
                  onFlagEvent(activeEvent.id);
                  showToast(activeEvent.flagged ? 'Flag removed.' : 'Event flagged for security review.');
                }}
                className={`p-1.5 rounded-lg border transition-all ${
                  activeEvent.flagged
                    ? 'bg-[#93000a] text-[#ffdad6] border-[#ffb4ab]'
                    : 'bg-[#171f33] text-[#859399] hover:text-[#ffb4ab] border-[#3c494e]/40'
                }`}
                title="Flag for Escalation"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Evidence Visual Capture */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#3c494e]/50 bg-black">
              <img 
                src={activeEvent.image} 
                alt="Event Evidence" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 cctv-scanline" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b1326]/90 text-[10px] text-[#ffb4ab] font-bold border border-[#ffb4ab]/30">
                {activeEvent.type.toUpperCase()}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0b1326]/90 text-[10px] text-[#26fedc] border border-[#26fedc]/30">
                CONFIDENCE: {activeEvent.confidence}%
              </div>
            </div>

            {/* Subject Face Crop Comparison */}
            {activeEvent.subjectCrop && (
              <div className="p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30 flex items-center gap-3">
                <img 
                  src={activeEvent.subjectCrop} 
                  alt="Subject Face Reticle" 
                  className="w-14 h-14 rounded-lg object-cover border border-[#00d2ff]/40 bg-[#0b1326]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] text-[#859399]">BIOMETRIC MATCH EMBEDDING</span>
                  <div className="text-xs font-bold text-[#dae2fd] truncate">{activeEvent.personName || 'Unregistered Face'}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#26fedc]">Cosine: {activeEvent.confidence}%</span>
                    <span className="text-[10px] text-[#859399]">ResNet-512</span>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Parameters */}
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#3c494e]/20 text-[#859399]">
                <span>Camera Sector:</span>
                <span className="text-[#dae2fd]">{activeEvent.camera}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3c494e]/20 text-[#859399]">
                <span>Zone Location:</span>
                <span className="text-[#a5e7ff]">{activeEvent.zone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3c494e]/20 text-[#859399]">
                <span>Timestamp:</span>
                <span className="text-[#dae2fd]">{activeEvent.timestamp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3c494e]/20 text-[#859399]">
                <span>Action Taken:</span>
                <span className="text-[#26fedc]">{activeEvent.actionTaken || 'None'}</span>
              </div>
            </div>

            {/* Status Adjustment */}
            <div className="space-y-2 pt-2 border-t border-[#3c494e]/30">
              <label className="text-[11px] text-[#859399]">UPDATE INCIDENT STATUS:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Pending Review', 'Verified', 'Action Taken', 'Resolved'] as EventStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateEventStatus(activeEvent.id, st);
                      showToast(`Status updated to "${st}"`);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold border transition-all ${
                      activeEvent.status === st
                        ? 'bg-[#00d2ff]/20 text-[#26fedc] border-[#00d2ff]'
                        : 'bg-[#171f33] text-[#bbc9cf] hover:text-[#dae2fd] border-[#3c494e]/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
