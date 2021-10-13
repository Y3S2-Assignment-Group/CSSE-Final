import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/supplier_model.dart';

class SupplierProvider with ChangeNotifier {
  late Supplier selectedSupplier;
  late String supplierid;

  List<Supplier> suppliersList = [];
  List<String> suppliersNameList = [];
  bool issupplierData = false;

  bool getissupplierData() {
    return issupplierData;
  }

  void setSupplierID(String supplierid) {
    this.supplierid = supplierid;
  }

  String getSupplierID() {
    return supplierid;
  }

  Future<List<Supplier>> getSuppliersList() async {
    final responseData = await http
        .get(Uri.parse('https://csse-backend.herokuapp.com/api/supplier/all'));

    print("Response code is" + responseData.statusCode.toString());
    suppliersList = [];
    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;
      if (suppliersList.isNotEmpty) {
        return suppliersList;
      } else {
        for (Map<String, dynamic> item in data) {
          var supplier = Supplier.fromJson(item);
          suppliersList.add(supplier);
        }
        return suppliersList;
      }
    } else {
      return suppliersList;
    }
  }

  Future<Supplier> getSelectedSupplier() async {
    final responseData = await http.get(Uri.parse(
        'https://csse-backend.herokuapp.com/api/supplier/$supplierid'));

    print("Response code is" + responseData.statusCode.toString());

    final data = jsonDecode(responseData.body);
    selectedSupplier = Supplier.fromJson(data);
    return selectedSupplier;
  }

  Future<List<String>> getSuppliersNameList() async {
    //todo:
    final responseData = await http
        .get(Uri.parse('https://csse-backend.herokuapp.com/api/supplier/all'));

    print("Response code is" + responseData.statusCode.toString());
    suppliersNameList = [];
    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;

      for (Map<String, dynamic> item in data) {
        var supplier = Supplier.fromJson(item);
        suppliersNameList.add(supplier.name);
      }
      if (data.length > 0) {
        issupplierData = true;
      } else {
        issupplierData = false;
      }
      return suppliersNameList;
    } else {
      return [];
    }
  }
}
