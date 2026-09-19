import 'package:flutter/material.dart';
import '../shared/theme/app_theme.dart';
import 'router.dart';

class FloodBlastApp extends StatelessWidget {
  const FloodBlastApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'FloodBlast',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
