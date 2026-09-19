import 'package:json_annotation/json_annotation.dart';

part 'geo_point.g.dart';

@JsonSerializable()
class GeoPoint {
  final double latitude;
  final double longitude;
  final double? altitude;
  final double? accuracy;

  const GeoPoint({
    required this.latitude,
    required this.longitude,
    this.altitude,
    this.accuracy,
  });

  factory GeoPoint.fromJson(Map<String, dynamic> json) => _$GeoPointFromJson(json);
  Map<String, dynamic> toJson() => _$GeoPointToJson(this);
}
