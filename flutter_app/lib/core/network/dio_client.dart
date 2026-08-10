import 'package:dio/dio.dart';
import '../storage/hive_storage_service.dart';
import 'network_exceptions.dart';

/// Configured Dio HTTP Client for network requests
class DioClient {
  final Dio _dio;

  DioClient({String baseUrl = 'https://api.example.com'})
      : _dio = Dio(
          BaseOptions(
            baseUrl: baseUrl,
            connectTimeout: const Duration(seconds: 15),
            receiveTimeout: const Duration(seconds: 15),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          ),
        ) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Inject bearer auth token if available
          final token = HiveStorageService.getAuthToken();
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (DioException error, handler) {
          final exception = NetworkException.fromDioError(error);
          return handler.reject(
            DioException(
              requestOptions: error.requestOptions,
              error: exception,
              message: exception.message,
            ),
          );
        },
      ),
    );
  }

  Dio get instance => _dio;

  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.get(path, queryParameters: queryParameters);
    } on DioException catch (e) {
      throw e.error ?? NetworkException('GET request failed');
    }
  }

  Future<Response> post(String path, {dynamic data}) async {
    try {
      return await _dio.post(path, data: data);
    } on DioException catch (e) {
      throw e.error ?? NetworkException('POST request failed');
    }
  }

  Future<Response> put(String path, {dynamic data}) async {
    try {
      return await _dio.put(path, data: data);
    } on DioException catch (e) {
      throw e.error ?? NetworkException('PUT request failed');
    }
  }

  Future<Response> delete(String path) async {
    try {
      return await _dio.delete(path);
    } on DioException catch (e) {
      throw e.error ?? NetworkException('DELETE request failed');
    }
  }
}
