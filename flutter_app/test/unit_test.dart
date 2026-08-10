import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_crossplatform_app/features/items/domain/item_entity.dart';

void main() {
  group('ItemEntity Unit Tests', () {
    test('ItemEntity converts to and from JSON correctly', () {
      final now = DateTime.now();
      final item = ItemEntity(
        id: 'test-123',
        title: 'Test Workout Meal',
        description: 'High protein nutrition plan',
        category: 'Nutrition',
        isCompleted: true,
        createdAt: now,
      );

      final json = item.toJson();
      expect(json['id'], 'test-123');
      expect(json['title'], 'Test Workout Meal');
      expect(json['category'], 'Nutrition');
      expect(json['isCompleted'], true);

      final restored = ItemEntity.fromJson(json);
      expect(restored.id, item.id);
      expect(restored.title, item.title);
      expect(restored.category, item.category);
      expect(restored.isCompleted, item.isCompleted);
    });

    test('ItemEntity copyWith updates completion status correctly', () {
      final item = ItemEntity(
        id: 'test-1',
        title: 'Water Intake Goal',
        description: 'Drink 2500 ml',
        category: 'Health',
        isCompleted: false,
        createdAt: DateTime.now(),
      );

      final updated = item.copyWith(isCompleted: true);
      expect(updated.isCompleted, true);
      expect(updated.id, item.id);
      expect(updated.title, item.title);
    });
  });
}
