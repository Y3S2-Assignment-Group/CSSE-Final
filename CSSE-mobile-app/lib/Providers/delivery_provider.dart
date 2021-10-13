import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

class Deliveryprovider with ChangeNotifier {
  void acceptDelivery(String deliveryId) async {
    final addOrderResponse = await http.post(
        Uri.parse(
            "https://csse-backend.herokuapp.com/api/delivery/approve/$deliveryId"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8'
        });

    if (addOrderResponse.statusCode == 200) {
      notifyListeners();
    } else {}
  }
}
