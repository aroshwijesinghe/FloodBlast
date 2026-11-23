import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

const languageNames = {'si': 'සිංහල', 'en': 'English', 'ta': 'தமிழ்'};

class LanguageCubit extends Cubit<Locale> {
  static const preferenceKey = 'fb.language';
  final SharedPreferences preferences;

  LanguageCubit(this.preferences)
      : super(Locale(_savedCode(preferences.getString(preferenceKey))));

  static String _savedCode(String? code) =>
      code != null && languageNames.containsKey(code) ? code : 'en';

  Future<void> select(String code) async {
    if (!languageNames.containsKey(code)) return;
    emit(Locale(code));
    await preferences.setString(preferenceKey, code);
  }
}

class AppStrings {
  final Map<String, String> values;
  const AppStrings(this.values);
}

class AppStringsDelegate extends LocalizationsDelegate<AppStrings> {
  const AppStringsDelegate();

  @override
  bool isSupported(Locale locale) => languageNames.containsKey(locale.languageCode);

  @override
  Future<AppStrings> load(Locale locale) async {
    final json = await rootBundle.loadString('l10n/app_${locale.languageCode}.arb');
    return AppStrings(Map<String, String>.from(jsonDecode(json) as Map));
  }

  @override
  bool shouldReload(AppStringsDelegate old) => false;
}

extension AppTranslation on BuildContext {
  String tr(String key) => Localizations.of<AppStrings>(this, AppStrings)!.values[key]!;
}
