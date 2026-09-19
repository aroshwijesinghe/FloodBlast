import 'package:flutter/material.dart';
import '../../data/enums/app_enums.dart';

class SeverityBadge extends StatelessWidget {
  final IncidentSeverity severity;

  const SeverityBadge({super.key, required this.severity});

  @override
  Widget build(BuildContext context) {
    Color color;
    switch (severity) {
      case IncidentSeverity.critical:
        color = Colors.red.shade900;
        break;
      case IncidentSeverity.high:
        color = Colors.red;
        break;
      case IncidentSeverity.medium:
        color = Colors.orange;
        break;
      case IncidentSeverity.low:
        color = Colors.green;
        break;
    }
    
    return Chip(
      label: Text(
        severity.name.toUpperCase(),
        style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
      ),
      backgroundColor: color,
    );
  }
}
