/**
 * FloodBlast Shared Interfaces
 * Core data transfer object interfaces shared across mobile, web, and server.
 */

import {
  UserType,
  TrustedUserRole,
  IncidentCategory,
  FloodSubType,
  LandslideSubType,
  IncidentSeverity,
  IncidentStatus,
  VerificationVote,
  TicketStatus,
  MediaType,
  UploadPriority,
  UploadStatus,
  ReliefRequestType,
  MealType,
  ReliefRequestStatus,
  DonationStatus,
  VictimStatus,
  SafePlaceStatus,
  SafePlaceVerification,
  OfficerType,
  AdminBoundaryLevel,
  SyncStatus,
} from './enums';

// ─── Geospatial ─────────────────────────────────────────────────────────────────

/** GPS coordinate point */
export interface GeoPoint {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

/** GeoJSON polygon for affected areas */
export interface GeoPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

// ─── User ───────────────────────────────────────────────────────────────────────

export interface IUser {
  id: string;
  userType: UserType;
  name?: string;
  phone?: string;
  nicNumber?: string;
  trustedRole?: TrustedUserRole;
  trustedBadgeId?: string;
  deviceId?: string;
  lastKnownLocation?: GeoPoint;
  reputationScore: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBasicUser {
  deviceId: string;
}

export interface IRegisterUser {
  phone: string;
  name: string;
}

export interface IRegisterTrustedUser {
  phone: string;
  name: string;
  nicNumber: string;
  trustedRole: TrustedUserRole;
  trustedBadgeId: string;
}

// ─── Incident ───────────────────────────────────────────────────────────────────

export interface IIncident {
  id: string;
  reporterId: string;
  ticketId?: string;
  category: IncidentCategory;
  subType?: FloodSubType | LandslideSubType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: GeoPoint;
  affectedArea?: GeoPolygon;
  description: string;
  voiceTranscript?: string;
  confidenceScore: number;
  gnDivision?: string;
  dsDivision?: string;
  district?: string;
  reporterPhone?: string;
  media: IIncidentMedia[];
  verificationCount: { confirms: number; denies: number };
  createdAt: string;
  verifiedAt?: string;
  closedAt?: string;
}

export interface ICreateIncident {
  category: IncidentCategory;
  subType?: FloodSubType | LandslideSubType;
  severity: IncidentSeverity;
  location: GeoPoint;
  description: string;
  reporterPhone?: string;
  exposeContact: boolean;
}

export interface IIncidentSummary {
  id: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: GeoPoint;
  description: string;
  confidenceScore: number;
  district?: string;
  totalAffected: number;
  mediaCount: number;
  createdAt: string;
}

// ─── Incident Media ─────────────────────────────────────────────────────────────

export interface IIncidentMedia {
  id: string;
  incidentId: string;
  mediaType: MediaType;
  priority: UploadPriority;
  storageUrl?: string;
  thumbnailUrl?: string;
  uploadStatus: UploadStatus;
  fileSizeBytes: number;
  createdAt: string;
}

// ─── Verification ───────────────────────────────────────────────────────────────

export interface IVerification {
  id: string;
  incidentId: string;
  userId: string;
  vote: VerificationVote;
  voterLocation: GeoPoint;
  distanceToIncident: number;
  voterWeight: number;
  createdAt: string;
}

export interface ICastVerification {
  incidentId: string;
  vote: VerificationVote;
  voterLocation: GeoPoint;
}

// ─── Ticket ─────────────────────────────────────────────────────────────────────

export interface ITicket {
  id: string;
  category: IncidentCategory;
  status: TicketStatus;
  centroid: GeoPoint;
  area?: GeoPolygon;
  district?: string;
  dsDivision?: string;
  totalAffectedPersons: number;
  summary?: string;
  incidents: IIncidentSummary[];
  reliefRequests: IReliefRequest[];
  safePlaces: ISafePlace[];
  createdAt: string;
  closedAt?: string;
  autoExpireAt?: string;
}

export interface ITicketSummary {
  id: string;
  category: IncidentCategory;
  status: TicketStatus;
  centroid: GeoPoint;
  district?: string;
  totalAffectedPersons: number;
  incidentCount: number;
  createdAt: string;
}

// ─── Victim Report ──────────────────────────────────────────────────────────────

export interface IVictimReport {
  id: string;
  incidentId: string;
  reporterId: string;
  pregnantCount: number;
  medicalWoundedCount: number;
  elderlyCount: number;
  disabledCount: number;
  childrenCount: number;
  totalPersons: number;
  specialNotes?: string;
  victimStatus: VictimStatus;
  createdAt: string;
}

export interface ICreateVictimReport {
  incidentId: string;
  pregnantCount?: number;
  medicalWoundedCount?: number;
  elderlyCount?: number;
  disabledCount?: number;
  childrenCount?: number;
  totalPersons: number;
  specialNotes?: string;
  victimStatus: VictimStatus;
}

// ─── Relief Request ─────────────────────────────────────────────────────────────

export interface IReliefRequest {
  id: string;
  ticketId: string;
  requesterId: string;
  requestType: ReliefRequestType;
  quantityNeeded: number;
  quantityFulfilled: number;
  mealType?: MealType;
  status: ReliefRequestStatus;
  description?: string;
  deliveryLocation: GeoPoint;
  deadline?: string;
  donations: IDonation[];
  createdAt: string;
}

export interface ICreateReliefRequest {
  ticketId: string;
  requestType: ReliefRequestType;
  quantityNeeded: number;
  mealType?: MealType;
  description?: string;
  deliveryLocation: GeoPoint;
  deadline?: string;
}

// ─── Donation ───────────────────────────────────────────────────────────────────

export interface IDonation {
  id: string;
  reliefRequestId: string;
  donorId: string;
  donorName?: string;
  quantityPledged: number;
  status: DonationStatus;
  pledgedAt: string;
  deliveredAt?: string;
}

export interface ICreateDonation {
  reliefRequestId: string;
  quantityPledged: number;
}

// ─── Safe Place ─────────────────────────────────────────────────────────────────

export interface ISafePlace {
  id: string;
  ticketId?: string;
  addedById: string;
  name: string;
  location: GeoPoint;
  address?: string;
  capacity: number;
  currentOccupancy: number;
  facilitiesDescription?: string;
  facilities: SafePlaceFacility[];
  status: SafePlaceStatus;
  verificationStatus: SafePlaceVerification;
  media: ISafePlaceMedia[];
  createdAt: string;
}

export interface SafePlaceFacility {
  name: string;
  available: boolean;
}

export interface ISafePlaceMedia {
  id: string;
  safePlaceId: string;
  mediaType: MediaType;
  storageUrl: string;
  createdAt: string;
}

export interface ICreateSafePlace {
  ticketId?: string;
  name: string;
  location: GeoPoint;
  address?: string;
  capacity: number;
  facilitiesDescription?: string;
}

// ─── Emergency Contacts ─────────────────────────────────────────────────────────

export interface IEmergencyContact {
  id: string;
  officerName?: string;
  officerTitle: string;
  phoneNumber: string;
  secondaryPhone?: string;
  officerType: OfficerType;
  gnDivision?: string;
  dsDivision?: string;
  district?: string;
  officeLocation?: GeoPoint;
  isActive: boolean;
}

/** National-level emergency number that is always displayed */
export interface INationalEmergencyNumber {
  service: string;
  number: string;
  description: string;
  availableHours: string;
  applicableDisasters?: IncidentCategory[];
}

// ─── Admin Boundaries ───────────────────────────────────────────────────────────

export interface IAdminBoundary {
  id: number;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  level: AdminBoundaryLevel;
  parentCode?: string;
  boundary: GeoPolygon;
  centroid: GeoPoint;
}

// ─── Sync ───────────────────────────────────────────────────────────────────────

export interface ISyncOutboxEntry {
  id: string;
  entityType: string;
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: string;
  priority: UploadPriority;
  syncStatus: SyncStatus;
  retryCount: number;
  createdAt: string;
  lastAttemptAt?: string;
}

export interface IDeltaSyncRequest {
  since: string;
  district?: string;
  limit?: number;
}

export interface IDeltaSyncResponse {
  incidents: IIncident[];
  tickets: ITicketSummary[];
  safePlaces: ISafePlace[];
  contacts: IEmergencyContact[];
  serverTimestamp: string;
  hasMore: boolean;
}

// ─── Map Markers ────────────────────────────────────────────────────────────────

export interface IMapMarker {
  id: string;
  type: 'incident' | 'safe_place' | 'donor';
  location: GeoPoint;
  category?: IncidentCategory;
  status: IncidentStatus | SafePlaceStatus;
  severity?: IncidentSeverity;
  title: string;
  subtitle?: string;
  count?: number;
}

export interface IMapCluster {
  clusterId: number;
  centroid: GeoPoint;
  category: IncidentCategory;
  incidentCount: number;
  totalAffected: number;
}

// ─── API Response Wrappers ──────────────────────────────────────────────────────

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  timestamp: string;
}

export interface IApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}
