import 'dart:convert';

List<SiteOrdersDelivery> siteOrdersDeliveryFromJson(String str) =>
    List<SiteOrdersDelivery>.from(
        json.decode(str).map((x) => SiteOrdersDelivery.fromJson(x)));

String siteOrdersDeliveryToJson(List<SiteOrdersDelivery> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class SiteOrdersDelivery {
  SiteOrdersDelivery({
    required this.id,
    required this.productList,
    required this.isAccepted,
  });

  String id;
  List<SiteOrdersDeliveryProductList> productList;
  bool isAccepted;

  factory SiteOrdersDelivery.fromJson(Map<String, dynamic> json) =>
      SiteOrdersDelivery(
        id: json["_id"],
        productList: List<SiteOrdersDeliveryProductList>.from(
            json["productList"]
                .map((x) => SiteOrdersDeliveryProductList.fromJson(x))),
        isAccepted: json["isAccepted"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "productList": List<dynamic>.from(productList.map((x) => x.toJson())),
        "isAccepted": isAccepted,
      };
}

class SiteOrdersDeliveryProductList {
  SiteOrdersDeliveryProductList({
    required this.id,
    required this.qty,
    required this.opPrice,
    required this.product,
  });

  String id;
  int qty;
  int opPrice;
  SiteOrdersDeliveryProduct product;

  factory SiteOrdersDeliveryProductList.fromJson(Map<String, dynamic> json) =>
      SiteOrdersDeliveryProductList(
        id: json["_id"],
        qty: json["qty"],
        opPrice: json["opPrice"],
        product: SiteOrdersDeliveryProduct.fromJson(json["product"]),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "qty": qty,
        "opPrice": opPrice,
        "product": product.toJson(),
      };
}

class SiteOrdersDeliveryProduct {
  SiteOrdersDeliveryProduct({
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

  factory SiteOrdersDeliveryProduct.fromJson(Map<String, dynamic> json) =>
      SiteOrdersDeliveryProduct(
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
