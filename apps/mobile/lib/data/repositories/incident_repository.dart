import '../database/daos/incidents_dao.dart';
import '../database/daos/sync_outbox_dao.dart';
import '../../core/network/api_client.dart';
import '../models/incident.dart';

class IncidentRepository {
  final IncidentsDao _incidentsDao;
  final SyncOutboxDao _outboxDao;
  final ApiClient _apiClient;

  IncidentRepository(this._incidentsDao, this._outboxDao, this._apiClient);

  Future<void> createIncident(Incident incident, List<String> mediaPaths) async {
    // 1. Insert directly into local Drift DB for offline availability
    // 2. Queue synchronization jobs in sync_outbox_table with appropriate priorities
    // Text = High, Voice = Medium, Images = Low
  }

  Future<List<Incident>> getNearbyIncidents(double lat, double lng, double radius) async {
    // Offline-first approach: fetch from local SQLite database first
    return [];
  }
}
