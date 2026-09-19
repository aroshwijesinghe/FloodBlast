import 'package:equatable/equatable.dart';

class AuthState extends Equatable {
  final bool isLoading;
  final bool isDeviceRegistered;
  final bool isOtpSent;
  final bool isAuthenticated;
  final String? error;

  const AuthState({
    this.isLoading = false,
    this.isDeviceRegistered = false,
    this.isOtpSent = false,
    this.isAuthenticated = false,
    this.error,
  });

  AuthState copyWith({
    bool? isLoading,
    bool? isDeviceRegistered,
    bool? isOtpSent,
    bool? isAuthenticated,
    String? error,
  }) {
    return AuthState(
      isLoading: isLoading ?? this.isLoading,
      isDeviceRegistered: isDeviceRegistered ?? this.isDeviceRegistered,
      isOtpSent: isOtpSent ?? this.isOtpSent,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [isLoading, isDeviceRegistered, isOtpSent, isAuthenticated, error];
}
