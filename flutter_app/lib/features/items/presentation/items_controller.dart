import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/item_entity.dart';
import '../domain/item_repository.dart';
import '../data/item_repository_impl.dart';

final itemRepositoryProvider = Provider<ItemRepository>((ref) {
  return ItemRepositoryImpl();
});

class ItemsState {
  final List<ItemEntity> items;
  final String searchQuery;
  final String selectedCategory;
  final bool isLoading;

  const ItemsState({
    this.items = const [],
    this.searchQuery = '',
    this.selectedCategory = 'All',
    this.isLoading = false,
  });

  ItemsState copyWith({
    List<ItemEntity>? items,
    String? searchQuery,
    String? selectedCategory,
    bool? isLoading,
  }) {
    return ItemsState(
      items: items ?? this.items,
      searchQuery: searchQuery ?? this.searchQuery,
      selectedCategory: selectedCategory ?? this.selectedCategory,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class ItemsController extends StateNotifier<AsyncValue<ItemsState>> {
  final ItemRepository _repository;

  ItemsController(this._repository) : super(const AsyncValue.loading()) {
    loadItems();
  }

  Future<void> loadItems() async {
    try {
      final current = state.value ?? const ItemsState();
      final items = await _repository.getItems(
        searchQuery: current.searchQuery,
        categoryFilter: current.selectedCategory,
      );
      state = AsyncValue.data(current.copyWith(items: items, isLoading: false));
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  void setSearchQuery(String query) {
    final current = state.value ?? const ItemsState();
    state = AsyncValue.data(current.copyWith(searchQuery: query));
    loadItems();
  }

  void setCategoryFilter(String category) {
    final current = state.value ?? const ItemsState();
    state = AsyncValue.data(current.copyWith(selectedCategory: category));
    loadItems();
  }

  Future<void> createItem(String title, String description, String category) async {
    await _repository.createItem(title, description, category);
    await loadItems();
  }

  Future<void> toggleItemCompletion(ItemEntity item) async {
    final updated = item.copyWith(isCompleted: !item.isCompleted);
    await _repository.updateItem(updated);
    await loadItems();
  }

  Future<void> deleteItem(String id) async {
    await _repository.deleteItem(id);
    await loadItems();
  }
}

final itemsControllerProvider =
    StateNotifierProvider<ItemsController, AsyncValue<ItemsState>>((ref) {
  return ItemsController(ref.watch(itemRepositoryProvider));
});
