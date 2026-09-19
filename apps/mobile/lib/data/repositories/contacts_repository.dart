import '../models/emergency_contact.dart';
import '../../core/network/api_client.dart';

class ContactsRepository {
  final ApiClient _apiClient;

  ContactsRepository(this._apiClient);

  Future<List<EmergencyContact>> getNationalContacts() async {
    // Fetch from Drift DB cache first
    // Background update via API when online
    return [];
  }
}
