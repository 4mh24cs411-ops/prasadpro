import 'package:flutter_riverpod/flutter_riverpod.dart';

class DashboardStats {
  final int totalItems;
  final int activeUsers;
  final double revenue;
  final int pendingTasks;

  const DashboardStats({
    required this.totalItems,
    required this.activeUsers,
    required this.revenue,
    required this.pendingTasks,
  });
}

final dashboardStatsProvider = FutureProvider<DashboardStats>((ref) async {
  // Simulate API fetch delay
  await Future.delayed(const Duration(milliseconds: 600));

  return const DashboardStats(
    totalItems: 142,
    activeUsers: 1250,
    revenue: 48920.50,
    pendingTasks: 8,
  );
});
