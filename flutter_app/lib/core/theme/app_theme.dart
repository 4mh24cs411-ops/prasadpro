import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'color_schemes.dart';

/// Configures Material 3 ThemeData for Light and Dark themes
class AppTheme {
  static ThemeData get lightTheme {
    final base = ThemeData(
      useMaterial3: true,
      colorScheme: AppColorSchemes.lightColorScheme,
    );
    return base.copyWith(
      textTheme: GoogleFonts.plusJakartaSansTextTheme(base.textTheme),
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.grey.shade100,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColorSchemes.primaryEmerald, width: 2),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    final base = ThemeData(
      useMaterial3: true,
      colorScheme: AppColorSchemes.darkColorScheme,
      scaffoldBackgroundColor: AppColorSchemes.darkBackground,
    );
    return base.copyWith(
      textTheme: GoogleFonts.plusJakartaSansTextTheme(base.textTheme),
      cardTheme: CardTheme(
        color: AppColorSchemes.darkSurface,
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF1E293B),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF334155)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColorSchemes.primaryEmerald, width: 2),
        ),
      ),
    );
  }
}
