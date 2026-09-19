import 'package:flutter_bloc/flutter_bloc.dart';
import 'contacts_event.dart';
import 'contacts_state.dart';
import '../../../data/models/emergency_contact.dart';

class ContactsBloc extends Bloc<ContactsEvent, ContactsState> {
  ContactsBloc() : super(const ContactsState()) {
    on<LoadContacts>(_onLoadContacts);
  }

  Future<void> _onLoadContacts(LoadContacts event, Emitter<ContactsState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      final national = [
        const EmergencyContact(id: '1', name: 'Police', phone: '119', type: 'NATIONAL'),
        const EmergencyContact(id: '2', name: 'Ambulance', phone: '1990', type: 'NATIONAL'),
        const EmergencyContact(id: '3', name: 'Disaster Management Center', phone: '117', type: 'NATIONAL'),
      ];
      emit(state.copyWith(
        isLoading: false,
        nationalContacts: national,
        localContacts: [],
      ));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
