class Product {
  String id;
  String productName;
  int pPrice;

  Product({required this.id, required this.productName, required this.pPrice});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['_id'],
      productName: json['ProductName'],
      pPrice: json['pPrice'],
    );
  }
}
