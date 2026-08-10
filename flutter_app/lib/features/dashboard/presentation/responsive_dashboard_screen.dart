import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/responsive/responsive_builder.dart';
import 'dashboard_controller.dart';

class ResponsiveDashboardScreen extends ConsumerWidget {
  const ResponsiveDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final statsAsync = ref.watch(dashboardStatsProvider);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.refresh(dashboardStatsProvider),
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: statsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error loading dashboard: $err')),
        data: (stats) => ResponsiveBuilder(
          mobile: (context) => _buildDashboardLayout(context, theme, stats, crossAxisCount: 1),
          tablet: (context) => _buildDashboardLayout(context, theme, stats, crossAxisCount: 2),
          desktop: (context) => _buildDashboardLayout(context, theme, stats, crossAxisCount: 4),
        ),
      ),
    );
  }

  Widget _buildDashboardLayout(
    BuildContext context,
    ThemeData theme,
    DashboardStats stats, {
    required int crossAxisCount,
  }) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text(
            'Overview Analytics',
            style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          GridView.count(
            crossAxisCount: crossAxisCount,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            childAspectRatio: 1.6,
            children: [
              _StatCard(
                title: 'Total Items',
                value: '${stats.totalItems}',
                icon: Icons.inventory_2_outlined,
                color: Colors.emerald,
              ),
              _StatCard(
                title: 'Active Users',
                value: '${stats.activeUsers}',
                icon: Icons.people_outline,
                color: Colors.blue,
              ),
              _StatCard(
                title: 'Total Revenue',
                value: '\$${stats.revenue.toStringAsFixed(2)}',
                icon: Icons.attach_money,
                color: Colors.amber,
              ),
              _StatCard(
                title: 'Pending Tasks',
                value: '${stats.pendingTasks}',
                icon: Icons.task_alt_outlined,
                color: Colors.rose,
              ),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Recent System Activity',
            style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Card(
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 4,
              separatorBuilder: (context, index) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final activities = [
                  {'title': 'New item created', 'time': '10 mins ago', 'icon': Icons.add_circle_outline},
                  {'title': 'User Alex logged in', 'time': '25 mins ago', 'icon': Icons.login},
                  {'title': 'Database sync completed', 'time': '1 hour ago', 'icon': Icons.sync},
                  {'title': 'Settings updated', 'time': '3 hours ago', 'icon': Icons.tune},
                ];
                final item = activities[index];
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                    child: Icon(item['icon'] as IconData, color: theme.colorScheme.primary),
                  ),
                  title: Text(item['title'] as String, style: const TextStyle(fontWeight: FontWeight.w600)),
                  subtitle: Text(item['time'] as String),
                  trailing: const Icon(Icons.chevron_right, size: 20),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const _StatCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Text(
                  title,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurface.withOpacity(0.6),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                CircleAvatar(
                  radius: 18,
                  backgroundColor: color.withOpacity(0.15),
                  child: Icon(icon, color: color, size: 20),
                ),
              ],
            ),
            Text(
              value,
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
