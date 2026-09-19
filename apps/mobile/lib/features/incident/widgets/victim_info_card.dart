import 'package:flutter/material.dart';

class VictimInfoCard extends StatelessWidget {
  final int pregnant;
  final int elderly;
  final int disabled;
  final int wounded;
  final int children;

  const VictimInfoCard({
    super.key,
    this.pregnant = 0,
    this.elderly = 0,
    this.disabled = 0,
    this.wounded = 0,
    this.children = 0,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Vulnerable Populations',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 16,
              runSpacing: 16,
              children: [
                _buildCountIcon(Icons.pregnant_woman, 'Pregnant', pregnant),
                _buildCountIcon(Icons.elderly, 'Elderly', elderly),
                _buildCountIcon(Icons.accessible, 'Disabled', disabled),
                _buildCountIcon(Icons.local_hospital, 'Wounded', wounded),
                _buildCountIcon(Icons.child_care, 'Children', children),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCountIcon(IconData icon, String label, int count) {
    if (count == 0) return const SizedBox.shrink();
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.blueGrey),
        const SizedBox(width: 4),
        Text('$label: $count', style: const TextStyle(fontWeight: FontWeight.w500)),
      ],
    );
  }
}
