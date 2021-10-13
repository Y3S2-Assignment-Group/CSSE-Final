// To parse required this JSON data, do
//
//     final siteOrders = siteOrdersFromJson(jsonString);

import 'dart:convert';

import 'dart:ffi';

List<SiteOrders> siteOrdersFromJson(String str) =>
    List<SiteOrders>.from(json.decode(str).map((x) => SiteOrders.fromJson(x)));

String siteOrdersToJson(List<SiteOrders> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class SiteOrders {
  SiteOrders({
    required this.id,
    required this.productList,
    required this.supplier,
    required this.site,
    required this.placedDate,
    required this.requiredDate,
    required this.status,
    required this.totalPrice,
    required this.approvalStatus,
    required this.isDraft,
  });

  String id;
  List<ProductList> productList;
  SiteOrders_Supplier supplier;
  SiteOrders_Site site;

  String placedDate;
  String requiredDate;
  String status;
  int totalPrice;
  bool approvalStatus;
  bool isDraft;

  factory SiteOrders.fromJson(Map<String, dynamic> json) => SiteOrders(
        id: json["_id"],
        productList: List<ProductList>.from(
            json["productList"].map((x) => ProductList.fromJson(x))),
        supplier: SiteOrders_Supplier.fromJson(json["supplier"]),
        site: SiteOrders_Site.fromJson(json["site"]),
        approvalStatus: json["approvalStatus"],
        isDraft: json["isDraft"],
        placedDate: json["placedDate"],
        requiredDate: json["requiredDate"],
        status: json["status"],
        totalPrice: json["totalPrice"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "productList": List<dynamic>.from(productList.map((x) => x.toJson())),
        "supplier": supplier.toJson(),
        "site": site.toJson(),
        "approvalStatus": approvalStatus,
        "isDraft": isDraft,
        "placedDate": placedDate,
        "requiredDate": requiredDate,
        "status": status,
        "totalPrice": totalPrice
      };
}

class ProductList {
  ProductList({
    required this.id,
    required this.qty,
    required this.opPrice,
    required this.product,
  });

  String id;
  int qty;
  int opPrice;
  SiteOrders_Product product;

  factory ProductList.fromJson(Map<String, dynamic> json) => ProductList(
        id: json["_id"],
        qty: json["qty"],
        opPrice: json["opPrice"],
        product: SiteOrders_Product.fromJson(json["product"]),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "qty": qty,
        "opPrice": opPrice,
        "product": product.toJson(),
      };
}

class SiteOrders_Product {
  SiteOrders_Product({
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

  factory SiteOrders_Product.fromJson(Map<String, dynamic> json) =>
      SiteOrders_Product(
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

class SiteOrders_Site {
  SiteOrders_Site({
    required this.id,
    required this.siteName,
    required this.siteAddress,
    required this.siteContactNumber,
    required this.orderList,
    required this.siteManager,
  });

  String id;
  String siteName;
  String siteAddress;
  String siteContactNumber;
  List<String> orderList;
  String siteManager;

  factory SiteOrders_Site.fromJson(Map<String, dynamic> json) =>
      SiteOrders_Site(
        id: json["_id"],
        siteName: json["siteName"],
        siteAddress: json["siteAddress"],
        siteContactNumber: json["siteContactNumber"],
        orderList: List<String>.from(json["orderList"].map((x) => x)),
        siteManager: json["siteManager"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "siteName": siteName,
        "siteAddress": siteAddress,
        "siteContactNumber": siteContactNumber,
        "orderList": List<dynamic>.from(orderList.map((x) => x)),
        "siteManager": siteManager,
      };
}

class SiteOrders_Supplier {
  SiteOrders_Supplier({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.contactNumber,
    required this.address,
    required this.orderList,
    required this.productList,
  });

  String id;
  String name;
  String email;
  String password;
  String contactNumber;
  String address;
  List<String> orderList;
  List<String> productList;

  factory SiteOrders_Supplier.fromJson(Map<String, dynamic> json) =>
      SiteOrders_Supplier(
        id: json["_id"],
        name: json["name"],
        email: json["email"],
        password: json["password"],
        contactNumber: json["contactNumber"],
        address: json["address"],
        orderList: List<String>.from(json["orderList"].map((x) => x)),
        productList: List<String>.from(json["productList"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "name": name,
        "email": email,
        "password": password,
        "contactNumber": contactNumber,
        "address": address,
        "orderList": List<dynamic>.from(orderList.map((x) => x)),
        "productList": List<dynamic>.from(productList.map((x) => x)),
      };
}
