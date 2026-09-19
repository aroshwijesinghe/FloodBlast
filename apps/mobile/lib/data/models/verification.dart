import 'package:json_annotation/json_annotation.dart';
import '../enums/app_enums.dart';

part 'verification.g.dart';

@JsonSerializable()
class Verification {
  final String id;
  final String incidentId;
  final String userId;
  final VerificationVote vote;
  final double confidenceScore;
  final DateTime verifiedAt;

  const Verification({
    required this.id,
    required this.incidentId,
    required this.userId,
    required this.vote,
    required this.confidenceScore,
    required this.verifiedAt,
  });

  factory Verification.fromJson(Map<String, dynamic> json) => _$VerificationFromJson(json);
  Map<String, dynamic> toJson() => _$VerificationToJson(this);
}
