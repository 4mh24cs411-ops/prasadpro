import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'route_names.dart';
import '../widgets/responsive_navigation_shell.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/auth/presentation/register_screen.dart';
import '../../features/dashboard/presentation/responsive_dashboard_screen.dart';
import '../../features/items/presentation/items_list_screen.dart';
import '../../features/profile/presentation/profile_screen.dart';
import '../../features/settings/presentation/settings_screen.dart';
import '../../features/auth/presentation/auth_controller.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();

/// Provider for application router powered by GoRouter
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);

  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: AppRoutes.dashboard,
    redirect: (context, state) {
      final isLoggedIn = authState.value != null;
      final isAuthRoute = state.matchedLocation == AppRoutes.login ||
          state.matchedLocation == AppRoutes.register;

      if (!isLoggedIn && !isAuthRoute) {
        return AppRoutes.login;
      }

      if (isLoggedIn && isAuthRoute) {
        return AppRoutes.dashboard;
      }

      return null;
    },
    routes: [
      // Auth Routes
      GoRoute(
        path: AppRoutes.login,
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: AppRoutes.register,
        builder: (context, state) => const RegisterScreen(),
      ),

      // Adaptive Navigation Shell Routes
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return ResponsiveNavigationShell(navigationShell: navigationShell);
        },
        branches: [
          // Dashboard Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.dashboard,
                builder: (context, state) => const ResponsiveDashboardScreen(),
              ),
            ],
          ),
          // Items CRUD Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.items,
                builder: (context, state) => const ItemsListScreen(),
              ),
            ],
          ),
          // Profile Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.profile,
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
          // Settings Branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.settings,
                builder: (context, state) => const SettingsScreen(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
});
