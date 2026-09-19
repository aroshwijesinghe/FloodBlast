import 'package:json_annotation/json_annotation.dart';

part 'victim_report.g.dart';

@JsonSerializable()
class VictimReport {
  final String id;
  final String incidentId;
  final int pregnant;
  final int elderly;
  final int disabled;
  final int wounded;
  final int children;
  final String reporterId;
  final DateTime reportedAt;

  const VictimReport({
    required this.id,
    required this.incidentId,
    this.pregnant = 0,
    this.elderly = 0,
    this.disabled = 0,
    this.wounded = 0,
    this.children = 0,
    required this.reporterId,
    required this.reportedAt,
  });

  factory VictimReport.fromJson(Map<String, dynamic> json) => _$VictimReportFromJson(json);
  Map<String, dynamic> toJson() => _$VictimReportToJson(this);
}
