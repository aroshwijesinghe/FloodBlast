import 'package:equatable/equatable.dart';
import '../../../data/models/incident.dart';
import '../../../data/enums/app_enums.dart';

class MapState extends Equatable {
  final bool isLoading;
  final List<Incident> incidents;
  final IncidentCategory? selectedCategory;
  final String? selectedIncidentId;
  final String? error;

  const MapState({
    this.isLoading = false,
    this.incidents = const [],
    this.selectedCategory,
    this.selectedIncidentId,
    this.error,
  });

  MapState copyWith({
    bool? isLoading,
    List<Incident>? incidents,
    IncidentCategory? selectedCategory,
    String? selectedIncidentId,
    String? error,
  }) {
    return MapState(
      isLoading: isLoading ?? this.isLoading,
      incidents: incidents ?? this.incidents,
      selectedCategory: selectedCategory != null ? selectedCategory : this.selectedCategory,
      selectedIncidentId: selectedIncidentId ?? this.selectedIncidentId,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [isLoading, incidents, selectedCategory, selectedIncidentId, error];
}
