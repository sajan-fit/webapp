import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  ShieldAlert, 
  FolderLock, 
  Camera as CameraIcon, 
  UserCheck, 
  Activity, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { NavigationTab, Operator } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  operator: Operator;
  onOpenLogin: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  unreadAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  operator,
  onOpenLogin,
  isCollapsed,
  onToggleCollapse,
  unreadAlertCount
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Video },
    { id: 'events', label: 'Security Events', icon: ShieldAlert, badge: unreadAlertCount },
    { id: 'evidence', label: 'Evidence Log', icon: FolderLock },
    { id: 'cameras', label: 'Cameras', icon: CameraIcon },
    { id: 'face-registry', label: 'Face Registry', icon: UserCheck },
    { id: 'system', label: 'System Status', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      id="main-sidebar"
      className={`relative flex flex-col justify-between h-screen bg-[#0b1326]/95 border-r border-[#3c494e]/40 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div className="p-4 flex flex-col border-b border-[#3c494e]/30">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d2ff]/20 to-[#26fedc]/10 border border-[#00d2ff]/40 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
              <ShieldCheck className="w-6 h-6 text-[#26fedc]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#26fedc] ring-2 ring-[#0b1326] animate-pulse" />
            </div>
            
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold tracking-wider text-base text-[#dae2fd]">VISIONGUARD</span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/30">AI</span>
                </div>
                <span className="text-[11px] font-mono text-[#859399] tracking-wide">HOSTEL SECURITY v4.2</span>
              </div>
            )}
          </div>

          <button 
            id="sidebar-toggle-btn"
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-[#171f33] border border-[#3c494e]/50 text-[#bbc9cf] hover:text-[#26fedc] hover:border-[#00d2ff]/50 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Live system radio status badge */}
        {!isCollapsed && (
          <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#131b2e] border border-[#3c494e]/30 text-xs font-mono text-[#bbc9cf]">
            <Radio className="w-3.5 h-3.5 text-[#26fedc] animate-pulse" />
            <span className="text-[11px]">DEFENSE GRID:</span>
            <span className="text-[#26fedc] font-semibold">ACTIVE</span>
            <span className="ml-auto text-[10px] text-[#859399]">30 FPS</span>
          </div>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-[#859399] px-3 mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#00d2ff]/20 to-[#26fedc]/10 text-[#a5e7ff] border border-[#00d2ff]/40 shadow-[0_0_12px_rgba(0,210,255,0.15)]'
                  : 'text-[#bbc9cf] hover:text-[#dae2fd] hover:bg-[#171f33]/70 border border-transparent'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active neon accent pill on left */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-[#26fedc] shadow-[0_0_8px_#26fedc]" />
              )}

              <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#26fedc]' : 'text-[#859399] group-hover:text-[#a5e7ff]'}`} />
              
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {item.badge && item.badge > 0 ? (
                <span className={`ml-auto font-mono text-xs px-2 py-0.5 rounded-full font-bold bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 animate-pulse ${isCollapsed ? 'absolute top-1 right-1 px-1 text-[10px]' : ''}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Bottom Operator Profile Card */}
      <div className="p-3 border-t border-[#3c494e]/30 bg-[#131b2e]/60">
        <div 
          onClick={onOpenLogin}
          className="flex items-center gap-3 p-2 rounded-xl bg-[#171f33]/90 hover:bg-[#222a3d] border border-[#3c494e]/40 hover:border-[#00d2ff]/40 cursor-pointer transition-all duration-200"
          title="Click to view operator details or switch session"
        >
          <div className="relative w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-[#00d2ff]/50 bg-[#0b1326]">
            <img 
              src={operator.avatar} 
              alt={operator.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#26fedc] ring-1 ring-[#0b1326]" />
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#dae2fd] truncate">{operator.name}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#859399]">
                <span>{operator.badgeId}</span>
                <span className="text-[#26fedc]">ONLINE</span>
              </div>
            </div>
          )}

          {!isCollapsed && (
            <LogOut className="w-4 h-4 text-[#859399] hover:text-[#ffb4ab] shrink-0" />
          )}
        </div>
      </div>
    </aside>
  );
};
