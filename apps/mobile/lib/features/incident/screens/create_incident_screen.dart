import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import '../bloc/incident_bloc.dart';
import '../bloc/incident_event.dart';
import '../bloc/incident_state.dart';
import '../../../data/enums/app_enums.dart';
import '../../../data/models/incident.dart';
import '../../../data/models/geo_point.dart';

class CreateIncidentScreen extends StatefulWidget {
  const CreateIncidentScreen({super.key});

  @override
  State<CreateIncidentScreen> createState() => _CreateIncidentScreenState();
}

class _CreateIncidentScreenState extends State<CreateIncidentScreen> {
  int _currentStep = 0;
  
  IncidentCategory? _selectedCategory;
  final _descController = TextEditingController();
  final List<File> _images = [];
  
  // Victim details
  int _pregnant = 0;
  int _elderly = 0;
  int _disabled = 0;
  int _wounded = 0;
  int _children = 0;

  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.camera);
    if (image != null) {
      setState(() {
        _images.add(File(image.path));
      });
    }
  }

  void _submit() {
    if (_selectedCategory == null || _descController.text.isEmpty || _images.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please complete category, description, and at least 1 image.')),
      );
      return;
    }

    final incident = Incident(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      category: _selectedCategory!,
      severity: IncidentSeverity.medium, // Default for now
      status: IncidentStatus.active,
      location: const GeoPoint(latitude: 7.8731, longitude: 80.7718),
      reporterId: 'dummy_user_1',
      description: _descController.text,
      createdAt: DateTime.now(),
    );

    context.read<IncidentBloc>().add(
      CreateIncident(
        incident: incident,
        mediaPaths: _images.map((e) => e.path).toList(),
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<IncidentBloc, IncidentState>(
      listener: (context, state) {
        if (state.isSuccess) {
          context.pop();
        } else if (state.error != null) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.error!)));
        }
      },
      child: Scaffold(
        appBar: AppBar(title: const Text('Report Incident')),
        body: Stepper(
          currentStep: _currentStep,
          onStepContinue: () {
            if (_currentStep < 5) {
              setState(() => _currentStep += 1);
            } else {
              _submit();
            }
          },
          onStepCancel: () {
            if (_currentStep > 0) {
              setState(() => _currentStep -= 1);
            } else {
              context.pop();
            }
          },
          steps: [
            Step(
              title: const Text('Category'),
              content: DropdownButtonFormField<IncidentCategory>(
                value: _selectedCategory,
                items: IncidentCategory.values.map((cat) {
                  return DropdownMenuItem(
                    value: cat,
                    child: Text(cat.name.toUpperCase()),
                  );
                }).toList(),
                onChanged: (val) => setState(() => _selectedCategory = val),
              ),
              isActive: _currentStep >= 0,
            ),
            Step(
              title: const Text('Description & Voice'),
              content: Column(
                children: [
                  TextField(
                    controller: _descController,
                    maxLines: 3,
                    decoration: const InputDecoration(hintText: 'Describe the situation...'),
                  ),
                ],
              ),
              isActive: _currentStep >= 1,
            ),
            Step(
              title: const Text('Images'),
              content: Column(
                children: [
                  ElevatedButton.icon(
                    onPressed: _pickImage,
                    icon: const Icon(Icons.camera_alt),
                    label: const Text('Take Photo'),
                  ),
                  Wrap(
                    spacing: 8,
                    children: _images.map((f) => Image.file(f, width: 80, height: 80)).toList(),
                  ),
                ],
              ),
              isActive: _currentStep >= 2,
            ),
            Step(
              title: const Text('Victim Details'),
              content: const Text('Counters for vulnerable groups...'),
              isActive: _currentStep >= 3,
            ),
            Step(
              title: const Text('Contact Details'),
              content: const Text('Optional exposure details...'),
              isActive: _currentStep >= 4,
            ),
            Step(
              title: const Text('Review'),
              content: const Text('Review and submit.'),
              isActive: _currentStep >= 5,
            ),
          ],
        ),
      ),
    );
  }
}
