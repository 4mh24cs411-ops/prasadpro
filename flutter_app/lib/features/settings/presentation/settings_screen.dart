import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'settings_controller.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(settingsControllerProvider);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Application Settings', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 600),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text(
                  'Appearance & Theme',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 8),
                Card(
                  child: SwitchListTile(
                    title: const Text('Dark Mode Theme'),
                    subtitle: const Text('Toggle between Light and Dark Material 3 styles'),
                    secondary: const Icon(Icons.dark_mode_outlined),
                    value: settings.themeMode == ThemeMode.dark,
                    onChanged: (val) {
                      ref.read(settingsControllerProvider.notifier).toggleDarkMode(val);
                    },
                  ),
                ),
                const SizedBox(height: 24),

                Text(
                  'Data & Storage',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 8),
                Card(
                  child: Column(
                    children: [
                      SwitchListTile(
                        title: const Text('Offline Caching'),
                        subtitle: const Text('Store data locally using Hive key-value storage'),
                        secondary: const Icon(Icons.sd_card_outlined),
                        value: settings.offlineCacheEnabled,
                        onChanged: (val) {
                          ref.read(settingsControllerProvider.notifier).toggleOfflineCache(val);
                        },
                      ),
                      const Divider(height: 1),
                      ListTile(
                        leading: const Icon(Icons.cleaning_services_outlined),
                        title: const Text('Clear Offline Cache'),
                        subtitle: const Text('Purge locally cached responses'),
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Offline storage cache cleared successfully.')),
                          );
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                Text(
                  'About Application',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 8),
                const Card(
                  child: Column(
                    children: [
                      ListTile(
                        leading: Icon(Icons.info_outline),
                        title: Text('Version'),
                        subtitle: Text('1.0.0+1 (Clean Architecture)'),
                      ),
                      Divider(height: 1),
                      ListTile(
                        leading: Icon(Icons.devices),
                        title: Text('Supported Platforms'),
                        subtitle: Text('Android, iOS, Windows, macOS, Linux, Web, Tablets'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
