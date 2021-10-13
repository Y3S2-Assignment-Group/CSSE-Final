class Order {
  String Id;
  String site;
  String supplier;

  Order({required this.Id, required this.site, required this.supplier});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      Id: json['_id'],
      site: json['site'],
      supplier: json['supplier'],
    );
  }
}
