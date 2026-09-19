import 'package:json_annotation/json_annotation.dart';

part 'emergency_contact.g.dart';

@JsonSerializable()
class EmergencyContact {
  final String id;
  final String name;
  final String phone;
  final String type; // 'NATIONAL' or 'LOCAL'
  final String? title;

  const EmergencyContact({
    required this.id,
    required this.name,
    required this.phone,
    required this.type,
    this.title,
  });

  factory EmergencyContact.fromJson(Map<String, dynamic> json) => _$EmergencyContactFromJson(json);
  Map<String, dynamic> toJson() => _$EmergencyContactToJson(this);
}
