import 'package:json_annotation/json_annotation.dart';
import 'geo_point.dart';

part 'safe_place.g.dart';

@JsonSerializable()
class SafePlace {
  final String id;
  final String name;
  final String description;
  final GeoPoint location;
  final int capacity;
  final int currentOccupancy;
  final String contactPhone;

  const SafePlace({
    required this.id,
    required this.name,
    required this.description,
    required this.location,
    required this.capacity,
    required this.currentOccupancy,
    required this.contactPhone,
  });

  factory SafePlace.fromJson(Map<String, dynamic> json) => _$SafePlaceFromJson(json);
  Map<String, dynamic> toJson() => _$SafePlaceToJson(this);
}
