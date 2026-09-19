import 'package:flutter/material.dart';
import '../../data/enums/app_enums.dart';

class PriorityBadge extends StatelessWidget {
  final IncidentSeverity severity;

  const PriorityBadge({super.key, required this.severity});

  @override
  Widget build(BuildContext context) {
    Color badgeColor;
    switch (severity) {
      case IncidentSeverity.critical:
        badgeColor = Colors.red.shade900;
        break;
      case IncidentSeverity.high:
        badgeColor = Colors.red;
        break;
      case IncidentSeverity.medium:
        badgeColor = Colors.orange;
        break;
      case IncidentSeverity.low:
        badgeColor = Colors.green;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: badgeColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        severity.name.toUpperCase(),
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
