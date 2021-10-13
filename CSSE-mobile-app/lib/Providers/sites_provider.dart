import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/site_model.dart';
import 'package:mobile/models/site_orders_model.dart';
import 'package:mobile/models/supplier_model.dart';

class SitesProvider with ChangeNotifier {
  late Site selectedSite;
  late String OrderselectedSiteid;
  late String siteid;
  List<Site> sites = [];
  List<String> siteNames = [];
  List<SiteOrders> siteOrders = [];
  bool issiteData = false;

  bool getissiteData() {
    return issiteData;
  }

  void setSiteID(String siteid) {
    this.siteid = siteid;
  }

  String getSiteID() {
    return siteid;
  }

  void setOrderselectedSiteid(String OrderselectedSiteid) {
    this.OrderselectedSiteid = OrderselectedSiteid;
  }

  String getOrderselectedSiteid() {
    return OrderselectedSiteid;
  }

  Future<List<Site>> getSiteList() async {
    final String? authToken = await FlutterSecureStorage().read(key: 'token');
    final responseData = await http.get(
      Uri.parse("https://csse-backend.herokuapp.com/api/sitemanager/sites"),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-auth-token': authToken!,
      },
    );
    sites = [];
    print("Response code is getSiteList" + responseData.statusCode.toString());

    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;
      if (sites.isNotEmpty) {
        return sites;
      } else {
        for (Map<String, dynamic> item in data) {
          var site = Site.fromJson(item);
          sites.add(site);
        }
        return sites;
      }
    } else {
      return [];
    }
  }

  Future<Site> getSelectedSite() async {
    final responseData = await http
        .get(Uri.parse('https://csse-backend.herokuapp.com/api/site/$siteid'));

    print("Response code is" + responseData.statusCode.toString());

    final data = jsonDecode(responseData.body);
    selectedSite = Site.fromJson(data);
    return selectedSite;
  }

  Future<List<String>> getSiteListName() async {
    final String? authToken = await FlutterSecureStorage().read(key: 'token');
    final responseData = await http.get(
      Uri.parse("https://csse-backend.herokuapp.com/api/sitemanager/sites"),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-auth-token': authToken!,
      },
    );

    print("Response code is getSiteListName" +
        responseData.statusCode.toString());
    siteNames = [];
    if (responseData.statusCode == 200) {
      final data = jsonDecode(responseData.body) as List;

      for (Map<String, dynamic> item in data) {
        var site = Site.fromJson(item);
        siteNames.add(site.siteName);
      }
      if (data.length > 0) {
        issiteData = true;
      } else {
        issiteData = false;
      }
      return siteNames;
    } else {
      return [];
    }
  }

  Future<List<SiteOrders>> getDraftOrdersForSite() async {
    final responseData = await http.get(
      Uri.parse(
          "https://csse-backend.herokuapp.com/api/order/draft/sitemanager/site/$OrderselectedSiteid"),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    print("Response code is getOrdersForSite" +
        responseData.statusCode.toString());

    if (responseData.statusCode == 200) {
      siteOrders = [];
      final data = jsonDecode(responseData.body) as List;
      for (Map<String, dynamic> item in data) {
        var siteOrder = SiteOrders.fromJson(item);
        siteOrders.add(siteOrder);
      }
      return siteOrders;
    } else {
      return siteOrders;
    }
  }

  Future<List<SiteOrders>> getOrdersForSite() async {
    final responseData = await http.get(
      Uri.parse(
          "https://csse-backend.herokuapp.com/api/order/sitemanager/site/$OrderselectedSiteid"),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    print("Response code is getOrdersForSite" +
        responseData.statusCode.toString());

    if (responseData.statusCode == 200) {
      siteOrders = [];
      final data = jsonDecode(responseData.body) as List;
      for (Map<String, dynamic> item in data) {
        var siteOrder = SiteOrders.fromJson(item);
        siteOrders.add(siteOrder);
      }
      return siteOrders;
    } else {
      return siteOrders;
    }
  }
}
