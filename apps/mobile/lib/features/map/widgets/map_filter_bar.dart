import 'package:flutter/material.dart';
import '../../../data/enums/app_enums.dart';

class MapFilterBar extends StatelessWidget {
  final IncidentCategory? selectedCategory;
  final ValueChanged<IncidentCategory?> onFilterChanged;

  const MapFilterBar({
    super.key,
    required this.selectedCategory,
    required this.onFilterChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          _buildFilterChip('All', null),
          ...IncidentCategory.values.map(
            (category) => _buildFilterChip(category.name.toUpperCase(), category),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, IncidentCategory? category) {
    final isSelected = selectedCategory == category;
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (bool selected) {
          onFilterChanged(selected ? category : null);
        },
      ),
    );
  }
}
