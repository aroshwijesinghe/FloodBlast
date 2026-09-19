import 'package:flutter_bloc/flutter_bloc.dart';
import 'incident_event.dart';
import 'incident_state.dart';

class IncidentBloc extends Bloc<IncidentEvent, IncidentState> {
  // TODO: Inject IncidentRepository and SyncEngine

  IncidentBloc() : super(const IncidentState()) {
    on<CreateIncident>(_onCreateIncident);
    on<LoadIncidentDetail>(_onLoadIncidentDetail);
    on<UpdateIncident>(_onUpdateIncident);
  }

  Future<void> _onCreateIncident(CreateIncident event, Emitter<IncidentState> emit) async {
    emit(state.copyWith(isLoading: true, isSuccess: false));
    try {
      // 1. Save to local DB via repository
      // 2. Add to sync outbox
      emit(state.copyWith(isLoading: false, isSuccess: true));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onLoadIncidentDetail(LoadIncidentDetail event, Emitter<IncidentState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      // Fetch incident detail from repo
      emit(state.copyWith(isLoading: false)); // pass currentIncident
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onUpdateIncident(UpdateIncident event, Emitter<IncidentState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      // Update local db and queue sync
      emit(state.copyWith(isLoading: false, currentIncident: event.incident));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
