import 'package:shared_preferences/shared_preferences.dart';

class AuthRepository {
  final SharedPreferences _prefs;
  
  AuthRepository(this._prefs);

  Future<void> saveToken(String token) async {
    await _prefs.setString('jwt_token', token);
  }

  String? getToken() {
    return _prefs.getString('jwt_token');
  }

  Future<void> clearSession() async {
    await _prefs.remove('jwt_token');
  }
}
