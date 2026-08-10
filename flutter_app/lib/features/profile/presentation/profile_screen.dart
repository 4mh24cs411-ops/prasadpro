import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../auth/presentation/auth_controller.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(authControllerProvider);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('User Profile', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: userAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error loading profile: $err')),
        data: (user) {
          if (user == null) {
            return const Center(child: Text('No active user session found.'));
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 600),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 54,
                      backgroundImage: NetworkImage(user.avatarUrl ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      user.name,
                      style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      user.email,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.6),
                      ),
                    ),
                    const SizedBox(height: 32),

                    // User Info Cards
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            ListTile(
                              leading: const Icon(Icons.fitness_center),
                              title: const Text('Fitness Goal'),
                              subtitle: const Text('Muscle Gain & Macro Balancing'),
                            ),
                            const Divider(),
                            ListTile(
                              leading: const Icon(Icons.workspace_premium),
                              title: const Text('Subscription Plan'),
                              subtitle: const Text('FitGen AI Pro (Active)'),
                            ),
                            const Divider(),
                            ListTile(
                              leading: const Icon(Icons.devices),
                              title: const Text('Cross-Platform Sync'),
                              subtitle: const Text('Mobile, Web & Desktop Active'),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),

                    ElevatedButton.icon(
                      onPressed: () {
                        ref.read(authControllerProvider.notifier).logout();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.rose,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(50),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      icon: const Icon(Icons.logout),
                      label: const Text('Sign Out', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
