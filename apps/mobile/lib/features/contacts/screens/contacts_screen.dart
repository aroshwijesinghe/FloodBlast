import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:url_launcher/url_launcher.dart';
import '../bloc/contacts_bloc.dart';
import '../bloc/contacts_event.dart';
import '../bloc/contacts_state.dart';
import '../../../data/models/emergency_contact.dart';

class ContactsScreen extends StatefulWidget {
  const ContactsScreen({super.key});

  @override
  State<ContactsScreen> createState() => _ContactsScreenState();
}

class _ContactsScreenState extends State<ContactsScreen> {
  @override
  void initState() {
    super.initState();
    context.read<ContactsBloc>().add(LoadContacts());
  }

  Future<void> _makePhoneCall(String phoneNumber) async {
    final Uri launchUri = Uri(
      scheme: 'tel',
      path: phoneNumber,
    );
    if (await canLaunchUrl(launchUri)) {
      await launchUrl(launchUri);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Emergency Contacts')),
      body: BlocBuilder<ContactsBloc, ContactsState>(
        builder: (context, state) {
          if (state.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (state.error != null) {
            return Center(child: Text('Error: ${state.error}'));
          }

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              const Text('National Emergency', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              ...state.nationalContacts.map((c) => _buildContactCard(c)),
              const SizedBox(height: 24),
              const Text('Local Contacts', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              if (state.localContacts.isEmpty)
                const Text('No local contacts found for your area.'),
              ...state.localContacts.map((c) => _buildContactCard(c)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildContactCard(EmergencyContact contact) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: const CircleAvatar(child: Icon(Icons.phone)),
        title: Text(contact.name),
        subtitle: Text(contact.phone),
        trailing: IconButton(
          icon: const Icon(Icons.call, color: Colors.green),
          onPressed: () => _makePhoneCall(contact.phone),
        ),
      ),
    );
  }
}
