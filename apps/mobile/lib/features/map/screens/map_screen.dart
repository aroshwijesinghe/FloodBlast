import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:go_router/go_router.dart';

import '../bloc/map_bloc.dart';
import '../bloc/map_event.dart';
import '../bloc/map_state.dart';
import '../widgets/map_filter_bar.dart';
import '../widgets/incident_bottom_sheet.dart';
import '../../../data/models/incident.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  static const CameraPosition _initialPosition = CameraPosition(
    target: LatLng(7.8731, 80.7718),
    zoom: 7.0,
  );

  GoogleMapController? _mapController;

  @override
  void initState() {
    super.initState();
    context.read<MapBloc>().add(LoadIncidents());
  }

  void _onMarkerTapped(Incident incident) {
    context.read<MapBloc>().add(SelectMarker(incident.id));
    showModalBottomSheet(
      context: context,
      builder: (context) => IncidentBottomSheet(incident: incident),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FloodBlast'),
        actions: [
          IconButton(
            icon: const Icon(Icons.contacts),
            onPressed: () => context.push('/contacts'),
          ),
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => context.push('/auth/login'),
          ),
        ],
      ),
      body: BlocBuilder<MapBloc, MapState>(
        builder: (context, state) {
          Set<Marker> markers = state.incidents.map((incident) {
            return Marker(
              markerId: MarkerId(incident.id),
              position: LatLng(incident.location.latitude, incident.location.longitude),
              onTap: () => _onMarkerTapped(incident),
            );
          }).toSet();

          return Stack(
            children: [
              GoogleMap(
                initialCameraPosition: _initialPosition,
                onMapCreated: (controller) => _mapController = controller,
                myLocationEnabled: true,
                myLocationButtonEnabled: true,
                markers: markers,
              ),
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: MapFilterBar(
                  selectedCategory: state.selectedCategory,
                  onFilterChanged: (category) {
                    context.read<MapBloc>().add(FilterByCategory(category));
                  },
                ),
              ),
              if (state.isLoading)
                const Center(child: CircularProgressIndicator()),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push('/incident/create'),
        icon: const Icon(Icons.warning),
        label: const Text('Report Incident'),
        backgroundColor: Theme.of(context).colorScheme.error,
        foregroundColor: Colors.white,
      ),
    );
  }
}
