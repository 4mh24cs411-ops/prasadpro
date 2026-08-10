import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/storage/hive_storage_service.dart';

class SettingsState {
  final ThemeMode themeMode;
  final bool offlineCacheEnabled;

  const SettingsState({
    required this.themeMode,
    this.offlineCacheEnabled = true,
  });

  SettingsState copyWith({
    ThemeMode? themeMode,
    bool? offlineCacheEnabled,
  }) {
    return SettingsState(
      themeMode: themeMode ?? this.themeMode,
      offlineCacheEnabled: offlineCacheEnabled ?? this.offlineCacheEnabled,
    );
  }
}

class SettingsController extends StateNotifier<SettingsState> {
  SettingsController()
      : super(
          SettingsState(
            themeMode: HiveStorageService.getDarkMode() ? ThemeMode.dark : ThemeMode.light,
          ),
        );

  Future<void> toggleDarkMode(bool isDark) async {
    await HiveStorageService.saveDarkMode(isDark);
    state = state.copyWith(themeMode: isDark ? ThemeMode.dark : ThemeMode.light);
  }

  Future<void> toggleOfflineCache(bool enabled) async {
    state = state.copyWith(offlineCacheEnabled: enabled);
  }
}

final settingsControllerProvider =
    StateNotifierProvider<SettingsController, SettingsState>((ref) {
  return SettingsController();
});
