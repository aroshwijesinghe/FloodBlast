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
                  incident.category.name.toUpperCase(),
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              PriorityBadge(severity: incident.severity),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            incident.description ?? 'No description provided.',
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Reported ${incident.createdAt.toLocal().toString().substring(0, 16)}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                  context.push('/incident/${incident.id}');
                },
                child: const Text('View Details'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
