import 'package:flutter/material.dart';
import 'package:mobile/Providers/product_provider.dart';
import 'package:mobile/Providers/supplier_provider.dart';
import 'package:mobile/Screens/edit_order_screen.dart';
import 'package:mobile/Screens/order_screen.dart';
import 'package:mobile/Screens/site_screen.dart';
import 'package:provider/provider.dart';

import 'Providers/delivery_provider.dart';
import 'Providers/order_provider.dart';
import 'Providers/site_manager_provider.dart';
import 'Providers/sites_provider.dart';
import 'Providers/product_provider.dart';
import 'Screens/draft_order_screen.dart';
import 'Screens/draft_order_site_screen.dart';
import 'Screens/login_screen.dart';
import 'Screens/place_order_screen1.dart';
import 'Screens/place_order_screen2.dart';
import 'Screens/registration_screen.dart';
import 'Screens/track_order_screen.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (_) => SiteManagerProvider()),
    ChangeNotifierProvider(create: (_) => SitesProvider()),
    ChangeNotifierProvider(create: (_) => SupplierProvider()),
    ChangeNotifierProvider(create: (_) => Orderprovider()),
    ChangeNotifierProvider(create: (_) => produtprovider()),
    ChangeNotifierProvider(create: (_) => Deliveryprovider())
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegistrationScreen(),
        '/placeOrder1': (context) => const PlaceOrderScreen1(),
        '/placeOrder2': (context) => const PlaceeOrderScreen2(),
        '/site': (context) => const SiteScreen(),
        '/order': (context) => const OrderScreen(),
        '/draftorder': (context) => const DraftOrderScreen(),
        '/draftOrderSites': (context) => const DraftOrderSiteScreen(),
        '/trackorder': (context) => const TrackOrderScreen(),
        '/editorder': (context) => const EditOrderScreen(),
      },
    );
  }
}
