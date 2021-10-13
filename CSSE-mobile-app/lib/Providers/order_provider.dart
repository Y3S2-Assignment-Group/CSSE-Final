import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/order_model.dart';
import 'package:mobile/models/order_product_model.dart';
import 'package:mobile/models/site_order_delivery_modal.dart';
import 'package:mobile/models/site_orders_model.dart';

class Orderprovider with ChangeNotifier {
  late String orderid;
  late String supplierid;
  late String siteid;
  List<OrderProducts> currentorderProductsList = [];
  List<SiteOrdersDelivery> orderDeliveryList = [];

  late String trackOrderid;
  late String trackOrderplacedDate;
  late String trackOrderrequiredDate;
  late String trackOrdersiteName;
  late String trackOrderSupplierName;
  late List<ProductList> trackOrderOrderProductsList;

  void settrackOrderOrderProductsList(
      List<ProductList> trackOrderOrderProductsList) {
    this.trackOrderOrderProductsList = trackOrderOrderProductsList;
  }

  List<ProductList> gettrackOrderOrderProductsList() {
    return trackOrderOrderProductsList;
  }

  void settrackOrdersiteName(String trackOrdersiteName) {
    this.trackOrdersiteName = trackOrdersiteName;
  }

  String gettrackOrdersiteName() {
    return trackOrdersiteName;
  }

  void settrackOrderSupplierName(String trackOrderSupplierName) {
    this.trackOrderSupplierName = trackOrderSupplierName;
  }

  String gettrackOrderSupplierName() {
    return trackOrderSupplierName;
  }

  void settrackOrderrequiredDate(String trackOrderrequiredDate) {
    this.trackOrderrequiredDate = trackOrderrequiredDate;
  }

  String gettrackOrderrequiredDate() {
    return trackOrderrequiredDate;
  }

  void settrackOrderplacedDate(String trackOrderplacedDate) {
    this.trackOrderplacedDate = trackOrderplacedDate;
  }

  String gettrackOrderplacedDate() {
    return trackOrderplacedDate;
  }

  void settrackOrderid(String trackOrderid) {
    this.trackOrderid = trackOrderid;
  }

  String gettrackOrderid() {
    return trackOrderid;
  }

  void setOrderID(String orderid) {
    this.orderid = orderid;
  }

  String getOrderID() {
    return orderid;
  }

  void setSiteID(String siteid) {
    this.siteid = siteid;
  }

  String getSiteID() {
    return siteid;
  }

  void setSupplierID(String supplierid) {
    this.supplierid = supplierid;
  }

  String getSupplierID() {
    return supplierid;
  }

  void addOrder(String supplierid, String siteid, String placedDate,
      String requiredDate) async {
    final addOrderResponse = await http.post(
      Uri.parse(
          "https://csse-backend.herokuapp.com/api/order/sitemanager/site/$siteid"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, dynamic>{
        'placedDate': placedDate,
        'requiredDate': requiredDate,
        "supplier": {"_id": supplierid}
      }),
    );

    if (addOrderResponse.statusCode == 200) {
      final data = jsonDecode(addOrderResponse.body);
      var resorder = new Order.fromJson(data);
      this.orderid = resorder.Id;
      print("orderID1" + resorder.Id);

      notifyListeners();
    } else {}
  }

  Future<List<OrderProducts>> getAllOrderProductsByOrderID() async {
    currentorderProductsList = [];
    final responseData = await http.get(Uri.parse(
        'https://csse-backend.herokuapp.com/api/order/productlist/$orderid'));

    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;
      for (Map<String, dynamic> item in data) {
        var orderProduct = OrderProducts.fromJson(item);
        currentorderProductsList.add(orderProduct);
      }

      notifyListeners();
      return currentorderProductsList;
    } else {
      Fluttertoast.showToast(
        msg: 'Cannot get the products for given supplier',
      );
      return [];
    }
  }

  void addOrderProducts(String productID, int qty) async {
    final addOrderResponse = await http.post(
      Uri.parse(
          "https://csse-backend.herokuapp.com/api/orderproduct/order/$orderid"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, dynamic>{
        'product': {"_id": productID},
        "qty": qty,
        "approvalStatus": true
      }),
    );

    if (addOrderResponse.statusCode == 200) {
      notifyListeners();
    } else {}
  }

  void confirmOrder() async {
    final addOrderResponse = await http.post(
        Uri.parse(
            "https://csse-backend.herokuapp.com/api/order/sitemanager/confirmorder/$orderid"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8'
        });

    if (addOrderResponse.statusCode == 200) {
      notifyListeners();
    } else {}
  }

  void closedOrderBySiteManager() async {
    final addOrderResponse = await http.post(
        Uri.parse(
            "https://csse-backend.herokuapp.com/api/order/sitemanager/closed/$trackOrderid"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8'
        });

    if (addOrderResponse.statusCode == 200) {
      notifyListeners();
    } else {}
  }

  Future<List<SiteOrdersDelivery>> getAllDeliveryListByOrderID() async {
    orderDeliveryList = [];
    final responseData = await http.get(Uri.parse(
        'https://csse-backend.herokuapp.com/api/order/deliverylist/$trackOrderid'));

    print("getAllDeliveryListByOrderID " + responseData.statusCode.toString());
    print("getAllDeliveryListBy OrderID " + trackOrderid);
    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;
      for (Map<String, dynamic> item in data) {
        var delivery = SiteOrdersDelivery.fromJson(item);
        orderDeliveryList.add(delivery);
      }

      notifyListeners();
      return orderDeliveryList;
    } else {
      Fluttertoast.showToast(
        msg: 'Cannot get the delivery for given order',
      );
      return [];
    }
  }
}
