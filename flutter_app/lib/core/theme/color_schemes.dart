import 'package:flutter/material.dart';

/// Material 3 Light & Dark Color Schemes
class AppColorSchemes {
  static const Color primaryEmerald = Color(0xFF10B981);
  static const Color secondaryTeal = Color(0xFF14B8A6);
  static const Color darkBackground = Color(0xFF0F172A);
  static const Color darkSurface = Color(0xFF1E293B);

  static const ColorScheme lightColorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: primaryEmerald,
    onPrimary: Colors.white,
    secondary: secondaryTeal,
    onSecondary: Colors.white,
    error: Color(0xFFEF4444),
    onError: Colors.white,
    background: Color(0xFFF8FAFC),
    onBackground: Color(0xFF0F172A),
    surface: Colors.white,
    onSurface: Color(0xFF0F172A),
  );

  static const ColorScheme darkColorScheme = ColorScheme(
    brightness: Brightness.dark,
    primary: primaryEmerald,
    onPrimary: Color(0xFF0F172A),
    secondary: secondaryTeal,
    onSecondary: Color(0xFF0F172A),
    error: Color(0xFFF87171),
    onError: Color(0xFF0F172A),
    background: darkBackground,
    onBackground: Color(0xFFF8FAFC),
    surface: darkSurface,
    onSurface: Color(0xFFF8FAFC),
  );
}
