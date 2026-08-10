/// Defines standard responsive layout breakpoints across device types.
class AppBreakpoints {
  /// Maximum screen width for Mobile phones
  static const double mobileMax = 600;

  /// Maximum screen width for Tablet devices
  static const double tabletMax = 1100;

  /// Determines if current screen width is considered Mobile layout
  static bool isMobile(double width) => width < mobileMax;

  /// Determines if current screen width is considered Tablet layout
  static bool isTablet(double width) => width >= mobileMax && width < tabletMax;

  /// Determines if current screen width is considered Desktop / Web layout
  static bool isDesktop(double width) => width >= tabletMax;
}
