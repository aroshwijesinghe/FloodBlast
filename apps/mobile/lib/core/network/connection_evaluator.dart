import 'package:connectivity_plus/connectivity_plus.dart';

enum ConnectionQuality { offline, poor2G, moderate3G, good4G, excellentWifi }

class ConnectionEvaluator {
  final Connectivity _connectivity = Connectivity();

  Future<ConnectionQuality> evaluate() async {
    final results = await _connectivity.checkConnectivity();
    if (results.contains(ConnectivityResult.none)) {
      return ConnectionQuality.offline;
    }
    
    // In a real app, you would ping a server or check RTT here.
    if (results.contains(ConnectivityResult.wifi)) {
      return ConnectionQuality.excellentWifi;
    } else if (results.contains(ConnectivityResult.mobile)) {
      return ConnectionQuality.good4G; 
    }
    
    return ConnectionQuality.moderate3G;
  }
}
