import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'dart:io';

import 'tables/incidents_table.dart';
import 'tables/sync_outbox_table.dart';
import 'daos/incidents_dao.dart';
import 'daos/sync_outbox_dao.dart';

part 'app_database.g.dart';

@DriftDatabase(
  tables: [IncidentsTable, SyncOutboxTable],
  daos: [IncidentsDao, SyncOutboxDao],
)
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'floodblast.sqlite'));
    return NativeDatabase(file);
  });
}
