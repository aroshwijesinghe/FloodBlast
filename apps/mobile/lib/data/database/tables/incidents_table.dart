import 'package:drift/drift.dart';

class IncidentsTable extends Table {
  TextColumn get id => text()();
  TextColumn get reporterId => text()();
  TextColumn get category => text()();
  TextColumn get severity => text()();
  TextColumn get status => text()();
  RealColumn get latitude => real()();
  RealColumn get longitude => real()();
  TextColumn get description => text().nullable()();
  RealColumn get confidenceScore => real().nullable()();
  TextColumn get gnDivision => text().nullable()();
  TextColumn get dsDivision => text().nullable()();
  TextColumn get district => text().nullable()();
  DateTimeColumn get createdAt => dateTime()();
  TextColumn get syncStatus => text().withDefault(const Constant('PENDING'))();

  @override
  Set<Column> get primaryKey => {id};
}
