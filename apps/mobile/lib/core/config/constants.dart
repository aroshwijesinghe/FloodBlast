/// Redefined constants from shared-types
class AppConstants {
  // Verification weights
  static const double trustedUserWeight = 2.0;
  static const double authorityUserWeight = 5.0;
  static const double generalUserWeight = 1.0;

  // Decay rates (e.g., how fast incident relevance decays over time)
  static const double baseDecayRate = 0.1;

  // Proximity thresholds in meters
  static const double nearbyThreshold = 5000.0; // 5km
  
  // Default emergency numbers
  static const Map<String, String> defaultEmergencyNumbers = {
    'Police': '119',
    'Ambulance': '1990',
    'Disaster Management Center': '117',
  };
}
