import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'app/app.dart';
import 'app/app_language.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // TODO: Initialize DI (GetIt)
  // TODO: Initialize Drift DB
  // TODO: Setup GPS permissions

  final preferences = await SharedPreferences.getInstance();
  runApp(BlocProvider(
    create: (_) => LanguageCubit(preferences),
    child: const FloodBlastApp(),
  ));
}
