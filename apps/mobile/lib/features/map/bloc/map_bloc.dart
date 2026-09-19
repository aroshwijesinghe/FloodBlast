import 'package:flutter_bloc/flutter_bloc.dart';
import 'map_event.dart';
import 'map_state.dart';

class MapBloc extends Bloc<MapEvent, MapState> {
  MapBloc() : super(const MapState()) {
    on<LoadIncidents>(_onLoadIncidents);
    on<FilterByCategory>(_onFilterByCategory);
    on<SelectMarker>(_onSelectMarker);
    on<RefreshMap>(_onRefreshMap);
  }

  Future<void> _onLoadIncidents(LoadIncidents event, Emitter<MapState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      // TODO: Fetch from IncidentRepository
      emit(state.copyWith(isLoading: false, incidents: []));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  void _onFilterByCategory(FilterByCategory event, Emitter<MapState> emit) {
    emit(state.copyWith(selectedCategory: event.category));
    add(LoadIncidents());
  }

  void _onSelectMarker(SelectMarker event, Emitter<MapState> emit) {
    emit(state.copyWith(selectedIncidentId: event.incidentId));
  }

  Future<void> _onRefreshMap(RefreshMap event, Emitter<MapState> emit) async {
    add(LoadIncidents());
  }
}
