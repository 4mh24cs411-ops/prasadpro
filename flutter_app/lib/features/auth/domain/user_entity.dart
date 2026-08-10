/// User Domain Entity
class UserEntity {
  final String id;
  final String email;
  final String name;
  final String? avatarUrl;

  const UserEntity({
    required this.id,
    required this.email,
    required this.name,
    this.avatarUrl,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'avatarUrl': avatarUrl,
    };
  }

  factory UserEntity.fromJson(Map<String, dynamic> json) {
    return UserEntity(
      id: json['id'] as String,
      email: json['email'] as String,
      name: json['name'] as String,
      avatarUrl: json['avatarUrl'] as String?,
    );
  }
}
