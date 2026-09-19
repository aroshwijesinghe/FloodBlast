export enum UserType {
  ADMIN = 'ADMIN',
  OFFICER = 'OFFICER',
  CITIZEN = 'CITIZEN',
}

export enum IncidentCategory {
  FLOOD = 'FLOOD',
  LANDSLIDE = 'LANDSLIDE',
  WIND = 'WIND',
  FIRE = 'FIRE',
  OTHER = 'OTHER'
}

export enum IncidentSeverity {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IncidentStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum VerificationVote {
  CONFIRM = 'CONFIRM',
  DENY = 'DENY'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO'
}

export enum ReliefRequestType {
  FOOD = 'FOOD',
  MEDICAL = 'MEDICAL',
  SHELTER = 'SHELTER',
  RESCUE = 'RESCUE'
}

export enum MealType {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG'
}
