import 'package:flutter/material.dart';
import 'app/app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // TODO: Initialize DI (GetIt)
  // TODO: Initialize Drift DB
  // TODO: Setup GPS permissions

  runApp(const FloodBlastApp());
}
