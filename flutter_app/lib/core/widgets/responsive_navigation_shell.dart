import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../responsive/breakpoints.dart';
import '../router/route_names.dart';

/// Responsive shell frame rendering navigation layout based on device screen width
class ResponsiveNavigationShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const ResponsiveNavigationShell({
    super.key,
    required this.navigationShell,
  });

  void _onDestinationSelected(int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;

        // Desktop / Web Layout: Full Drawer
        if (AppBreakpoints.isDesktop(width)) {
          return Scaffold(
            body: Row(
              children: [
                NavigationDrawer(
                  selectedIndex: navigationShell.currentIndex,
                  onDestinationSelected: _onDestinationSelected,
                  children: [
                    const Padding(
                      padding: EdgeInsets.all(24.0),
                      child: Text(
                        'CrossPlatform App',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const NavigationDrawerDestination(
                      icon: Icon(Icons.dashboard_outlined),
                      selectedIcon: Icon(Icons.dashboard),
                      label: Text('Dashboard'),
                    ),
                    const NavigationDrawerDestination(
                      icon: Icon(Icons.list_alt_outlined),
                      selectedIcon: Icon(Icons.list_alt),
                      label: Text('Items CRUD'),
                    ),
                    const NavigationDrawerDestination(
                      icon: Icon(Icons.person_outline),
                      selectedIcon: Icon(Icons.person),
                      label: Text('Profile'),
                    ),
                    const NavigationDrawerDestination(
                      icon: Icon(Icons.settings_outlined),
                      selectedIcon: Icon(Icons.settings),
                      label: Text('Settings'),
                    ),
                  ],
                ),
                const VerticalDivider(thickness: 1, width: 1),
                Expanded(child: navigationShell),
              ],
            ),
          );
        }

        // Tablet Layout: Navigation Rail
        if (AppBreakpoints.isTablet(width)) {
          return Scaffold(
            body: Row(
              children: [
                NavigationRail(
                  selectedIndex: navigationShell.currentIndex,
                  onDestinationSelected: _onDestinationSelected,
                  labelType: NavigationRailLabelType.all,
                  leading: const Padding(
                    padding: EdgeInsets.symmetric(vertical: 16),
                    child: FlutterLogo(size: 32),
                  ),
                  destinations: const [
                    NavigationRailDestination(
                      icon: Icon(Icons.dashboard_outlined),
                      selectedIcon: Icon(Icons.dashboard),
                      label: Text('Dashboard'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.list_alt_outlined),
                      selectedIcon: Icon(Icons.list_alt),
                      label: Text('Items'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.person_outline),
                      selectedIcon: Icon(Icons.person),
                      label: Text('Profile'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.settings_outlined),
                      selectedIcon: Icon(Icons.settings),
                      label: Text('Settings'),
                    ),
                  ],
                ),
                const VerticalDivider(thickness: 1, width: 1),
                Expanded(child: navigationShell),
              ],
            ),
          );
        }

        // Mobile Layout: Bottom Navigation Bar
        return Scaffold(
          body: navigationShell,
          bottomNavigationBar: NavigationBar(
            selectedIndex: navigationShell.currentIndex,
            onDestinationSelected: _onDestinationSelected,
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.dashboard_outlined),
                selectedIcon: Icon(Icons.dashboard),
                label: 'Dashboard',
              ),
              NavigationDestination(
                icon: Icon(Icons.list_alt_outlined),
                selectedIcon: Icon(Icons.list_alt),
                label: 'Items',
              ),
              NavigationDestination(
                icon: Icon(Icons.person_outline),
                selectedIcon: Icon(Icons.person),
                label: 'Profile',
              ),
              NavigationDestination(
                icon: Icon(Icons.settings_outlined),
                selectedIcon: Icon(Icons.settings),
                label: 'Settings',
              ),
            ],
          ),
        );
      },
    );
  }
}
