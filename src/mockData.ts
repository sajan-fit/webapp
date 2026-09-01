import { Camera, EvidenceItem, Operator, RegisteredPerson, SecurityAlert, SecurityEvent, SettingsConfig, SystemLog, SystemMetric } from './types';

// Hotlinked High-Resolution Image Assets
export const IMAGES = {
  // CCTV Feeds
  cctvHallwayLive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVn4JoMdqpFl3PWUHNOupU3hkb8SpXcv5b2kTtnvHU9-GLcz30HOf_mrk3SEn3v-78NilzTU7p_45dTA3WsCfIGobqWEr8iEpnYuxFqGnvavYBILm41XWqCGO2yWPtQ6WU3l_eVfDrxZj872bQK77Obig59kbRcTgF0XkkKa5GP60MRdkAlS86aWELE7zr5STzXi-rRccS7dWtjgarlzJQy-zHCjhZKDw78ZPjSD2Ddo4tl_G2gvnE',
  cctvHallwayNight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg5AMJpR6YraDiDeY2bKk27b6F89D4wqJ401tMRvMbyHdjYKOIy0P8VureRVAuNTwETxkRip7mIsPH70kw8SsPReUfOfKRFz4c1R_l_bsHVE1QocBXL-MiI76CTVJrzHfLtP6-JRd03De-BSHdBcK4ghnPzh3h2-YqGH9bWXDZcOH0plYgpriGiFv1qa6yLcCZjDaf3bl-tXd69zlvvaaJXgdmjfGWRZesY6DLN5n4pts1nHQ9k42z',
  cctvCommonRoom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2_MUK6kOQI2b4SdcY38MfwcovvmBBAFiDH8TtO0shcZJkC85-lUhKYt9CSeUj2APDd-gy-GF6ujHR4IV5yLKWmQl-vQ34Dx3WFC00FYOQKRX5JJDXx1baUqkHpsNnZlEBBqI_27vpPxZeDjwv52efU1BDlBuT6lgOufvQPblci-IJdB5t2ugq9diPQQqOx-12imBfPryD1ZfhiNN73e4GanGz6OSJOW2tNUeZHZ1YCmza-UgLX3bF',
  cctvMainEntranceNight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWGypng320feWv5UgPqIJAm52_lhqp6XcFIFwILWCJPm7_SaUwlGZwF4fpEabE_DVx8qzxVBMi-qARsbXOmvb0OP6VIORTd0POOWdhM8GHs1QeuPkA4j_2M1zZY1TTt-K1-uLUSHkv1_uh4h_F15OW5kPcj9rIuj-3hVukb6_xgJWo3hLXgDSiiBGeIFN95Xj1THUYkzlaz9INtqlO4aKP620yTijKNO6djH2L_F7FfT4Rx0iFmZcI',
  cctvCorridor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Cs8fkezqR2RLw2ny-Q3XItfhuZRLEaX5MJ5Zi7sbN6ic5AVMCPGYgT9eIWgqkDu0_hHM3Ayf_B21PmWgZVFPjHrG7JxdNCU9jlKVEKyqeTeiHGGKVaoQhQCcsf5wWninmtEetbtNqPEjB98Ld7r5qUdlZW-MMwpbaAE0vu1pdxBRvRNyqC-D4V3SZTKjfmTj0Xf6eFwvBG2c5o7J8X6g109GXtVfcC66z01pFj_T4IyYdMTCxLBm',
  cctvEntranceDay: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWRwFKW743fFTd3gkiHyTVRtvZTDqZEYK3sn6hnzPfptHJGw8pzbBZ0Ot_epnBHlLC28T-GmJo0ZKsuJNgMORdnRINEEaoYmHsO0k5dKYCdVifLEBSzPBDLbk0pGm6bhCjRQ-abYhzBFMVgkO0bTQRd9mamVdxFfmomhubBVR2SOPjPdQn8jULE16mj3eyQ8wk5cgmu3b61sqBNd_tcUPWEk8ymRzDEmFbMu3-7ZTS-TA4K3Kzqfq8',
  cctvCafeteria: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFTgAqGhVh8tiolaPlfA-cnqyL8IuThu2P2PDRUzm4HQKNcVsKX2VlDJFMQOVH9NK1iKD3dEdxjAACEMwOqqkvGQCX_3vIp1JhzBZilh17oMXtkBpjtayj4J34z3oHPQgTDfUrJEF24UFhNijwBbebAcTXJB5Q3dTaRbw0rY976qi2k1y3Qu3Sey-sPCeZhcx0X-ZNQoou8SbrpMLBw0mOY6G8vkGVhew2EaJ2T0b_zGpvuL8EP9Vp',
  cctvCourtyard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8GbEGZ0JVEHSxzafbFBcnaRWDPltqIWfDU7Uf8BuDzvunSKFWAk56lwDsIUYCTj4E935JDtGWnTvbfQuweNrfsv-g2bf79zEsTZY0H8DLyVBUtRCXl5_TMGwMrnEAXu2JWGyqpqJK6iiKo7SFndnQbMCfPkImU6euBq_N-pRSH636EhQfy4MU6MG-wTb4-BAvPz9va7_LpqLbszwWvXK0WDSrmyMxLXF7-x61ahLKtgUGv1H4_ZDN',
  
  // Person Faces / Subjects
  sajanFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-D9hYYcxHfZh_1jKxGhVeuEwenokZQaQA-jPjtNAaz3iV1w_zg3hGy2Aq3C0wq_iUbflyYrNlWltehDLBsn0tlxHWRyTQTV9SqZ4EQAXUTgXq5WrpTSmbLUdkBKxvBQwFohjpVuuM87Ec94rMZdrlAA9tAi6yxabJE3r7Ni-vToE6mbCvqHHNNQA_rD8X1n7xDecFZc84LeUNUqsRxZpHtPxdwabnmuEjGD7pginLi_GTo7c9Toii',
  sajanCrop: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGZY7fOQBfpgheZbx2bLUk0TeLci7JnHN_eOoXemvDovBSyMlo_MhunyPA9H6TDLUdmMaXuXWWK7Y9p7QBEAtsLJzDgn6OxXXvowJsnC-rzYbRE00TtpwHYE6uCJLUcBzDLBJZkmlq9d5EGOscWpCHINyxlx-lla44oTzkEwpqUxANUfoKJ_s01chsYFRls_DrCat6JkedUjLXu-t5mfpXzC_t1eEaS9Ea2Rb5EQFUg67EXuHzQ7mP',
  sajanSubjectDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPb2-oAXK1kTv_MgqQn4RjuwHX_Hj19CGYgEczi-k19DbyVpaWfPKkbJ99ZZ7o6JNWlAwgalYQ9ci5yEb5_q3NfZqWJE-oPpAOpD_wQYX2tfa8LjPY9AVsEEyc-A54PYFPHU1NXIewfVy-79a4NIAym1GSqR4MbO5OC0jkEHXjE7gYM946WTBANTYZF-9dIrXvArYfFwMxtG_UFtDe80OlysxDoUnxPQopoHOJMNtSP-kKM4F9apms',
  elenaFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3PYlIjK3aFVKGDui3Pdd7DVMoAO-dhOSSpOy7sgaLFoybjrKIysXOYfN_RJL5E4dnEit1tQADfHHKQ-q-RpCHEEtSZ0o1XZEe9atkVPfbmD_YfMpPhgOnEACcZKe8PWZymVsU8VlaTahhBO9A0lAs4IHXaF55Ut6o_p0xEjOuqeC3IlGoXrtlLpW1at1dO47Xcz2RymZW4XHzHYfIfndS50j5krteLTo9oNyVM9i79bi94X6k4XTy',
  mayaFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAGkPtThtVr1JDBjnqXY6cHn8hq2YCsojxJCIpAG2BVIUdUVgOLKVhbfSR5plk0G5zNckM5SVc3WJ-COMRCv9gLJYjBXdyYHUoM0NoqHb6UGWTIPCZ7BTbRnyPv8cQXAxnuLlVa4vq2Au1PtzUi85maL8uhuMaIXNQ5t3fHkJRk1nJEQhO0nZBuaOYRWGGLLh806hMxJ39iiMb3t-Jo7IGib_-9SKD5eBj6V9iK1AB9_h93WiPaon1',
  operatorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8cMy-Y2aC9qLfU6pNjGN0JOp5aFiK-NKPs2JkEpRPBm4B0ApW8BwtScQJtgsWsIeKHuEzjH07wgPvtlPCIqekhFxyZWgtioJi4YtbyKy0i7B0W6dCFh-1IKsj3pEZupTITdHySoUAYEuphMQEAEDYkIN6Qhz3dwzT7nZ1oP5yhwbdEPSLEIV8XMEnC1ZTJaExhsNNeL-C3OmsqKe9Qa1QBa6lRnb_2JtjIs1RP7wRdEE5wBOTUSTT',
  operatorAvatar2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwcNYQUG787Za9xo_Q8EzJNgLB6UjXvdSKoyvOcR39d5S7RaYgCrlgbaXDmI5WEoWE9o6vlnedvkRhsO1Cj2rv9Gwxf0tviQQsGHp2--lFz_Z2GqhZ3sehCQ5MlIiCjB4jIezh6RtcIBltUdLZ1Zt-Z7oONa-LFm7TTqJVnB18kavPZcEKPaB85HYnqetv2bhRt-gauZCdBcz4iihvDY_WzgjIJyxmtzNaDZZkC3772CiEcRI4aOAA',
  
  // Evidence Snapshots
  evidence1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYoN3xwPbE0z_x2iPv5Uju8q1NcQzCH3iRVuzKGEii346pUNz08eAlBwGtyMZfzFcExDeCmuy_pbVgNPGTZcPkepje492fVDYbaf9-OEb48FTWgZv3kYWk1B1gdbMfF_TPraiUhh7HV3yaYuMACoisPo1FiCafVVoWqQmpH2vXz4g2kXEFw9orm2tH4-u54WERV7n0eZQV_cYzYr3OI2NGrYCVMBuSnZfgpV64t8AmeVjQMl1PLpw2',
  evidence2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFijCdj2-zXu1q1BM-SI67ocJ6Z9GY7W7IkNiXtysY2mbfM_7JHDt1NJVklc5iHm88LPgkiQlGadJB-xQ-zesq5a6qSDMrNVOeoRlekLdj4aLmAj6NLClEcFa4OPsFoAvvzYciIxFbYeqAZn0pr1ZXLimaqsNm1hoLqrCS2gPwk0pshViUHifezrKmRlIPQ69PqBXaXvoNeM3Pr96JqHBMB9Xr9UZAxiI4k4KaKismlTbN69_A8jQm',
  evidence3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD67Zg2p_p68xQptGb3ducYN6p-sltQawJcoe9GDPk-r1KdCjyf5chFDUy-I2kG3jgwO-tisNdw8PcYegIVLWmLtmUzZP3zAN4FTzk0MBjD_RoGfytPo_XnW2UsZ_yYQPbb22P0HbmZufDw_rGkqCUkfyv5aqn2xEzIOgklb3xE_MOn5fP-bfMfNL6G4lIpbr62SgwayzliQN5uI6W56JT30KS3xGEfqDEfhU21xYLN2cRBoZcJR7H8',
  eventWideShot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsCq0Q_vDJRfnVe-hiweXwkAJ2FTeu1fnfifN5cZAd53haBpOPgoYUkQGQ78FSz7Uh3GajAMwN69Kp3clRAogFyFl992f1UxZEAtVEukycOhYGvje9KBfpC4Mm4tYlfHGCpTtWopJDqvhlZWVV1LJAHCWKNf_IV_VVph4GonCRS2v2W6ZaFjdnFvTtlguuRCyKPLynNTDl7hwDI-jY2PFO9XqsQCs0nEP45F8zPj9lkQjS4RSSWlXw',
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaMFqLiA-SiELdYtyEe67UfzyCTEy--sum5e76IFGYvVIhL20rV4Xz5XpjZmAfxM9Af2_1mQGX6VCE-Ydtti7vMMYsMk3CBJ2m9nZuWfofbScX2D5UdMK6g26PqLQyvgW8Sj68YaXXRBF51DqOzM0dpq_vRojtxTbKkUpU9FM2iqGw9AUsLh5uC94L8XZu0b-bxn4ZS2lgBwkXZmwuwnaNje2n3ug7bEA5FLNKJCX2e-Kpqj424Maz'
};

export const INITIAL_OPERATOR: Operator = {
  id: 'op-01',
  badgeId: 'VG-OP-7492',
  name: 'Sgt. Marcus Vance',
  role: 'Chief Security Officer',
  shift: 'Alpha Shift (06:00 - 18:00)',
  avatar: IMAGES.operatorAvatar,
  activeTime: '06h 42m',
  isLoggedIn: true
};

export const INITIAL_CAMERAS: Camera[] = [
  {
    id: 'CAM-01',
    name: 'Main Entrance & Lobby',
    location: 'Building A - North Gate',
    ip: '192.168.10.101',
    resolution: '4K (3840x2160)',
    fps: 30,
    status: 'Online',
    uptime: '99.98%',
    latency: 14,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam01/live',
    thumbnail: IMAGES.cctvHallwayLive,
    zone: 'Zone 1 (Public Access)'
  },
  {
    id: 'CAM-02',
    name: 'Common Study & Lounge',
    location: 'Building B - 2nd Floor',
    ip: '192.168.10.102',
    resolution: '1080p (1920x1080)',
    fps: 25,
    status: 'Online',
    uptime: '99.94%',
    latency: 18,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam02/live',
    thumbnail: IMAGES.cctvCommonRoom,
    zone: 'Zone 2 (Student Common)'
  },
  {
    id: 'CAM-03',
    name: 'Server Room & Power Substation',
    location: 'Building C - Basement Level 1',
    ip: '192.168.10.103',
    resolution: '4K (3840x2160)',
    fps: 30,
    status: 'Alert',
    uptime: '99.12%',
    latency: 12,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam03/live',
    thumbnail: IMAGES.cctvMainEntranceNight,
    zone: 'Zone 4 (Restricted Level 3)'
  },
  {
    id: 'CAM-04',
    name: 'West Wing Dorm Corridor',
    location: 'Building A - 3rd Floor',
    ip: '192.168.10.104',
    resolution: '1080p (1920x1080)',
    fps: 30,
    status: 'Online',
    uptime: '99.85%',
    latency: 19,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam04/live',
    thumbnail: IMAGES.cctvCorridor,
    zone: 'Zone 2 (Resident Dorms)'
  },
  {
    id: 'CAM-05',
    name: 'Cafeteria & Dining Hall',
    location: 'Central Pavilion',
    ip: '192.168.10.105',
    resolution: '1080p (1920x1080)',
    fps: 25,
    status: 'Online',
    uptime: '99.70%',
    latency: 22,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam05/live',
    thumbnail: IMAGES.cctvCafeteria,
    zone: 'Zone 1 (Dining)'
  },
  {
    id: 'CAM-06',
    name: 'Inner Courtyard & Garden',
    location: 'Hostel Quadrangle',
    ip: '192.168.10.106',
    resolution: '1080p (1920x1080)',
    fps: 25,
    status: 'Online',
    uptime: '99.90%',
    latency: 16,
    aiActive: true,
    streamUrl: 'rtsp://visionguard-hostel/cam06/live',
    thumbnail: IMAGES.cctvCourtyard,
    zone: 'Zone 3 (Perimeter)'
  }
];

export const INITIAL_EVENTS: SecurityEvent[] = [
  {
    id: 'EVT-9042',
    timestamp: '10:42:18 AM (Just Now)',
    type: 'Restricted Area',
    camera: 'CAM-03 (Server Room Basement)',
    cameraId: 'CAM-03',
    confidence: 94.2,
    status: 'Pending Review',
    severity: 'critical',
    image: IMAGES.evidence1,
    personName: 'Unidentified Subject #84',
    subjectCrop: IMAGES.sajanSubjectDetail,
    zone: 'Zone 4 - Server Vault',
    actionTaken: 'Audio warning emitted; Security team dispatched',
    notes: 'Subject attempted badge bypass at restricted vault door at 10:42 AM.'
  },
  {
    id: 'EVT-9041',
    timestamp: '10:38:05 AM',
    type: 'Authorized Access',
    camera: 'CAM-01 (Main Entrance)',
    cameraId: 'CAM-01',
    confidence: 98.7,
    status: 'Verified',
    severity: 'low',
    image: IMAGES.cctvHallwayLive,
    personName: 'Sajan K. (Student)',
    subjectCrop: IMAGES.sajanFace,
    zone: 'Zone 1 - Main Lobby',
    actionTaken: 'Gate unlocked automatically',
    notes: 'Face matched against active resident registry (Room 304).'
  },
  {
    id: 'EVT-9040',
    timestamp: '10:15:44 AM',
    type: 'Authorized Access',
    camera: 'CAM-02 (Common Lounge)',
    cameraId: 'CAM-02',
    confidence: 97.4,
    status: 'Verified',
    severity: 'low',
    image: IMAGES.cctvCommonRoom,
    personName: 'Maya Lin (Faculty Staff)',
    subjectCrop: IMAGES.mayaFace,
    zone: 'Zone 2 - Floor 2 Lounge',
    actionTaken: 'Logged in biometric journal',
    notes: 'Staff ID verification confirmed via facial vector embedding.'
  },
  {
    id: 'EVT-9039',
    timestamp: '09:54:12 AM',
    type: 'Forced Entry',
    camera: 'CAM-03 (Basement Emergency Exit)',
    cameraId: 'CAM-03',
    confidence: 89.6,
    status: 'Action Taken',
    severity: 'high',
    image: IMAGES.evidence3,
    personName: 'Unknown Intruder',
    subjectCrop: IMAGES.evidence3,
    zone: 'Zone 4 - Perimeter Gate B',
    actionTaken: 'Siren activated, local lockdown initiated',
    notes: 'Lock tampering sensor triggered concurrent with YOLO motion bounding.'
  },
  {
    id: 'EVT-9038',
    timestamp: '09:21:30 AM',
    type: 'Unrecognized Face',
    camera: 'CAM-04 (Corridor West)',
    cameraId: 'CAM-04',
    confidence: 76.1,
    status: 'Verified',
    severity: 'medium',
    image: IMAGES.cctvCorridor,
    personName: 'Elena Rostova (Guest/Visitor)',
    subjectCrop: IMAGES.elenaFace,
    zone: 'Zone 2 - West Corridor',
    actionTaken: 'Escort requested via intercom',
    notes: 'Visitor badge expired 15 minutes prior to detection.'
  },
  {
    id: 'EVT-9037',
    timestamp: '08:44:00 AM',
    type: 'Authorized Access',
    camera: 'CAM-01 (Main Entrance)',
    cameraId: 'CAM-01',
    confidence: 99.1,
    status: 'Resolved',
    severity: 'low',
    image: IMAGES.evidence2,
    personName: 'Sarah Jenkins (Security Tech)',
    subjectCrop: IMAGES.evidence2,
    zone: 'Zone 1 - Main Lobby',
    actionTaken: 'Maintenance clearance logged',
    notes: 'Authorized morning inspection check-in.'
  }
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-881',
    timestamp: 'OCT 24, 2023 10:42:18',
    title: 'Unknown Person in Server Corridor',
    description: 'Subject entered restricted level without clearance or badge swipe. High YOLO confidence bounding on face + torso.',
    camera: 'CAM-03',
    tag: 'Restricted Area Entry',
    type: 'Restricted Area Entry',
    thumbnail: IMAGES.evidence1,
    fullImage: IMAGES.evidence1,
    flagged: true,
    confidence: 94.2,
    subject: 'Unidentified Subject #84',
    officerNotes: 'Dispatched patrol unit 2. Captured 4K forensic frame.'
  },
  {
    id: 'EVD-880',
    timestamp: 'OCT 24, 2023 08:44:00',
    title: 'Sarah Jenkins - Routine Access',
    description: 'Staff biometric verification passed. Access granted to Maintenance Corridor.',
    camera: 'CAM-01',
    tag: 'Authorized Access',
    type: 'Authorized Access',
    thumbnail: IMAGES.evidence2,
    fullImage: IMAGES.evidence2,
    flagged: false,
    confidence: 99.1,
    subject: 'Sarah Jenkins',
    officerNotes: 'Scheduled diagnostic visit.'
  },
  {
    id: 'EVD-879',
    timestamp: 'OCT 24, 2023 09:54:12',
    title: 'Forced Entry Attempt - Substation B',
    description: 'Infrared motion combined with vibration tripwire triggered high severity alert.',
    camera: 'CAM-03',
    tag: 'Forced Entry Attempt',
    type: 'Forced Entry Attempt',
    thumbnail: IMAGES.evidence3,
    fullImage: IMAGES.evidence3,
    flagged: true,
    confidence: 89.6,
    subject: 'Intruder Masked',
    officerNotes: 'Perimeter reinforcement requested. Case escalated.'
  },
  {
    id: 'EVD-878',
    timestamp: 'OCT 24, 2023 10:38:05',
    title: 'Sajan K. - North Gate Access',
    description: 'Hostel resident verified through facial recognition model v4.2 with 98.7% cosine similarity.',
    camera: 'CAM-01',
    tag: 'Authorized Access',
    type: 'Authorized Access',
    thumbnail: IMAGES.eventWideShot,
    fullImage: IMAGES.eventWideShot,
    flagged: false,
    confidence: 98.7,
    subject: 'Sajan K.',
    officerNotes: 'Resident in good standing (Block A).'
  }
];

export const INITIAL_PEOPLE: RegisteredPerson[] = [
  {
    id: 'PER-1001',
    name: 'Sajan K.',
    role: 'Student',
    roomNumber: 'Room 304 (Block A)',
    accessLevel: 'Level 2 (Hostel Only)',
    image: IMAGES.sajanFace,
    registrationDate: '15 AUG 2023',
    status: 'Active',
    department: 'Computer Science Dept.',
    confidenceScore: 99.2,
    email: 'sajan.k@campus.edu',
    phone: '+1 (555) 342-9810'
  },
  {
    id: 'PER-1002',
    name: 'Maya Lin',
    role: 'Staff',
    roomNumber: 'Admin Wing Office 12',
    accessLevel: 'Level 3 (Restricted Zones)',
    image: IMAGES.mayaFace,
    registrationDate: '02 JUN 2022',
    status: 'Active',
    department: 'Hostel Administration',
    confidenceScore: 98.6,
    email: 'm.lin@campus.edu',
    phone: '+1 (555) 782-4419'
  },
  {
    id: 'PER-1003',
    name: 'Elena Rostova',
    role: 'Visitor',
    roomNumber: 'Guest Suite 102',
    accessLevel: 'Level 1 (General)',
    image: IMAGES.elenaFace,
    registrationDate: '23 OCT 2023',
    status: 'Active',
    department: 'Visiting Scholar - Physics',
    confidenceScore: 96.8,
    email: 'elena.rostova@guest.edu',
    phone: '+1 (555) 902-1254'
  },
  {
    id: 'PER-1004',
    name: 'Sarah Jenkins',
    role: 'Security',
    roomNumber: 'Security Ops HQ',
    accessLevel: 'Level 4 (Admin/Full)',
    image: IMAGES.evidence2,
    registrationDate: '10 JAN 2021',
    status: 'Active',
    department: 'Campus Safety & IT Infrastructure',
    confidenceScore: 99.5,
    email: 's.jenkins@safety.campus.edu',
    phone: '+1 (555) 019-8833'
  }
];

export const INITIAL_METRICS: SystemMetric[] = [
  {
    id: 'm1',
    name: 'YOLO Detection Engine (v11-Nano/RT)',
    status: 'Optimal',
    load: 42,
    latency: '12ms',
    details: 'Processing 120 FPS across 6 active RTSP streams with GPU acceleration.',
    healthScore: 99
  },
  {
    id: 'm2',
    name: 'Face Recognition Neural Model (ResNet-512)',
    status: 'Normal',
    load: 68,
    latency: '24ms',
    details: 'Vector database synced. Cosine similarity threshold at 0.88.',
    healthScore: 97
  },
  {
    id: 'm3',
    name: 'Camera Fleet System & Ingestion',
    status: 'Optimal',
    load: 24,
    latency: '6ms',
    details: '6 of 6 cameras broadcasting without frame loss. 24/24 channels ready.',
    healthScore: 100
  },
  {
    id: 'm4',
    name: 'Forensic Storage & Snapshot Vault',
    status: 'Normal',
    load: 31,
    latency: '3ms',
    details: '1.4 TB / 4.0 TB utilized (35%). 30-day retention cycle operational.',
    healthScore: 98
  }
];

export const INITIAL_LOGS: SystemLog[] = [
  { id: 'l-1', timestamp: '10:42:18', level: 'CRITICAL', service: 'ThreatDetector', message: 'Restricted perimeter breach flagged on CAM-03. Dispatched security alert.' },
  { id: 'l-2', timestamp: '10:38:05', level: 'SUCCESS', service: 'FaceNet-v4', message: 'Biometric authorization match: Sajan K. (Confidence: 98.7%). Gate 1 released.' },
  { id: 'l-3', timestamp: '10:30:00', level: 'INFO', service: 'RTSPManager', message: 'Stream heartbeat ping successful on all 6 camera nodes (Avg latency: 15ms).' },
  { id: 'l-4', timestamp: '10:15:44', level: 'SUCCESS', service: 'FaceNet-v4', message: 'Staff verification match: Maya Lin (Confidence: 97.4%). Event logged.' },
  { id: 'l-5', timestamp: '09:54:12', level: 'WARN', service: 'SensorGrid', message: 'Vibration & tamper alert registered on Substation Gate B.' },
  { id: 'l-6', timestamp: '09:00:00', level: 'INFO', service: 'CronEngine', message: 'Routine database index defragmentation and snapshot prune completed.' }
];

export const INITIAL_ALERTS: SecurityAlert[] = [
  {
    id: 'alt-01',
    timestamp: '10:42 AM',
    title: 'Critical Threat Alert: Zone 4 Intrusion',
    message: 'Unknown subject detected in Server Room (CAM-03) without authorized credentials.',
    severity: 'critical',
    read: false,
    eventId: 'EVT-9042',
    camera: 'CAM-03'
  },
  {
    id: 'alt-02',
    timestamp: '09:54 AM',
    title: 'High Alert: Tamper Attempt',
    message: 'Lock tripwire triggered at Basement Emergency Exit.',
    severity: 'high',
    read: true,
    eventId: 'EVT-9039',
    camera: 'CAM-03'
  },
  {
    id: 'alt-03',
    timestamp: '09:21 AM',
    title: 'Notice: Visitor Expired Pass',
    message: 'Visitor Elena Rostova in West Wing corridor beyond scheduled pass window.',
    severity: 'medium',
    read: true,
    eventId: 'EVT-9038',
    camera: 'CAM-04'
  }
];

export const INITIAL_SETTINGS: SettingsConfig = {
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
};
