export type NavigationTab = 
  | 'dashboard'
  | 'live'
  | 'events'
  | 'evidence'
  | 'cameras'
  | 'face-registry'
  | 'system'
  | 'settings';

export type EventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type EventStatus = 'Pending Review' | 'Verified' | 'False Positive' | 'Resolved' | 'Action Taken';
export type EventType = 'Restricted Area' | 'Authorized Access' | 'Unrecognized Face' | 'Forced Entry' | 'Loitering' | 'Tailgating';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: EventType;
  camera: string;
  cameraId: string;
  confidence: number;
  status: EventStatus;
  severity: EventSeverity;
  image: string;
  personName?: string;
  subjectCrop?: string;
  zone: string;
  actionTaken?: string;
  notes?: string;
  flagged?: boolean;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  ip: string;
  resolution: string;
  fps: number;
  status: 'Online' | 'Offline' | 'Alert' | 'Maintenance';
  uptime: string;
  latency: number;
  aiActive: boolean;
  streamUrl: string;
  thumbnail: string;
  zone: string;
}

export interface EvidenceItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  camera: string;
  tag: string;
  type: string;
  thumbnail: string;
  fullImage: string;
  flagged: boolean;
  confidence: number;
  subject?: string;
  officerNotes?: string;
}

export interface RegisteredPerson {
  id: string;
  name: string;
  role: 'Student' | 'Staff' | 'Security' | 'Visitor' | 'Faculty';
  roomNumber: string;
  accessLevel: 'Level 1 (General)' | 'Level 2 (Hostel Only)' | 'Level 3 (Restricted Zones)' | 'Level 4 (Admin/Full)';
  image: string;
  registrationDate: string;
  status: 'Active' | 'Suspended' | 'Revoked';
  department: string;
  confidenceScore: number;
  email?: string;
  phone?: string;
}

export interface SystemMetric {
  id: string;
  name: string;
  status: 'Normal' | 'Warning' | 'Optimal' | 'Degraded';
  load: number;
  latency: string;
  details: string;
  healthScore: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'SUCCESS';
  service: string;
  message: string;
}

export interface Operator {
  id: string;
  badgeId: string;
  name: string;
  role: string;
  shift: string;
  avatar: string;
  activeTime: string;
  isLoggedIn: boolean;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  severity: EventSeverity;
  read: boolean;
  eventId?: string;
  camera?: string;
}

export interface SettingsConfig {
  detectionConfidence: number;
  facialStrictness: number;
  restrictedAreaDetect: boolean;
  continuousFaceRec: boolean;
  autoSnapshot: boolean;
  systemAlarms: boolean;
  alertPush: boolean;
  routineLogs: boolean;
  darkTheme: boolean;
  wsInterval: number;
}
