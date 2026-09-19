import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/incidents_table.dart';

part 'incidents_dao.g.dart';

@DriftAccessor(tables: [IncidentsTable])
class IncidentsDao extends DatabaseAccessor<AppDatabase> with _$IncidentsDaoMixin {
  IncidentsDao(super.db);

  Future<List<IncidentsTableData>> getAllIncidents() => select(incidentsTable).get();
  
  Future<int> insertIncident(IncidentsTableCompanion incident) => 
      into(incidentsTable).insert(incident, mode: InsertMode.insertOrReplace);
      
  Future<bool> updateIncident(IncidentsTableCompanion incident) => 
      update(incidentsTable).replace(incident);
}
