import 'package:flutter/material.dart';
import '../shared/theme/app_theme.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'app_language.dart';
import 'router.dart';

class FloodBlastApp extends StatelessWidget {
  const FloodBlastApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'FloodBlast',
      locale: context.watch<LanguageCubit>().state,
      supportedLocales: languageNames.keys.map((code) => Locale(code)),
      localizationsDelegates: const [
        AppStringsDelegate(),
        ...GlobalMaterialLocalizations.delegates,
      ],
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
