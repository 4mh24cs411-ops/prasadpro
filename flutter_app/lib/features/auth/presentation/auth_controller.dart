import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/auth_repository.dart';
import '../domain/user_entity.dart';
import '../data/auth_repository_impl.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepositoryImpl();
});

/// Riverpod StateNotifier controller for authentication
class AuthController extends StateNotifier<AsyncValue<UserEntity?>> {
  final AuthRepository _repository;

  AuthController(this._repository) : super(const AsyncValue.loading()) {
    checkCurrentUser();
  }

  Future<void> checkCurrentUser() async {
    try {
      final user = await _repository.getCurrentUser();
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    try {
      final user = await _repository.login(email, password);
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
      rethrow;
    }
  }

  Future<void> register(String name, String email, String password) async {
    state = const AsyncValue.loading();
    try {
      final user = await _repository.register(name, email, password);
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
      rethrow;
    }
  }

  Future<void> logout() async {
    await _repository.logout();
    state = const AsyncValue.data(null);
  }
}

final authControllerProvider =
    StateNotifierProvider<AuthController, AsyncValue<UserEntity?>>((ref) {
  return AuthController(ref.watch(authRepositoryProvider));
});
