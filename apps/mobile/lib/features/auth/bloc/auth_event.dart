import 'package:equatable/equatable.dart';
import '../../../data/enums/app_enums.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();
  @override
  List<Object?> get props => [];
}

class RegisterDevice extends AuthEvent {}

class RequestOtp extends AuthEvent {
  final String phoneNumber;
  const RequestOtp(this.phoneNumber);
  @override
  List<Object?> get props => [phoneNumber];
}

class VerifyOtp extends AuthEvent {
  final String otpCode;
  const VerifyOtp(this.otpCode);
  @override
  List<Object?> get props => [otpCode];
}

class RegisterTrusted extends AuthEvent {
  final String name;
  final String nic;
  final String badgeId;
  final UserType role;
  
  const RegisterTrusted({
    required this.name,
    required this.nic,
    required this.badgeId,
    required this.role,
  });

  @override
  List<Object?> get props => [name, nic, badgeId, role];
}
