import { 
  UserType, IncidentCategory, IncidentSeverity, IncidentStatus,
  VerificationVote, TicketStatus, MediaType, ReliefRequestType, MealType 
} from './enums';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: UserType;
  district?: string;
}

export interface IVictimReport {
  elderlyCount: number;
  pregnantCount: number;
  disabledCount: number;
  childCount: number;
}

export interface IIncident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: GeoPoint;
  address?: string;
  district: string;
  dsDivision: string;
  gnDivision: string;
  createdAt: string;
  updatedAt: string;
  victims?: IVictimReport;
  verificationScore: number;
  confirmCount: number;
  denyCount: number;
  mediaUrls?: string[];
  audioUrl?: string;
}

export interface IVerification {
  id: string;
  incidentId: string;
  userId: string;
  vote: VerificationVote;
  createdAt: string;
}

export interface IEmergencyContact {
  id: string;
  name: string;
  title: string;
  phone: string;
  district?: string;
  dsDivision?: string;
  type: 'NATIONAL' | 'LOCAL';
  available: boolean;
}

export interface IMapMarker {
  id: string;
  location: GeoPoint;
  category: IncidentCategory;
  status: IncidentStatus;
  severity: IncidentSeverity;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
