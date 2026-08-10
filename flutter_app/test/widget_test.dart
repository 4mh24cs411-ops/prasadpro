import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_crossplatform_app/core/responsive/responsive_builder.dart';

void main() {
  group('ResponsiveBuilder Widget Tests', () {
    testWidgets('Renders mobile widget on mobile width constraints', (tester) async {
      tester.view.physicalSize = const Size(400, 800);
      tester.view.devicePixelRatio = 1.0;

      await tester.pumpWidget(
        MaterialApp(
          home: ResponsiveBuilder(
            mobile: (context) => const Text('Mobile Layout Active'),
            desktop: (context) => const Text('Desktop Layout Active'),
          ),
        ),
      );

      expect(find.text('Mobile Layout Active'), findsOneWidget);
      expect(find.text('Desktop Layout Active'), findsNothing);

      addTearDown(tester.view.resetPhysicalSize);
    });

    testWidgets('Renders desktop widget on wide desktop constraints', (tester) async {
      tester.view.physicalSize = const Size(1200, 800);
      tester.view.devicePixelRatio = 1.0;

      await tester.pumpWidget(
        MaterialApp(
          home: ResponsiveBuilder(
            mobile: (context) => const Text('Mobile Layout Active'),
            desktop: (context) => const Text('Desktop Layout Active'),
          ),
        ),
      );

      expect(find.text('Desktop Layout Active'), findsOneWidget);
      expect(find.text('Mobile Layout Active'), findsNothing);

      addTearDown(tester.view.resetPhysicalSize);
    });
  });
}
