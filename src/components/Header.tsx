import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  SlidersHorizontal,
  Flame,
  User,
  Clock,
  Radio,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { NavigationTab, Operator, SecurityAlert } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  operator: Operator;
  alerts: SecurityAlert[];
  onMarkAlertRead: (id: string) => void;
  onClearAllAlerts: () => void;
  onSimulateThreat: () => void;
  onOpenLogin: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  operator,
  alerts,
  onMarkAlertRead,
  onClearAllAlerts,
  onSimulateThreat,
  onOpenLogin,
  onSelectTab,
  searchTerm,
  onSearchChange
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [showAlertMenu, setShowAlertMenu] = useState<boolean>(false);
  const [showOperatorMenu, setShowOperatorMenu] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setDateString(
        now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
    dashboard: { title: 'Security Dashboard', subtitle: 'Hostel defense grid & live telemetry overview' },
    live: { title: 'Live Multi-Camera Matrix', subtitle: 'Real-time CCTV neural monitoring & PTZ streams' },
    events: { title: 'Security Event Logs', subtitle: 'Audit trail, AI threat classifications & subject inspection' },
    evidence: { title: 'Forensic Evidence Vault', subtitle: 'Captured snapshots, bounding reticles & incident reports' },
    cameras: { title: 'Camera Fleet Management', subtitle: 'Hardware status, RTSP streams & AI load distribution' },
    'face-registry': { title: 'Biometric Face Registry', subtitle: 'Authorized residents, staff permissions & facial embeddings' },
    system: { title: 'System Diagnostics & Health', subtitle: 'Hardware utilization, YOLO neural inference & logs' },
    settings: { title: 'System Configuration', subtitle: 'Thresholds, notification triggers & security policies' },
  };

  const currentInfo = tabTitles[currentTab] || tabTitles.dashboard;

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-20 w-full h-16 bg-[#0b1326]/90 backdrop-blur-xl border-b border-[#3c494e]/40 px-4 lg:px-6 flex items-center justify-between gap-4"
    >
      {/* Left Title & Status Indicator */}
      <div className="flex items-center gap-3 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-bold text-[#dae2fd] truncate">{currentInfo.title}</h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#26fedc]/10 text-[#26fedc] border border-[#26fedc]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#26fedc] animate-pulse" />
              LIVE
            </span>
          </div>
          <p className="hidden md:block text-xs text-[#859399] font-mono truncate">{currentInfo.subtitle}</p>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#859399]" />
          <input
            type="text"
            id="global-search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search subjects, cameras, events, room #..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#131b2e] border border-[#3c494e]/40 text-xs text-[#dae2fd] placeholder-[#859399] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]/40 transition-all font-mono"
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#859399] hover:text-[#dae2fd]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls & Clock & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Real-time Ticking Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131b2e] border border-[#3c494e]/40 font-mono text-xs text-[#a5e7ff]">
          <Clock className="w-3.5 h-3.5 text-[#26fedc]" />
          <span className="font-semibold">{timeString || '10:45:22 AM'}</span>
          <span className="text-[#859399] border-l border-[#3c494e] pl-2 text-[11px]">{dateString || 'OCT 24, 2023'}</span>
        </div>

        {/* Simulate Threat Trigger Button */}
        <button
          id="simulate-threat-btn"
          onClick={onSimulateThreat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono bg-[#93000a]/70 hover:bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 shadow-[0_0_12px_rgba(255,180,171,0.2)] transition-all transform active:scale-95"
          title="Simulate a real-time restricted area intrusion alert"
        >
          <Flame className="w-3.5 h-3.5 text-[#ffb4ab] animate-bounce" />
          <span className="hidden md:inline">Test Threat Alert</span>
          <span className="md:hidden">Test Alert</span>
        </button>

        {/* Notifications Bell with Dropdown */}
        <div className="relative">
          <button
            id="notifications-menu-btn"
            onClick={() => {
              setShowAlertMenu(!showAlertMenu);
              setShowOperatorMenu(false);
            }}
            className="relative p-2 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-[#3c494e]/40 text-[#bbc9cf] hover:text-[#26fedc] transition-all"
            title="Active Security Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/60 text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Alert Dropdown Drawer */}
          {showAlertMenu && (
            <div 
              id="notifications-dropdown"
              className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#131b2e] border border-[#3c494e] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#3c494e]/40">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />
                  <span className="text-xs font-mono font-bold text-[#dae2fd]">INCIDENT ALERTS ({alerts.length})</span>
                </div>
                {alerts.length > 0 && (
                  <button 
                    onClick={onClearAllAlerts}
                    className="text-[11px] font-mono text-[#859399] hover:text-[#a5e7ff] transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 py-2">
                {alerts.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#859399] font-mono">
                    <CheckCircle2 className="w-6 h-6 text-[#26fedc] mx-auto mb-1.5 opacity-80" />
                    No active threat alerts. System secure.
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      onClick={() => {
                        onMarkAlertRead(alert.id);
                        onSelectTab('events');
                        setShowAlertMenu(false);
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        alert.severity === 'critical'
                          ? 'bg-[#93000a]/20 border-[#ffb4ab]/40 hover:bg-[#93000a]/30'
                          : alert.severity === 'high'
                          ? 'bg-amber-950/20 border-amber-500/40 hover:bg-amber-950/30'
                          : 'bg-[#171f33] border-[#3c494e]/50 hover:bg-[#222a3d]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-xs font-semibold font-mono ${
                          alert.severity === 'critical' ? 'text-[#ffdad6]' : 'text-[#dae2fd]'
                        }`}>
                          {alert.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#859399] shrink-0">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#bbc9cf] mt-1 line-clamp-2">{alert.message}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-[#00d2ff]">{alert.camera || 'Grid Node'}</span>
                        <span className="text-[#26fedc] flex items-center gap-0.5 hover:underline">
                          View Event <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-[#3c494e]/40 text-center">
                <button
                  onClick={() => {
                    onSelectTab('events');
                    setShowAlertMenu(false);
                  }}
                  className="w-full py-1.5 text-xs font-mono text-[#00d2ff] hover:text-[#26fedc] transition-colors"
                >
                  Go to All Security Events →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Operator Profile Trigger */}
        <div className="relative">
          <button
            id="operator-profile-btn"
            onClick={() => {
              setShowOperatorMenu(!showOperatorMenu);
              setShowAlertMenu(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-[#3c494e]/40 transition-all"
          >
            <div className="w-6 h-6 rounded-lg overflow-hidden border border-[#00d2ff]/40">
              <img src={operator.avatar} alt={operator.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="hidden md:inline text-xs font-mono text-[#dae2fd]">{operator.name.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#859399]" />
          </button>

          {showOperatorMenu && (
            <div 
              id="operator-dropdown"
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#131b2e] border border-[#3c494e] shadow-2xl p-3 z-50 animate-in fade-in duration-150"
            >
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#171f33] border border-[#3c494e]/30">
                <img src={operator.avatar} alt={operator.name} className="w-10 h-10 rounded-lg object-cover border border-[#00d2ff]/40" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-[#dae2fd]">{operator.name}</h4>
                  <p className="text-[10px] font-mono text-[#26fedc]">{operator.badgeId} • {operator.role}</p>
                  <p className="text-[10px] font-mono text-[#859399]">{operator.shift}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1 font-mono text-xs">
                <button 
                  onClick={() => {
                    onSelectTab('settings');
                    setShowOperatorMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#bbc9cf] hover:text-[#a5e7ff] hover:bg-[#171f33]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#00d2ff]" />
                  Security Settings
                </button>
                <button 
                  onClick={() => {
                    onOpenLogin();
                    setShowOperatorMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#ffb4ab] hover:bg-[#93000a]/20"
                >
                  <User className="w-3.5 h-3.5" />
                  Switch / Log In Operator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
