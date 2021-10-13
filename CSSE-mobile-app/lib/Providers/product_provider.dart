import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile/models/product_model.dart';

class produtprovider with ChangeNotifier {
  List<Product> suplierProductList = [];
  List<String> suplierProductListNames = [];

  Future<List<Product>> getProductListForSupplier(String supplierID) async {
    //todo:
    final responseData = await http.get(Uri.parse(
        'https://csse-backend.herokuapp.com/api/supplier/$supplierID/products'));

    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;
      print(data);

      for (Map<String, dynamic> item in data) {
        var product = Product.fromJson(item);
        suplierProductList.add(Product.fromJson(item));
      }
      return suplierProductList;
    } else {
      Fluttertoast.showToast(
        msg: 'Cannot get the products for given supplier',
      );
      return [];
    }
  }

  Future<List<String>> getProductListNamesForSupplier(String supplierID) async {
    //todo:
    final responseData = await http.get(Uri.parse(
        'https://csse-backend.herokuapp.com/api/supplier/$supplierID/products'));

    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;

      for (Map<String, dynamic> item in data) {
        var product = Product.fromJson(item);
        suplierProductListNames.add(product.productName);
      }
      return suplierProductListNames;
    } else {
      Fluttertoast.showToast(
        msg: 'Cannot get the products for given supplier',
      );
      return [];
    }
  }
}
