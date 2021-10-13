import 'package:flutter/material.dart';
import 'package:mobile/Providers/order_provider.dart';
import 'package:mobile/Providers/sites_provider.dart';
import 'package:mobile/Providers/supplier_provider.dart';
import 'package:mobile/Widget/bottom_nav.dart';
import 'package:mobile/models/site_orders_model.dart';
import 'package:provider/src/provider.dart';

class OrderScreen extends StatefulWidget {
  const OrderScreen({Key? key}) : super(key: key);

  @override
  _OrderScreenState createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  late Future<List<SiteOrders>> siteOrders;
  @override
  void initState() {
    print(context.read<SitesProvider>().getOrderselectedSiteid());
    siteOrders = context.read<SitesProvider>().getOrdersForSite();
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      bottomNavigationBar: const BottomNavigationbar(
        selIndex: 1,
      ),
      body: Container(
        height: MediaQuery.of(context).size.height - 50,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 25),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 5),
                child: FutureBuilder<List<SiteOrders>>(
                    future: siteOrders,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return const Text("No Orders for this site ",
                            style: TextStyle(color: Colors.yellow));
                      } else {
                        return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(
                                height: 80,
                              ),
                              Center(
                                child: Text(
                                  "Order list for site : " +
                                      snapshot.data![0].site.siteName,
                                  style: const TextStyle(
                                      color: Colors.yellow, fontSize: 20),
                                ),
                              ),
                              const SizedBox(
                                height: 20,
                              ),
                              Container(
                                height: 550,
                                padding: EdgeInsets.symmetric(
                                    vertical: 0, horizontal: 10),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(15),
                                    border: Border.all(
                                        width: 3,
                                        style: BorderStyle.solid,
                                        color: Colors.white)),
                                child: ListView.separated(
                                    separatorBuilder:
                                        (BuildContext context, int index) =>
                                            const SizedBox(
                                              height: 10,
                                            ),
                                    itemCount: snapshot.data!.length,
                                    itemBuilder:
                                        (BuildContext context, int index) {
                                      return Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 10, vertical: 20),
                                        child: Column(
                                          children: [
                                            Row(
                                              children: [
                                                Text(
                                                  "Order ID: " +
                                                      snapshot.data![index].id
                                                          .substring(0, 5),
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                                Text(
                                                    snapshot.data![index]
                                                        .placedDate,
                                                    style: const TextStyle(
                                                        color: Colors.white)),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  "Site Name: " +
                                                      snapshot.data![index].site
                                                          .siteName,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  "Order Date: " +
                                                      snapshot.data![index]
                                                          .placedDate,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  "Required Date: " +
                                                      snapshot.data![index]
                                                          .requiredDate,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  "Supplier: " +
                                                      snapshot.data![index]
                                                          .supplier.name,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                              ],
                                            ),
                                            const SizedBox(
                                              height: 10,
                                            ),
                                            if (snapshot.data![index].status ==
                                                'requisition')
                                              Row(
                                                children: [
                                                  Text(
                                                    "Status: " +
                                                        snapshot.data![index]
                                                            .status,
                                                    style: const TextStyle(
                                                        color: Colors.yellow),
                                                  ),
                                                  Expanded(child: Container()),
                                                  IconButton(
                                                      onPressed: () {
                                                        context
                                                            .read<
                                                                SitesProvider>()
                                                            .setSiteID(snapshot
                                                                .data![index]
                                                                .site
                                                                .id);
                                                        context
                                                            .read<
                                                                SupplierProvider>()
                                                            .setSupplierID(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .supplier
                                                                    .id);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .setOrderID(snapshot
                                                                .data![index]
                                                                .id);
                                                        Navigator.pushNamed(
                                                            context,
                                                            '/editorder');
                                                      },
                                                      icon: const Icon(
                                                        Icons.edit,
                                                        color: Colors.yellow,
                                                      ))
                                                ],
                                              ),
                                            if (snapshot.data![index].status ==
                                                'completed')
                                              Row(
                                                children: [
                                                  Text(
                                                    "Status: " +
                                                        snapshot.data![index]
                                                            .status,
                                                    style: const TextStyle(
                                                        color: Colors.red),
                                                  ),
                                                  Expanded(child: Container()),
                                                ],
                                              ),
                                            if (snapshot.data![index].status ==
                                                'accepted')
                                              Row(
                                                children: [
                                                  Text(
                                                    "Status: " +
                                                        snapshot.data![index]
                                                            .status,
                                                    style: const TextStyle(
                                                        color: Colors.green),
                                                  ),
                                                  Expanded(child: Container()),
                                                  IconButton(
                                                      onPressed: () {
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderid(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .id);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderplacedDate(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .placedDate);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderrequiredDate(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .requiredDate);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrdersiteName(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .site
                                                                    .siteName);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderSupplierName(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .supplier
                                                                    .name);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderOrderProductsList(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .productList);

                                                        Navigator.pushNamed(
                                                            context,
                                                            '/trackorder');
                                                      },
                                                      icon: const Icon(
                                                        Icons
                                                            .arrow_forward_ios_rounded,
                                                        color: Colors.green,
                                                      ))
                                                ],
                                              ),
                                            if (snapshot.data![index].status ==
                                                'pending')
                                              Row(
                                                children: [
                                                  Text(
                                                    "Status: " +
                                                        snapshot.data![index]
                                                            .status,
                                                    style: const TextStyle(
                                                        color: Colors.yellow),
                                                  ),
                                                  Expanded(child: Container()),
                                                  IconButton(
                                                      onPressed: () {
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderid(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .id);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderplacedDate(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .placedDate);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderrequiredDate(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .requiredDate);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrdersiteName(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .site
                                                                    .siteName);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderSupplierName(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .supplier
                                                                    .name);
                                                        context
                                                            .read<
                                                                Orderprovider>()
                                                            .settrackOrderOrderProductsList(
                                                                snapshot
                                                                    .data![
                                                                        index]
                                                                    .productList);

                                                        Navigator.pushNamed(
                                                            context,
                                                            '/editorder');
                                                      },
                                                      icon: const Icon(
                                                        Icons.edit,
                                                        color: Colors.yellow,
                                                      ))
                                                ],
                                              ),
                                            if (snapshot.data![index].status ==
                                                'placed')
                                              Row(
                                                children: [
                                                  Text(
                                                    "Status: " +
                                                        snapshot.data![index]
                                                            .status,
                                                    style: const TextStyle(
                                                        color: Colors.green),
                                                  ),
                                                  Expanded(child: Container()),
                                                  IconButton(
                                                      onPressed: () {},
                                                      icon: const Icon(
                                                        Icons.edit,
                                                        color: Colors.yellow,
                                                      ))
                                                ],
                                              )
                                          ],
                                        ),
                                        decoration: BoxDecoration(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                            border: Border.all(
                                                width: 2,
                                                style: BorderStyle.solid,
                                                color: Colors.white)),
                                      );
                                    }),
                              )
                            ]);
                      }
                    }),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
