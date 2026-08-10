/// Item Entity for CRUD operations
class ItemEntity {
  final String id;
  final String title;
  final String description;
  final String category;
  final bool isCompleted;
  final DateTime createdAt;

  const ItemEntity({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    this.isCompleted = false,
    required this.createdAt,
  });

  ItemEntity copyWith({
    String? id,
    String? title,
    String? description,
    String? category,
    bool? isCompleted,
    DateTime? createdAt,
  }) {
    return ItemEntity(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      category: category ?? this.category,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'isCompleted': isCompleted,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory ItemEntity.fromJson(Map<String, dynamic> json) {
    return ItemEntity(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      category: json['category'] as String,
      isCompleted: json['isCompleted'] as bool? ?? false,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }
}
