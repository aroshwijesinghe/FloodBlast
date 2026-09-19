import 'package:equatable/equatable.dart';
import '../../../data/models/incident.dart';

abstract class IncidentEvent extends Equatable {
  const IncidentEvent();

  @override
  List<Object?> get props => [];
}

class CreateIncident extends IncidentEvent {
  final Incident incident;
  final List<String> mediaPaths;

  const CreateIncident({required this.incident, this.mediaPaths = const []});

  @override
  List<Object?> get props => [incident, mediaPaths];
}

class LoadIncidentDetail extends IncidentEvent {
  final String incidentId;
  const LoadIncidentDetail(this.incidentId);

  @override
  List<Object?> get props => [incidentId];
}

class UpdateIncident extends IncidentEvent {
  final Incident incident;
  const UpdateIncident(this.incident);

  @override
  List<Object?> get props => [incident];
}
