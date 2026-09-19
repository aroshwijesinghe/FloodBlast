import 'package:equatable/equatable.dart';
import '../../../data/enums/app_enums.dart';

abstract class MapEvent extends Equatable {
  const MapEvent();

  @override
  List<Object?> get props => [];
}

class LoadIncidents extends MapEvent {}

class FilterByCategory extends MapEvent {
  final IncidentCategory? category;
  const FilterByCategory(this.category);

  @override
  List<Object?> get props => [category];
}

class SelectMarker extends MapEvent {
  final String incidentId;
  const SelectMarker(this.incidentId);

  @override
  List<Object?> get props => [incidentId];
}

class RefreshMap extends MapEvent {}
