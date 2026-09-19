/**
 * FloodBlast Shared Constants
 * Application-wide constants for verification scoring, decay rates,
 * proximity thresholds, and Sri Lanka emergency numbers.
 */

import { IncidentCategory, OfficerType } from './enums';
import { INationalEmergencyNumber } from './interfaces';

// ─── Verification System Constants ──────────────────────────────────────────────

/** Vote weights by user type for the community verification system */
export const VERIFICATION_WEIGHTS = {
  BASIC: { confirm: 1.0, deny: -1.5 },
  REGISTERED: { confirm: 2.0, deny: -2.0 },
  TRUSTED: { confirm: 10.0, deny: -10.0 },
  ADMIN: { confirm: 10.0, deny: -10.0 },
} as const;

/** Time-decay rates (λ) for confidence score calculation by disaster type.
 *  Half-life = ln(2) / λ
 */
export const DECAY_RATES: Record<string, { lambda: number; halfLifeHours: number }> = {
  [IncidentCategory.FLOOD]: { lambda: 0.08, halfLifeHours: 8.66 },
  [IncidentCategory.LANDSLIDE]: { lambda: 0.001, halfLifeHours: 693 },
  [IncidentCategory.ROAD_BROKEN]: { lambda: 0.0005, halfLifeHours: 1386 },
  [IncidentCategory.ROAD_BLOCKED]: { lambda: 0.1, halfLifeHours: 6.93 },
  [IncidentCategory.BRIDGE_DAMAGED]: { lambda: 0.0005, halfLifeHours: 1386 },
  [IncidentCategory.BRIDGE_COLLAPSED]: { lambda: 0.0003, halfLifeHours: 2310 },
};

/** Confidence score thresholds for incident status transitions */
export const CONFIDENCE_THRESHOLDS = {
  /** Score >= VERIFIED → incident is VERIFIED and shown to authorities */
  VERIFIED: 5.0,
  /** Score between FADING and VERIFIED → still UNVERIFIED */
  UNVERIFIED_MIN: 1.0,
  /** Score between DISMISSED and FADING → marker becomes semi-transparent */
  FADING: 0.0,
  /** Score < DISMISSED → incident is removed from map */
  DISMISSED: 0.0,
} as const;

// ─── Proximity Constants ────────────────────────────────────────────────────────

/** Maximum distance (meters) a voter must be from an incident to cast a verification vote */
export const VERIFICATION_PROXIMITY_RADIUS_METERS = 500;

/** Maximum distance (meters) for incident clustering via ST_ClusterDBSCAN */
export const CLUSTER_RADIUS_METERS = 75;

/** Approximate degrees for 75m at Sri Lanka's latitude (~7°N) */
export const CLUSTER_RADIUS_DEGREES = 0.000675;

/** Maximum distance (meters) for closure confirmation votes */
export const CLOSURE_PROXIMITY_RADIUS_METERS = 1000;

/** Maximum distance (meters) for receiving push notification prompts about nearby incidents */
export const NOTIFICATION_PROXIMITY_RADIUS_METERS = 2000;

// ─── Ticket Auto-Expiry Constants ───────────────────────────────────────────────

/** Auto-expiry durations in days by disaster category */
export const AUTO_EXPIRY_DAYS: Record<string, number | null> = {
  /** Floods must be manually closed (water recession varies) */
  [IncidentCategory.FLOOD]: null,
  /** Landslide debris remains for ~2 months */
  [IncidentCategory.LANDSLIDE]: 60,
  /** Road repairs take ~3 months */
  [IncidentCategory.ROAD_BROKEN]: 90,
  /** Temporary blockages usually clear within 3 days */
  [IncidentCategory.ROAD_BLOCKED]: 3,
  /** Bridge damage takes months to repair */
  [IncidentCategory.BRIDGE_DAMAGED]: 120,
  /** Bridge collapse requires reconstruction */
  [IncidentCategory.BRIDGE_COLLAPSED]: 180,
};

// ─── Media & Upload Constants ───────────────────────────────────────────────────

/** Maximum file sizes for uploaded media */
export const MAX_FILE_SIZES = {
  IMAGE_BYTES: 10 * 1024 * 1024, // 10 MB raw, will be compressed to 150-250 KB
  VOICE_BYTES: 5 * 1024 * 1024, // 5 MB raw, will be compressed to 30-60 KB
  VIDEO_BYTES: 100 * 1024 * 1024, // 100 MB
} as const;

/** Image compression targets */
export const IMAGE_COMPRESSION = {
  MAX_WIDTH: 1280,
  MAX_HEIGHT: 720,
  QUALITY_PERCENT: 70,
  FORMAT: 'webp' as const,
  THUMBNAIL_WIDTH: 320,
  THUMBNAIL_HEIGHT: 180,
  THUMBNAIL_QUALITY: 50,
} as const;

/** Voice recording constraints */
export const VOICE_RECORDING = {
  MAX_DURATION_SECONDS: 120, // 2 minutes
  CODEC: 'opus' as const,
  BITRATE_KBPS: 16,
  CHANNELS: 1, // mono
} as const;

/** Tus.io chunked upload configuration */
export const TUS_UPLOAD = {
  CHUNK_SIZE_BYTES: 64 * 1024, // 64 KB chunks for resumable upload
  MAX_RETRY_ATTEMPTS: 5,
  RETRY_DELAY_MS: 2000,
} as const;

/** RTT thresholds for adaptive upload behavior */
export const CONNECTION_THRESHOLDS = {
  POOR_2G_RTT_MS: 2000,
  MODERATE_3G_RTT_MS: 500,
} as const;

// ─── Sri Lanka National Emergency Numbers ───────────────────────────────────────

export const NATIONAL_EMERGENCY_NUMBERS: INationalEmergencyNumber[] = [
  {
    service: 'DMC Disaster Hotline',
    number: '117',
    description: 'National disaster reporting, emergency coordination, rescue dispatch',
    availableHours: '24/7',
  },
  {
    service: 'Police Emergency',
    number: '119',
    description: 'National Police Operations Centre — all crimes and emergency police response',
    availableHours: '24/7',
  },
  {
    service: 'Suwa Seriya Ambulance',
    number: '1990',
    description: 'Free nationwide GPS-dispatched ambulance with advanced life support',
    availableHours: '24/7',
  },
  {
    service: 'Fire & Rescue',
    number: '110',
    description: 'Municipal fire brigade and rescue services',
    availableHours: '24/7',
  },
  {
    service: 'Navy Flood Rescue',
    number: '105',
    description: 'Sri Lanka Navy — boat rescue, flood rescue, maritime search and rescue',
    availableHours: '24/7',
    applicableDisasters: [IncidentCategory.FLOOD],
  },
  {
    service: 'Air Force Helicopter SAR',
    number: '116',
    description: 'Sri Lanka Air Force — helicopter search and rescue, air evacuations',
    availableHours: '24/7',
    applicableDisasters: [IncidentCategory.FLOOD, IncidentCategory.LANDSLIDE],
  },
  {
    service: 'Army Relief Operations',
    number: '113',
    description: 'Sri Lanka Army — disaster relief coordination and ground operations',
    availableHours: '24/7',
  },
  {
    service: 'NBRO Landslide Hotline',
    number: '011-258-8946',
    description: 'National Building Research Organisation — landslide warnings and assessment',
    availableHours: 'Office hours (8:30 AM - 4:15 PM)',
    applicableDisasters: [IncidentCategory.LANDSLIDE],
  },
  {
    service: 'Irrigation Department (Flood)',
    number: '011-259-0145',
    description: 'River and reservoir water level monitoring, flood early warnings',
    availableHours: 'Office hours',
    applicableDisasters: [IncidentCategory.FLOOD],
  },
  {
    service: 'Department of Meteorology',
    number: '011-268-6686',
    description: 'Severe weather warnings, cyclone tracking, rainfall forecasts',
    availableHours: '24/7',
  },
  {
    service: 'Sri Lanka Red Cross',
    number: '011-269-1095',
    description: 'Humanitarian disaster response, first aid, relief distribution',
    availableHours: 'Office hours',
  },
  {
    service: 'Government Information',
    number: '1919',
    description: 'General government services, officer directories, public procedures',
    availableHours: '24/7',
  },
  {
    service: 'Childline',
    number: '1929',
    description: 'National Child Protection Authority — child emergency assistance',
    availableHours: '24/7',
  },
  {
    service: "Women's Helpline",
    number: '1938',
    description: 'Domestic violence, gender-based violence crisis support',
    availableHours: '24/7',
  },
];

// ─── Sri Lanka Administrative Data ──────────────────────────────────────────────

/** 9 Provinces of Sri Lanka */
export const SRI_LANKA_PROVINCES = [
  'Western', 'Central', 'Southern', 'Northern', 'Eastern',
  'North Western', 'North Central', 'Uva', 'Sabaragamuwa',
] as const;

/** 25 Districts of Sri Lanka mapped to their provinces */
export const SRI_LANKA_DISTRICTS: Record<string, string[]> = {
  'Western': ['Colombo', 'Gampaha', 'Kalutara'],
  'Central': ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Southern': ['Galle', 'Matara', 'Hambantota'],
  'Northern': ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  'Eastern': ['Trincomalee', 'Batticaloa', 'Ampara'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  'Uva': ['Badulla', 'Monaragala'],
  'Sabaragamuwa': ['Ratnapura', 'Kegalle'],
};

/** High-risk districts for specific disaster types */
export const HIGH_RISK_DISTRICTS = {
  FLOOD: [
    'Colombo', 'Gampaha', 'Kalutara', 'Ratnapura', 'Kegalle',
    'Galle', 'Matara', 'Polonnaruwa', 'Anuradhapura', 'Ampara',
    'Batticaloa', 'Trincomalee',
  ],
  LANDSLIDE: [
    'Badulla', 'Nuwara Eliya', 'Kegalle', 'Ratnapura', 'Kandy',
    'Matale', 'Kalutara', 'Galle', 'Matara', 'Hambantota',
  ],
} as const;

// ─── Food Queue Constants ───────────────────────────────────────────────────────

/** Default meal schedule times (Sri Lanka Standard Time, UTC+5:30) */
export const MEAL_SCHEDULE = {
  [String('BREAKFAST')]: { startHour: 6, endHour: 9 },
  [String('LUNCH')]: { startHour: 11, endHour: 14 },
  [String('DINNER')]: { startHour: 17, endHour: 20 },
} as const;
