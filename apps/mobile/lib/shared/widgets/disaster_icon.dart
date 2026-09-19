import 'package:flutter/material.dart';
import '../../data/enums/app_enums.dart';

class DisasterIcon extends StatelessWidget {
  final IncidentCategory category;
  final double size;
  final Color? color;

  const DisasterIcon({
    super.key,
    required this.category,
    this.size = 24.0,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    IconData iconData;
    switch (category) {
      case IncidentCategory.flood:
        iconData = Icons.water;
        break;
      case IncidentCategory.landslide:
        iconData = Icons.landscape;
        break;
      case IncidentCategory.roadBroken:
        iconData = Icons.add_road;
        break;
      case IncidentCategory.fire:
        iconData = Icons.local_fire_department;
        break;
      case IncidentCategory.medical:
        iconData = Icons.medical_services;
        break;
      case IncidentCategory.other:
      default:
        iconData = Icons.warning;
    }
    return Icon(iconData, size: size, color: color ?? Colors.white);
  }
}
