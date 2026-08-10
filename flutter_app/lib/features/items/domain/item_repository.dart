import 'item_entity.dart';

/// Abstract Repository Contract for Items CRUD operations
abstract class ItemRepository {
  Future<List<ItemEntity>> getItems({
    String? searchQuery,
    String? categoryFilter,
    int page = 1,
    int pageSize = 20,
  });

  Future<ItemEntity> createItem(String title, String description, String category);
  Future<ItemEntity> updateItem(ItemEntity item);
  Future<void> deleteItem(String id);
}
