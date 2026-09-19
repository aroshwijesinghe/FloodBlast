import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF1565C0), // Deep Blue
        primary: const Color(0xFF1565C0),
        error: const Color(0xFFD32F2F), // Danger/Error
        secondary: const Color(0xFFF57C00), // Warning/Verified
        tertiary: const Color(0xFF388E3C), // Success/Safe place
      ),
      appBarTheme: const AppBarTheme(
        centerTitle: true,
        elevation: 0,
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        brightness: Brightness.dark,
        seedColor: const Color(0xFF1565C0),
        primary: const Color(0xFF90CAF9),
        error: const Color(0xFFEF5350),
        secondary: const Color(0xFFFFB74D),
        tertiary: const Color(0xFF81C784),
      ),
    );
  }
}
