import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/site_manager_model.dart';

class SiteManagerProvider with ChangeNotifier {
  final storage = new FlutterSecureStorage();

  String name = '';
  String token = '';
  String email = '';
  String password = '';

  String getToken() {
    return token;
  }

  void setName(String name) {
    this.name = name;
  }

  String getName() {
    return name;
  }

  void setEmail(String email) {
    this.email = email;
  }

  String getEmail() {
    return email;
  }

  void setPassword(String password) {
    this.password = password;
  }

  String getPassword() {
    return password;
  }

  void register(BuildContext context) async {
    final registerResponse = await http.post(
      Uri.parse("https://csse-backend.herokuapp.com/api/sitemanager/register"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, dynamic>{
        'name': name,
        'email': email,
        'password': password,
      }),
    );
    print(registerResponse.statusCode);
    if (registerResponse.statusCode == 200) {
      final data = jsonDecode(registerResponse.body);
      var customerData = SiteManager.fromJson(data);
      await storage.write(key: 'token', value: customerData.token);
      Navigator.pushNamed(context, '/placeOrder1');
    }
  }

  void login(BuildContext context) async {
    print("email: " + email);
    print("password:" + password);
    final loginResponse = await http.post(
      Uri.parse("https://csse-backend.herokuapp.com/api/sitemanager/login"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, dynamic>{
        'email': email,
        'password': password,
      }),
    );

    print(loginResponse.statusCode);
    if (loginResponse.statusCode == 200) {
      final data = jsonDecode(loginResponse.body);
      var customerData = SiteManager.fromJson(data);
      await storage.write(key: 'token', value: customerData.token);
      Navigator.pushNamed(context, '/placeOrder1');
    }
  }
}
