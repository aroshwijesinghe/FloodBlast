import 'package:json_annotation/json_annotation.dart';
import '../enums/app_enums.dart';

part 'incident_media.g.dart';

@JsonSerializable()
class IncidentMedia {
  final String id;
  final String incidentId;
  final MediaType mediaType;
  final String url;
  final UploadPriority priority;

  const IncidentMedia({
    required this.id,
    required this.incidentId,
    required this.mediaType,
    required this.url,
    required this.priority,
  });

  factory IncidentMedia.fromJson(Map<String, dynamic> json) => _$IncidentMediaFromJson(json);
  Map<String, dynamic> toJson() => _$IncidentMediaToJson(this);
}
