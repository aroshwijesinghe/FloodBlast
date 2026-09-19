import 'package:flutter_bloc/flutter_bloc.dart';
import 'auth_event.dart';
import 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(const AuthState()) {
    on<RegisterDevice>(_onRegisterDevice);
    on<RequestOtp>(_onRequestOtp);
    on<VerifyOtp>(_onVerifyOtp);
    on<RegisterTrusted>(_onRegisterTrusted);
  }

  Future<void> _onRegisterDevice(RegisterDevice event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoading: false, isDeviceRegistered: true));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onRequestOtp(RequestOtp event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoading: false, isOtpSent: true));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onVerifyOtp(VerifyOtp event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoading: false, isAuthenticated: true));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }

  Future<void> _onRegisterTrusted(RegisterTrusted event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    try {
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoading: false, isAuthenticated: true));
    } catch (e) {
      emit(state.copyWith(isLoading: false, error: e.toString()));
    }
  }
}
