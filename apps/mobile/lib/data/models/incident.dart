import 'package:json_annotation/json_annotation.dart';
import '../enums/app_enums.dart';
import 'geo_point.dart';

part 'incident.g.dart';

@JsonSerializable()
class Incident {
  final String id;
  final IncidentCategory category;
  final IncidentSeverity severity;
  final IncidentStatus status;
  final GeoPoint location;
  final String reporterId;
  final String? description;
  final DateTime createdAt;

  const Incident({
    required this.id,
    required this.category,
    required this.severity,
    required this.status,
    required this.location,
    required this.reporterId,
    this.description,
    required this.createdAt,
  });

  factory Incident.fromJson(Map<String, dynamic> json) => _$IncidentFromJson(json);
  Map<String, dynamic> toJson() => _$IncidentToJson(this);
}
