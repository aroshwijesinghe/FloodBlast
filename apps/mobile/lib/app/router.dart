import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Placeholder imports for screens
import '../features/map/screens/map_screen.dart';
import '../features/incident/screens/create_incident_screen.dart';
import '../features/incident/screens/incident_detail_screen.dart';
import '../features/contacts/screens/contacts_screen.dart';
import '../features/auth/screens/login_screen.dart';
import '../features/auth/screens/trusted_registration_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const MapScreen(),
    ),
    GoRoute(
      path: '/incident/create',
      builder: (context, state) => const CreateIncidentScreen(),
    ),
    GoRoute(
      path: '/incident/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return IncidentDetailScreen(incidentId: id);
      },
    ),
    GoRoute(
      path: '/contacts',
      builder: (context, state) => const ContactsScreen(),
    ),
    GoRoute(
      path: '/auth/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/auth/trusted',
      builder: (context, state) => const TrustedRegistrationScreen(),
    ),
  ],
);
