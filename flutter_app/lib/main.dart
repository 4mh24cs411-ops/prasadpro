import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';
import 'core/storage/hive_storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Hive storage for offline caching & settings
  await HiveStorageService.init();

  runApp(
    const ProviderScope(
      child: CrossPlatformApp(),
    ),
  );
}
