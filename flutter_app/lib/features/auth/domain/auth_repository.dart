import 'user_entity.dart';

/// Abstract Authentication Repository Interface
abstract class AuthRepository {
  Future<UserEntity> login(String email, String password);
  Future<UserEntity> register(String name, String email, String password);
  Future<void> logout();
  Future<UserEntity?> getCurrentUser();
}
