/**
 * FloodBlast Shared Enums
 * Core enumeration types shared across mobile, web, and server applications.
 */

// ─── User Types ─────────────────────────────────────────────────────────────────

/** User classification determining access level and verification weight */
export enum UserType {
  /** Anonymous device-based user, no login required */
  BASIC = 'BASIC',
  /** Phone-verified user with persistent identity */
  REGISTERED = 'REGISTERED',
  /** Government officer or verified authority figure */
  TRUSTED = 'TRUSTED',
  /** Platform administrator */
  ADMIN = 'ADMIN',
}

/** Roles available for trusted users */
export enum TrustedUserRole {
  POLICE_OFFICER = 'POLICE_OFFICER',
  GRAMA_NILADHARI = 'GRAMA_NILADHARI',
  DIVISIONAL_SECRETARY = 'DIVISIONAL_SECRETARY',
  DISTRICT_SECRETARY = 'DISTRICT_SECRETARY',
  DISASTER_RELIEF_OFFICER = 'DISASTER_RELIEF_OFFICER',
  MEDICAL_OFFICER_HEALTH = 'MEDICAL_OFFICER_HEALTH',
  MILITARY_OFFICER = 'MILITARY_OFFICER',
  RED_CROSS_VOLUNTEER = 'RED_CROSS_VOLUNTEER',
  CIVIL_DEFENCE = 'CIVIL_DEFENCE',
  IRRIGATION_OFFICER = 'IRRIGATION_OFFICER',
}

// ─── Incident Types ─────────────────────────────────────────────────────────────

/** Categories of natural disasters / incidents */
export enum IncidentCategory {
  FLOOD = 'FLOOD',
  LANDSLIDE = 'LANDSLIDE',
  ROAD_BROKEN = 'ROAD_BROKEN',
  ROAD_BLOCKED = 'ROAD_BLOCKED',
  BRIDGE_DAMAGED = 'BRIDGE_DAMAGED',
  BRIDGE_COLLAPSED = 'BRIDGE_COLLAPSED',
}

/** Sub-types for flood incidents */
export enum FloodSubType {
  RIVER_OVERFLOW = 'RIVER_OVERFLOW',
  TANK_OVERFLOW = 'TANK_OVERFLOW',
  URBAN_FLOODING = 'URBAN_FLOODING',
}

/** Sub-types for landslide incidents */
export enum LandslideSubType {
  SLOPE_FAILURE = 'SLOPE_FAILURE',
  MUDSLIDE = 'MUDSLIDE',
  ROCK_FALL = 'ROCK_FALL',
}

/** Severity levels for incidents */
export enum IncidentSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/** Status of an incident report */
export enum IncidentStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  DISPUTED = 'DISPUTED',
  CLOSED = 'CLOSED',
  DISMISSED = 'DISMISSED',
}

// ─── Verification ───────────────────────────────────────────────────────────────

/** Community verification vote types */
export enum VerificationVote {
  CONFIRM = 'CONFIRM',
  DENY = 'DENY',
}

// ─── Ticket System ──────────────────────────────────────────────────────────────

/** Lifecycle status of a disaster ticket */
export enum TicketStatus {
  OPEN = 'OPEN',
  VERIFIED = 'VERIFIED',
  CLOSING_REQUESTED = 'CLOSING_REQUESTED',
  CLOSED = 'CLOSED',
  AUTO_EXPIRED = 'AUTO_EXPIRED',
  DISMISSED = 'DISMISSED',
}

// ─── Media ──────────────────────────────────────────────────────────────────────

/** Types of media attachments */
export enum MediaType {
  IMAGE = 'IMAGE',
  VOICE = 'VOICE',
  VIDEO = 'VIDEO',
}

/** Upload priority tiers — lower number = higher priority */
export enum UploadPriority {
  /** Text + GPS coordinates (1-2 KB) — always sent immediately */
  CRITICAL_1 = 1,
  /** Voice recordings (30-60 KB compressed) — sent after text */
  HIGH_2 = 2,
  /** Images (150-250 KB compressed) — chunked resumable upload */
  MEDIUM_3 = 3,
  /** Videos (5-20 MB) — deferred until WiFi/4G */
  LOW_4 = 4,
}

/** Status of a media upload */
export enum UploadStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
}

// ─── Relief & Donations ─────────────────────────────────────────────────────────

/** Categories of relief requests */
export enum ReliefRequestType {
  FOOD = 'FOOD',
  MEDICAL = 'MEDICAL',
  CLOTHING = 'CLOTHING',
  SHELTER = 'SHELTER',
  OTHER = 'OTHER',
}

/** Meal types for food queue scheduling */
export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

/** Status of a relief request */
export enum ReliefRequestStatus {
  OPEN = 'OPEN',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FULFILLED = 'FULFILLED',
  CLOSED = 'CLOSED',
}

/** Status of a donation pledge */
export enum DonationStatus {
  PLEDGED = 'PLEDGED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// ─── Victim Categories ──────────────────────────────────────────────────────────

/** Priority classification for vulnerable populations */
export enum VictimPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
}

/** Status of affected persons */
export enum VictimStatus {
  STRANDED = 'STRANDED',
  EVACUATED = 'EVACUATED',
  AT_SAFE_PLACE = 'AT_SAFE_PLACE',
  MISSING = 'MISSING',
}

// ─── Safe Places ────────────────────────────────────────────────────────────────

/** Status of a safe gathering place */
export enum SafePlaceStatus {
  ACTIVE = 'ACTIVE',
  FULL = 'FULL',
  CLOSED = 'CLOSED',
}

/** Verification status of a safe place */
export enum SafePlaceVerification {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
}

// ─── Emergency Contacts ─────────────────────────────────────────────────────────

/** Types of emergency contact officers */
export enum OfficerType {
  GRAMA_NILADHARI = 'GRAMA_NILADHARI',
  DIVISIONAL_SECRETARY = 'DIVISIONAL_SECRETARY',
  POLICE = 'POLICE',
  MEDICAL_OFFICER_HEALTH = 'MEDICAL_OFFICER_HEALTH',
  DISASTER_RELIEF_OFFICER = 'DISASTER_RELIEF_OFFICER',
  MILITARY = 'MILITARY',
  FIRE_RESCUE = 'FIRE_RESCUE',
  AMBULANCE = 'AMBULANCE',
}

// ─── Administrative Boundary Levels ─────────────────────────────────────────────

/** Sri Lanka administrative division hierarchy levels */
export enum AdminBoundaryLevel {
  PROVINCE = 'PROVINCE',
  DISTRICT = 'DISTRICT',
  DS_DIVISION = 'DS_DIVISION',
  GN_DIVISION = 'GN_DIVISION',
}

// ─── Network & Connectivity ─────────────────────────────────────────────────────

/** Connection quality classification for adaptive behavior */
export enum ConnectionQuality {
  OFFLINE = 'OFFLINE',
  POOR_2G = 'POOR_2G',
  MODERATE_3G = 'MODERATE_3G',
  GOOD_4G = 'GOOD_4G',
  EXCELLENT_WIFI = 'EXCELLENT_WIFI',
}

// ─── Sync ───────────────────────────────────────────────────────────────────────

/** Status of a local record in the sync outbox */
export enum SyncStatus {
  LOCAL_PENDING = 'LOCAL_PENDING',
  SYNCING = 'SYNCING',
  SYNCED = 'SYNCED',
  CONFLICT = 'CONFLICT',
  FAILED = 'FAILED',
}
