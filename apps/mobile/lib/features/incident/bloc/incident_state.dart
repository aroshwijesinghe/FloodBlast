import 'package:equatable/equatable.dart';
import '../../../data/models/incident.dart';

class IncidentState extends Equatable {
  final bool isLoading;
  final Incident? currentIncident;
  final bool isSuccess;
  final String? error;

  const IncidentState({
    this.isLoading = false,
    this.currentIncident,
    this.isSuccess = false,
    this.error,
  });

  IncidentState copyWith({
    bool? isLoading,
    Incident? currentIncident,
    bool? isSuccess,
    String? error,
  }) {
    return IncidentState(
      isLoading: isLoading ?? this.isLoading,
      currentIncident: currentIncident ?? this.currentIncident,
      isSuccess: isSuccess ?? this.isSuccess,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [isLoading, currentIncident, isSuccess, error];
}
