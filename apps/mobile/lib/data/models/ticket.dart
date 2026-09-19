import 'package:json_annotation/json_annotation.dart';
import '../enums/app_enums.dart';

part 'ticket.g.dart';

@JsonSerializable()
class Ticket {
  final String id;
  final String title;
  final String description;
  final TicketStatus status;
  final String reporterId;
  final DateTime createdAt;

  const Ticket({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.reporterId,
    required this.createdAt,
  });

  factory Ticket.fromJson(Map<String, dynamic> json) => _$TicketFromJson(json);
  Map<String, dynamic> toJson() => _$TicketToJson(this);
}
