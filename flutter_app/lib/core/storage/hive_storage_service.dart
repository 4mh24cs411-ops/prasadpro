import 'package:hive_flutter/hive_flutter.dart';

/// Local Storage Service powered by Hive for offline caching & preferences
class HiveStorageService {
  static const String settingsBoxName = 'settings_box';
  static const String authBoxName = 'auth_box';
  static const String cacheBoxName = 'cache_box';

  /// Initializes Hive and opens required boxes
  static Future<void> init() async {
    await Hive.initFlutter();
    await Hive.openBox(settingsBoxName);
    await Hive.openBox(authBoxName);
    await Hive.openBox(cacheBoxName);
  }

  // --- Auth Token Management ---
  static Future<void> saveAuthToken(String token) async {
    final box = Hive.box(authBoxName);
    await box.put('token', token);
  }

  static String? getAuthToken() {
    final box = Hive.box(authBoxName);
    return box.get('token') as String?;
  }

  static Future<void> clearAuthToken() async {
    final box = Hive.box(authBoxName);
    await box.delete('token');
  }

  // --- Theme Mode Preference ---
  static Future<void> saveDarkMode(bool isDark) async {
    final box = Hive.box(settingsBoxName);
    await box.put('is_dark_mode', isDark);
  }

  static bool getDarkMode() {
    final box = Hive.box(settingsBoxName);
    return box.get('is_dark_mode', defaultValue: true) as bool;
  }

  // --- Cache JSON payload for offline support ---
  static Future<void> cacheData(String key, dynamic value) async {
    final box = Hive.box(cacheBoxName);
    await box.put(key, value);
  }

  static dynamic getCachedData(String key) {
    final box = Hive.box(cacheBoxName);
    return box.get(key);
  }
}
