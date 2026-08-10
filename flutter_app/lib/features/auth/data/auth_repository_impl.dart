import 'package:uuid/uuid.dart';
import '../domain/auth_repository.dart';
import '../domain/user_entity.dart';
import '../../../core/storage/hive_storage_service.dart';

/// Concrete Data Implementation of AuthRepository
class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl();

  @override
  Future<UserEntity> login(String email, String password) async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 800));

    if (email.contains('error')) {
      throw Exception('Invalid credentials provided.');
    }

    final user = UserEntity(
      id: const Uuid().v4(),
      email: email,
      name: email.split('@').first.toUpperCase(),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    );

    // Save token & user session locally in Hive
    await HiveStorageService.saveAuthToken('dummy_jwt_token_${user.id}');
    await HiveStorageService.cacheData('current_user', user.toJson());

    return user;
  }

  @override
  Future<UserEntity> register(String name, String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 800));

    final user = UserEntity(
      id: const Uuid().v4(),
      email: email,
      name: name,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    );

    await HiveStorageService.saveAuthToken('dummy_jwt_token_${user.id}');
    await HiveStorageService.cacheData('current_user', user.toJson());

    return user;
  }

  @override
  Future<void> logout() async {
    await HiveStorageService.clearAuthToken();
    await HiveStorageService.cacheData('current_user', null);
  }

  @override
  Future<UserEntity?> getCurrentUser() async {
    final token = HiveStorageService.getAuthToken();
    if (token == null) return null;

    final cachedJson = HiveStorageService.getCachedData('current_user');
    if (cachedJson != null && cachedJson is Map) {
      return UserEntity.fromJson(Map<String, dynamic>.from(cachedJson));
    }
    return null;
  }
}
