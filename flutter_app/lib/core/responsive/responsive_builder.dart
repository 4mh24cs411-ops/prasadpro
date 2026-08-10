import 'package:flutter/material.dart';
import 'breakpoints.dart';

/// Utility widget to dynamically render mobile, tablet, or desktop layouts.
class ResponsiveBuilder extends StatelessWidget {
  final WidgetBuilder mobile;
  final WidgetBuilder? tablet;
  final WidgetBuilder? desktop;

  const ResponsiveBuilder({
    super.key,
    required this.mobile,
    this.tablet,
    this.desktop,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;

        if (AppBreakpoints.isDesktop(width) && desktop != null) {
          return desktop!(context);
        }

        if (AppBreakpoints.isTablet(width) && (tablet != null || desktop != null)) {
          return (tablet ?? desktop)!(context);
        }

        return mobile(context);
      },
    );
  }
}
