import 'dart:convert';

List<OrderProducts> orderProductsFromJson(String str) =>
    List<OrderProducts>.from(
        json.decode(str).map((x) => OrderProducts.fromJson(x)));

String orderProductsToJson(List<OrderProducts> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class OrderProducts {
  OrderProducts({
    required this.id,
    required this.qty,
    required this.opPrice,
    required this.product,
  });

  String id;
  int qty;
  int opPrice;
  NewProduct product;

  factory OrderProducts.fromJson(Map<String, dynamic> json) => OrderProducts(
        id: json["_id"],
        qty: json["qty"],
        opPrice: json["opPrice"],
        product: NewProduct.fromJson(json["product"]),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "qty": qty,
        "opPrice": opPrice,
        "product": product.toJson(),
      };
}

class NewProduct {
  NewProduct({
    required this.id,
    required this.productName,
    required this.pPrice,
    required this.isRestricted,
    required this.deleteStatus,
  });

  String id;
  String productName;
  int pPrice;
  bool isRestricted;
  bool deleteStatus;

  factory NewProduct.fromJson(Map<String, dynamic> json) => NewProduct(
        id: json["_id"],
        productName: json["ProductName"],
        pPrice: json["pPrice"],
        isRestricted: json["isRestricted"],
        deleteStatus: json["deleteStatus"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "ProductName": productName,
        "pPrice": pPrice,
        "isRestricted": isRestricted,
        "deleteStatus": deleteStatus,
      };
}
