class Supplier {
  String id;
  String name;

  Supplier({
    required this.id,
    required this.name,
  });

  factory Supplier.fromJson(Map<String, dynamic> json) {
    return Supplier(
      id: json['_id'],
      name: json['name'],
    );
  }
}
