/// App environment and base configurations
class AppConfig {
  static const String apiBaseUrl = 'https://api.floodblast.example.com';
  static const String googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  
  static const bool isProduction = bool.fromEnvironment('dart.vm.product');
}
