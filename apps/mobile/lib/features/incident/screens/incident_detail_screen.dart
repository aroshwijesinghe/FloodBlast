import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../bloc/incident_bloc.dart';
import '../bloc/incident_event.dart';
import '../bloc/incident_state.dart';
import '../../../shared/widgets/loading_shimmer.dart';
import '../../../shared/widgets/severity_badge.dart';

class IncidentDetailScreen extends StatefulWidget {
  final String incidentId;
  const IncidentDetailScreen({super.key, required this.incidentId});

  @override
  State<IncidentDetailScreen> createState() => _IncidentDetailScreenState();
}

class _IncidentDetailScreenState extends State<IncidentDetailScreen> {
  @override
  void initState() {
    super.initState();
    context.read<IncidentBloc>().add(LoadIncidentDetail(widget.incidentId));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Incident Details')),
      body: BlocBuilder<IncidentBloc, IncidentState>(
        builder: (context, state) {
          if (state.isLoading || state.currentIncident == null) {
            return const Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                children: [
                  LoadingShimmer(height: 200),
                  SizedBox(height: 16),
                  LoadingShimmer(height: 24, width: 150),
                  SizedBox(height: 8),
                  LoadingShimmer(height: 60),
                ],
              ),
            );
          }

          final incident = state.currentIncident!;
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(incident.category.name.toUpperCase(), style: Theme.of(context).textTheme.headlineSmall),
                  SeverityBadge(severity: incident.severity),
                ],
              ),
              const SizedBox(height: 16),
              Text(incident.description ?? 'No description provided.', style: Theme.of(context).textTheme.bodyLarge),
              const SizedBox(height: 24),
              const Text('Media', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              const SizedBox(height: 8),
              CachedNetworkImage(
                imageUrl: 'https://via.placeholder.com/600x400',
                placeholder: (context, url) => const LoadingShimmer(height: 200),
                errorWidget: (context, url, error) => const Icon(Icons.error),
                height: 200,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.thumb_up),
                      label: const Text('Verify'),
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.thumb_down),
                      label: const Text('Deny'),
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                    ),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
