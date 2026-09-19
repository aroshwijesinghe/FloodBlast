import 'package:flutter/material.dart';

class ConnectionStatusBar extends StatelessWidget {
  final bool isOffline;
  final bool isPoorConnection;

  const ConnectionStatusBar({
    super.key,
    required this.isOffline,
    this.isPoorConnection = false,
  });

  @override
  Widget build(BuildContext context) {
    if (!isOffline && !isPoorConnection) return const SizedBox.shrink();

    return Container(
      width: double.infinity,
      color: isOffline ? Colors.red : Colors.orange,
      padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 16),
      child: Text(
        isOffline 
            ? 'Offline - Data saved locally' 
            : 'Poor connection - Syncing may be slow',
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
