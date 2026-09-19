import 'package:equatable/equatable.dart';
import '../../../data/models/emergency_contact.dart';

class ContactsState extends Equatable {
  final bool isLoading;
  final List<EmergencyContact> nationalContacts;
  final List<EmergencyContact> localContacts;
  final String? error;

  const ContactsState({
    this.isLoading = false,
    this.nationalContacts = const [],
    this.localContacts = const [],
    this.error,
  });

  ContactsState copyWith({
    bool? isLoading,
    List<EmergencyContact>? nationalContacts,
    List<EmergencyContact>? localContacts,
    String? error,
  }) {
    return ContactsState(
      isLoading: isLoading ?? this.isLoading,
      nationalContacts: nationalContacts ?? this.nationalContacts,
      localContacts: localContacts ?? this.localContacts,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [isLoading, nationalContacts, localContacts, error];
}
