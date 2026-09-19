import 'package:json_annotation/json_annotation.dart';

enum UserType {
  @JsonValue('GENERAL') general,
  @JsonValue('TRUSTED') trusted,
  @JsonValue('AUTHORITY') authority,
  @JsonValue('ADMIN') admin,
}

enum IncidentCategory {
  @JsonValue('FLOOD') flood,
  @JsonValue('LANDSLIDE') landslide,
  @JsonValue('ROAD_BROKEN') roadBroken,
  @JsonValue('FIRE') fire,
  @JsonValue('MEDICAL') medical,
  @JsonValue('OTHER') other,
}

enum IncidentSeverity {
  @JsonValue('CRITICAL') critical,
  @JsonValue('HIGH') high,
  @JsonValue('MEDIUM') medium,
  @JsonValue('LOW') low,
}

enum IncidentStatus {
  @JsonValue('ACTIVE') active,
  @JsonValue('RESOLVED') resolved,
  @JsonValue('FALSE_REPORT') falseReport,
}

enum VerificationVote {
  @JsonValue('UPVOTE') upvote,
  @JsonValue('DOWNVOTE') downvote,
}

enum TicketStatus {
  @JsonValue('OPEN') open,
  @JsonValue('IN_PROGRESS') inProgress,
  @JsonValue('RESOLVED') resolved,
  @JsonValue('CLOSED') closed,
}

enum MediaType {
  @JsonValue('IMAGE') image,
  @JsonValue('VOICE') voice,
  @JsonValue('VIDEO') video,
}

enum UploadPriority {
  @JsonValue('HIGH') high,
  @JsonValue('NORMAL') normal,
  @JsonValue('LOW') low,
}
