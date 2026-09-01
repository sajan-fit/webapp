/**
 * VisionGuard AI - Hostel CCTV Security & Threat Intelligence Platform
 */
import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  EvidenceItem, 
  EventStatus, 
  NavigationTab, 
  Operator, 
  RegisteredPerson, 
  SecurityAlert, 
  SecurityEvent, 
  SettingsConfig, 
  SystemLog, 
  SystemMetric 
} from './types';
import { 
  INITIAL_ALERTS, 
  INITIAL_CAMERAS, 
  INITIAL_EVENTS, 
  INITIAL_EVIDENCE, 
  INITIAL_LOGS, 
  INITIAL_METRICS, 
  INITIAL_OPERATOR, 
  INITIAL_PEOPLE, 
  INITIAL_SETTINGS,
  IMAGES
} from './mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { LiveMonitoringView } from './components/LiveMonitoringView';
import { SecurityEventsView } from './components/SecurityEventsView';
import { EvidenceView } from './components/EvidenceView';
import { CamerasView } from './components/CamerasView';
import { FaceRegistryView } from './components/FaceRegistryView';
import { SystemStatusView } from './components/SystemStatusView';
import { SettingsView } from './components/SettingsView';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // App Core State
  const [operator, setOperator] = useState<Operator>(() => {
    const saved = localStorage.getItem('visionguard_operator');
    return saved ? JSON.parse(saved) : INITIAL_OPERATOR;
  });

  const [cameras, setCameras] = useState<Camera[]>(() => {
    const saved = localStorage.getItem('visionguard_cameras');
    return saved ? JSON.parse(saved) : INITIAL_CAMERAS;
  });

  const [events, setEvents] = useState<SecurityEvent[]>(() => {
    const saved = localStorage.getItem('visionguard_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => {
    const saved = localStorage.getItem('visionguard_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
  });

  const [people, setPeople] = useState<RegisteredPerson[]>(() => {
    const saved = localStorage.getItem('visionguard_people');
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });

  const [alerts, setAlerts] = useState<SecurityAlert[]>(() => {
    const saved = localStorage.getItem('visionguard_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [metrics, setMetrics] = useState<SystemMetric[]>(() => {
    const saved = localStorage.getItem('visionguard_metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [logs, setLogs] = useState<SystemLog[]>(() => {
    const saved = localStorage.getItem('visionguard_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [settings, setSettings] = useState<SettingsConfig>(() => {
    const saved = localStorage.getItem('visionguard_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(events[0] || null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('visionguard_operator', JSON.stringify(operator));
  }, [operator]);

  useEffect(() => {
    localStorage.setItem('visionguard_cameras', JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem('visionguard_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('visionguard_evidence', JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem('visionguard_people', JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem('visionguard_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('visionguard_settings', JSON.stringify(settings));
  }, [settings]);

  // Handlers
  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
  };

  const handleUpdateEventStatus = (id: string, status: EventStatus, notes?: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status, ...(notes ? { notes } : {}) } : e));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(prev => prev ? { ...prev, status, ...(notes ? { notes } : {}) } : null);
    }
  };

  const handleFlagEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, flagged: !e.flagged } : e));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(prev => prev ? { ...prev, flagged: !prev.flagged } : null);
    }
  };

  const handleToggleEvidenceFlag = (id: string) => {
    setEvidence(prev => prev.map(item => item.id === id ? { ...item, flagged: !item.flagged } : item));
  };

  const handleAddCamera = (newCam: Camera) => {
    setCameras(prev => [newCam, ...prev]);
    // Add system log
    const newLog: SystemLog = {
      id: `l-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'INFO',
      service: 'FleetManager',
      message: `Camera node ${newCam.id} (${newCam.name}) registered with RTSP pipeline.`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleAddPerson = (newPerson: RegisteredPerson) => {
    setPeople(prev => [newPerson, ...prev]);
    const newLog: SystemLog = {
      id: `l-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'SUCCESS',
      service: 'FaceNet-v4',
      message: `New biometric facial identity enrolled: ${newPerson.name} (${newPerson.role}).`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleTakeSnapshot = (cam: Camera) => {
    const newEvidence: EvidenceItem = {
      id: `EVD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US'),
      title: `Manual Snapshot: ${cam.name}`,
      description: `Operator snapshot captured during active surveillance scan on ${cam.id} (${cam.location}).`,
      camera: cam.id,
      tag: 'Manual Forensic Capture',
      type: 'Surveillance Capture',
      thumbnail: cam.thumbnail,
      fullImage: cam.thumbnail,
      flagged: false,
      confidence: 96.5,
      subject: 'Surveillance Frame',
      officerNotes: `Saved by ${operator.name}.`
    };
    setEvidence(prev => [newEvidence, ...prev]);
  };

  const handleSimulateThreat = () => {
    const newEvtId = `EVT-${Math.floor(9100 + Math.random() * 800)}`;
    const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const newEvent: SecurityEvent = {
      id: newEvtId,
      timestamp: `${timeNow} (Just Now)`,
      type: 'Restricted Area',
      camera: 'CAM-03 (Server Room Basement)',
      cameraId: 'CAM-03',
      confidence: 95.8,
      status: 'Pending Review',
      severity: 'critical',
      image: IMAGES.evidence1,
      personName: 'Unidentified Intruder #99',
      subjectCrop: IMAGES.sajanSubjectDetail,
      zone: 'Zone 4 - Server Vault',
      actionTaken: 'High priority audio alarm emitted; Incident dispatched to patrol',
      notes: 'Automated YOLO tripwire sensor breach flagged.',
      flagged: true
    };

    const newAlert: SecurityAlert = {
      id: `alt-${Date.now()}`,
      timestamp: timeNow,
      title: `CRITICAL: Restricted Intrusion on CAM-03`,
      message: `Unauthorized subject detected crossing perimeter line in Server Vault.`,
      severity: 'critical',
      read: false,
      eventId: newEvtId,
      camera: 'CAM-03'
    };

    const newLog: SystemLog = {
      id: `l-${Date.now()}`,
      timestamp: timeNow,
      level: 'CRITICAL',
      service: 'YOLO-Perimeter',
      message: `Tripwire perimeter violation recorded on CAM-03 [Zone 4]. Siren relay engaged.`
    };

    setEvents(prev => [newEvent, ...prev]);
    setAlerts(prev => [newAlert, ...prev]);
    setLogs(prev => [newLog, ...prev]);
    setSelectedEvent(newEvent);
  };

  const handleTriggerDiagnostics = () => {
    setMetrics(prev => prev.map(m => ({
      ...m,
      load: Math.floor(Math.random() * 25) + 30,
      healthScore: 99
    })));
  };

  const unreadAlertCount = alerts.filter(a => !a.read).length;

  return (
    <div className="flex h-screen w-screen bg-[#0b1326] text-[#dae2fd] overflow-hidden select-none font-['Inter',sans-serif]">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        operator={operator}
        onOpenLogin={() => setShowLoginModal(true)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        unreadAlertCount={unreadAlertCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Header Bar */}
        <Header
          currentTab={currentTab}
          operator={operator}
          alerts={alerts}
          onMarkAlertRead={handleMarkAlertRead}
          onClearAllAlerts={handleClearAllAlerts}
          onSimulateThreat={handleSimulateThreat}
          onOpenLogin={() => setShowLoginModal(true)}
          onSelectTab={setCurrentTab}
          searchTerm={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0b1326]/60">
          {currentTab === 'dashboard' && (
            <DashboardView
              cameras={cameras}
              events={events}
              people={people}
              evidence={evidence}
              onSelectTab={setCurrentTab}
              onSelectEvent={setSelectedEvent}
              onSimulateThreat={handleSimulateThreat}
            />
          )}

          {currentTab === 'live' && (
            <LiveMonitoringView
              cameras={cameras}
              onTakeSnapshot={handleTakeSnapshot}
              onSimulateThreat={handleSimulateThreat}
            />
          )}

          {currentTab === 'events' && (
            <SecurityEventsView
              events={events}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
              onUpdateEventStatus={handleUpdateEventStatus}
              onFlagEvent={handleFlagEvent}
            />
          )}

          {currentTab === 'evidence' && (
            <EvidenceView
              evidence={evidence}
              onToggleFlag={handleToggleEvidenceFlag}
            />
          )}

          {currentTab === 'cameras' && (
            <CamerasView
              cameras={cameras}
              onAddCamera={handleAddCamera}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'face-registry' && (
            <FaceRegistryView
              people={people}
              onAddPerson={handleAddPerson}
            />
          )}

          {currentTab === 'system' && (
            <SystemStatusView
              metrics={metrics}
              logs={logs}
              onTriggerDiagnostics={handleTriggerDiagnostics}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={setSettings}
            />
          )}
        </main>
      </div>

      {/* Operator Authentication & Session Switcher Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        currentOperator={operator}
        onLogin={setOperator}
      />
    </div>
  );
}
