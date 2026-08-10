import 'package:dio/dio.dart';

/// Network failure representation
class NetworkException implements Exception {
  final String message;
  final int? statusCode;

  NetworkException(this.message, {this.statusCode});

  factory NetworkException.fromDioError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return NetworkException('Connection timeout. Please check your internet connection.');
      case DioExceptionType.badResponse:
        final code = error.response?.statusCode;
        if (code == 401) {
          return NetworkException('Unauthorized access. Please log in again.', statusCode: code);
        } else if (code == 404) {
          return NetworkException('Requested resource was not found.', statusCode: code);
        } else if (code != null && code >= 500) {
          return NetworkException('Server error ($code). Please try again later.', statusCode: code);
        }
        return NetworkException('Server returned error code: $code', statusCode: code);
      case DioExceptionType.cancel:
        return NetworkException('Request was cancelled.');
      case DioExceptionType.connectionError:
        return NetworkException('No internet connection. Operating in offline mode.');
      default:
        return NetworkException('An unexpected error occurred.');
    }
  }

  @override
  String toString() => message;
}
