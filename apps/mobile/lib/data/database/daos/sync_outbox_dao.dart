import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/sync_outbox_table.dart';

part 'sync_outbox_dao.g.dart';

@DriftAccessor(tables: [SyncOutboxTable])
class SyncOutboxDao extends DatabaseAccessor<AppDatabase> with _$SyncOutboxDaoMixin {
  SyncOutboxDao(super.db);

  Future<int> insertEntry(SyncOutboxTableCompanion entry) => into(syncOutboxTable).insert(entry);
  
  Future<List<SyncOutboxTableData>> getPendingByPriority() {
    return (select(syncOutboxTable)
      ..where((t) => t.syncStatus.equals('PENDING') | t.syncStatus.equals('FAILED'))
      ..orderBy([
        (t) => OrderingTerm(expression: t.priority, mode: OrderingMode.desc),
        (t) => OrderingTerm(expression: t.createdAt, mode: OrderingMode.asc)
      ]))
    .get();
  }

  Future<bool> updateStatus(int id, String status) {
    return (update(syncOutboxTable)..where((t) => t.id.equals(id)))
        .write(SyncOutboxTableCompanion(syncStatus: Value(status)));
  }
}
