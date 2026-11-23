import 'package:flood_blast/shared/widgets/language_switcher.dart';
import 'package:flood_blast/app/app_language.dart';
import 'package:flutter/material.dart';

class TrustedRegistrationScreen extends StatelessWidget {
  const TrustedRegistrationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('trustedRegistration')), actions: const [LanguageSwitcher()]),
      body: Center(
        child: Text(context.tr('trustedForm')),
      ),
    );
  }
}
