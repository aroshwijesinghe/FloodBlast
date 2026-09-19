import 'package:json_annotation/json_annotation.dart';
import '../enums/app_enums.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final String id;
  final String phone;
  final UserType type;
  final bool isVerified;
  final DateTime createdAt;

  const User({
    required this.id,
    required this.phone,
    required this.type,
    required this.isVerified,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
