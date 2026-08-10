import 'package:uuid/uuid.dart';
import '../domain/item_entity.dart';
import '../domain/item_repository.dart';
import '../../../core/storage/hive_storage_service.dart';

/// Data Repository Implementation with Hive offline persistence
class ItemRepositoryImpl implements ItemRepository {
  static const String cacheKey = 'cached_items_list';

  final List<ItemEntity> _memoryCache = [];

  ItemRepositoryImpl() {
    _loadFromCache();
  }

  void _loadFromCache() {
    final cached = HiveStorageService.getCachedData(cacheKey);
    if (cached != null && cached is List) {
      _memoryCache.clear();
      for (final json in cached) {
        if (json is Map) {
          _memoryCache.add(ItemEntity.fromJson(Map<String, dynamic>.from(json)));
        }
      }
    }

    // Seed default items if empty
    if (_memoryCache.isEmpty) {
      _seedDefaultItems();
    }
  }

  void _seedDefaultItems() {
    _memoryCache.addAll([
      ItemEntity(
        id: '1',
        title: 'High-Protein Meal Prep',
        description: 'Prepare chicken breast, quinoa, and steamed spinach for weekly macro goals.',
        category: 'Nutrition',
        isCompleted: true,
        createdAt: DateTime.now().subtract(const Duration(days: 2)),
      ),
      ItemEntity(
        id: '2',
        title: 'Hydration Target Tracking',
        description: 'Reach 3,000 ml fluid intake daily for cognitive and physical performance.',
        category: 'Health',
        isCompleted: false,
        createdAt: DateTime.now().subtract(const Duration(days: 1)),
      ),
      ItemEntity(
        id: '3',
        title: 'Weekly Grocery Inventory Sync',
        description: 'Scan fridge items and auto-generate shopping list for missing ingredients.',
        category: 'Pantry',
        isCompleted: false,
        createdAt: DateTime.now(),
      ),
    ]);
    _saveToCache();
  }

  Future<void> _saveToCache() async {
    final jsonList = _memoryCache.map((e) => e.toJson()).toList();
    await HiveStorageService.cacheData(cacheKey, jsonList);
  }

  @override
  Future<List<ItemEntity>> getItems({
    String? searchQuery,
    String? categoryFilter,
    int page = 1,
    int pageSize = 20,
  }) async {
    await Future.delayed(const Duration(milliseconds: 300));

    Iterable<ItemEntity> results = List.from(_memoryCache);

    if (searchQuery != null && searchQuery.isNotEmpty) {
      final q = searchQuery.toLowerCase();
      results = results.where((item) =>
          item.title.toLowerCase().contains(q) ||
          item.description.toLowerCase().contains(q));
    }

    if (categoryFilter != null && categoryFilter != 'All') {
      results = results.where((item) => item.category == categoryFilter);
    }

    final startIndex = (page - 1) * pageSize;
    return results.skip(startIndex).take(pageSize).toList();
  }

  @override
  Future<ItemEntity> createItem(String title, String description, String category) async {
    final newItem = ItemEntity(
      id: const Uuid().v4(),
      title: title,
      description: description,
      category: category,
      createdAt: DateTime.now(),
    );

    _memoryCache.insert(0, newItem);
    await _saveToCache();
    return newItem;
  }

  @override
  Future<ItemEntity> updateItem(ItemEntity item) async {
    final index = _memoryCache.indexWhere((e) => e.id == item.id);
    if (index != -1) {
      _memoryCache[index] = item;
      await _saveToCache();
    }
    return item;
  }

  @override
  Future<void> deleteItem(String id) async {
    _memoryCache.removeWhere((e) => e.id == id);
    await _saveToCache();
  }
}
