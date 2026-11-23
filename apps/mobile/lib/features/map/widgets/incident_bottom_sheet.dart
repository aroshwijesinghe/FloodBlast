import 'package:flood_blast/app/app_language.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../data/models/incident.dart';
import '../../../shared/widgets/disaster_icon.dart';
import '../../../shared/widgets/priority_badge.dart';

class IncidentBottomSheet extends StatelessWidget {
  final Incident incident;

  const IncidentBottomSheet({super.key, required this.incident});

  @override
  Widget build(BuildContext context) {
    final reportedAt = incident.createdAt.toLocal();
    final dates = MaterialLocalizations.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              DisasterIcon(category: incident.category, color: Colors.blue),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  context.tr(incident.category.name),
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              PriorityBadge(severity: incident.severity),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            incident.description ?? context.tr('noDescription'),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "${context.tr('reported')} · ${dates.formatMediumDate(reportedAt)} ${dates.formatTimeOfDay(TimeOfDay.fromDateTime(reportedAt))}",
                style: Theme.of(context).textTheme.bodySmall,
              ),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                  context.push('/incident/${incident.id}');
                },
                child: Text(context.tr('viewDetails')),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
