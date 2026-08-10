import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'items_controller.dart';
import '../domain/item_entity.dart';

class ItemsListScreen extends ConsumerWidget {
  const ItemsListScreen({super.key});

  void _showCreateDialog(BuildContext context, WidgetRef ref) {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    String category = 'Nutrition';

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add New Item'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: const InputDecoration(labelText: 'Title'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: descController,
              decoration: const InputDecoration(labelText: 'Description'),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              value: category,
              decoration: const InputDecoration(labelText: 'Category'),
              items: const [
                DropdownMenuItem(value: 'Nutrition', child: Text('Nutrition')),
                DropdownMenuItem(value: 'Health', child: Text('Health')),
                DropdownMenuItem(value: 'Pantry', child: Text('Pantry')),
              ],
              onChanged: (val) {
                if (val != null) category = val;
              },
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              if (titleController.text.trim().isNotEmpty) {
                ref.read(itemsControllerProvider.notifier).createItem(
                      titleController.text.trim(),
                      descController.text.trim(),
                      category,
                    );
                Navigator.pop(context);
              }
            },
            child: const Text('Create'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stateAsync = ref.watch(itemsControllerProvider);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Items CRUD Hub', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateDialog(context, ref),
        icon: const Icon(Icons.add),
        label: const Text('New Item'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            // Search Input Bar
            TextField(
              decoration: const InputDecoration(
                hintText: 'Search items by title or description...',
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (val) {
                ref.read(itemsControllerProvider.notifier).setSearchQuery(val);
              },
            ),
            const SizedBox(height: 16),

            // Category Filter Chips
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: ['All', 'Nutrition', 'Health', 'Pantry'].map((cat) {
                  final selectedCat = stateAsync.value?.selectedCategory ?? 'All';
                  final isSelected = selectedCat == cat;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      label: Text(cat),
                      selected: isSelected,
                      onSelected: (_) {
                        ref.read(itemsControllerProvider.notifier).setCategoryFilter(cat);
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 16),

            // Items List
            Expanded(
              child: stateAsync.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (err, stack) => Center(child: Text('Error: $err')),
                data: (state) {
                  if (state.items.isEmpty) {
                    return Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.inbox_outlined, size: 64, color: theme.colorScheme.onSurface.withOpacity(0.4)),
                          const SizedBox(height: 16),
                          Text(
                            'No items match your criteria',
                            style: theme.textTheme.titleMedium?.copyWith(
                              color: theme.colorScheme.onSurface.withOpacity(0.6),
                            ),
                          ),
                        ],
                      ),
                    );
                  }

                  return ListView.builder(
                    itemCount: state.items.length,
                    itemBuilder: (context, index) {
                      final item = state.items[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: ListTile(
                          leading: Checkbox(
                            value: item.isCompleted,
                            onChanged: (_) {
                              ref.read(itemsControllerProvider.notifier).toggleItemCompletion(item);
                            },
                          ),
                          title: Text(
                            item.title,
                            style: TextStyle(
                              decoration: item.isCompleted ? TextDecoration.lineThrough : null,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          subtitle: Column(
                            crossAxisAlignment: CrossAlignment.start,
                            children: [
                              Text(item.description),
                              const SizedBox(height: 4),
                              Chip(
                                label: Text(
                                  item.category,
                                  style: const TextStyle(fontSize: 10),
                                ),
                                padding: EdgeInsets.zero,
                                visualDensity: VisualDensity.compact,
                              ),
                            ],
                          ),
                          trailing: IconButton(
                            icon: const Icon(Icons.delete_outline, color: Colors.rose),
                            onPressed: () {
                              ref.read(itemsControllerProvider.notifier).deleteItem(item.id);
                            },
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
