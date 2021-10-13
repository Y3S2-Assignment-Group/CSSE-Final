import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/Providers/delivery_provider.dart';
import 'package:mobile/Providers/order_provider.dart';
import 'package:mobile/Widget/bottom_nav.dart';
import 'package:mobile/models/site_order_delivery_modal.dart';
import 'package:mobile/models/site_orders_model.dart';
import 'package:provider/src/provider.dart';

class TrackOrderScreen extends StatefulWidget {
  const TrackOrderScreen({Key? key}) : super(key: key);

  @override
  _TrackOrderScreenState createState() => _TrackOrderScreenState();
}

class _TrackOrderScreenState extends State<TrackOrderScreen> {
  late String orderid;
  late String placedDate;
  late String requiredDate;
  late String siteName;
  late String supplierName;
  late List<ProductList> orderproductList;
  late Future<List<SiteOrdersDelivery>> deliveryList;

  @override
  void initState() {
    // print(context.read<Orderprovider>().gettrackOrderid());
    // print(context.read<Orderprovider>().gettrackOrderplacedDate());
    // print(context.read<Orderprovider>().gettrackOrderrequiredDate());
    // print(context.read<Orderprovider>().gettrackOrdersiteName());
    // print(context.read<Orderprovider>().gettrackOrderSupplierName());
    // print(context.read<Orderprovider>().gettrackOrderOrderProductsList());
    orderid = context.read<Orderprovider>().gettrackOrderid();
    placedDate = context.read<Orderprovider>().gettrackOrderplacedDate();
    requiredDate = context.read<Orderprovider>().gettrackOrderrequiredDate();
    siteName = context.read<Orderprovider>().gettrackOrdersiteName();
    supplierName = context.read<Orderprovider>().gettrackOrderSupplierName();
    orderproductList =
        context.read<Orderprovider>().gettrackOrderOrderProductsList();
    deliveryList = context.read<Orderprovider>().getAllDeliveryListByOrderID();
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: const BottomNavigationbar(
        selIndex: 1,
      ),
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height - 50,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 5),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 60,
                        ),
                        const Center(
                          child: Text(
                            "Track order",
                            style:
                                TextStyle(color: Colors.yellow, fontSize: 20),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Container(
                          height: 550,
                          padding: const EdgeInsets.symmetric(
                              vertical: 20, horizontal: 20),
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(15),
                              border: Border.all(
                                  width: 3,
                                  style: BorderStyle.solid,
                                  color: Colors.white)),
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  Text(
                                    "Order id:" + orderid.substring(0, 10),
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  Expanded(child: Container()),
                                  Text(
                                    placedDate,
                                    style: const TextStyle(
                                        color: Colors.white, fontSize: 20),
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Row(
                                children: [
                                  Text(
                                    "Site Name:   " + siteName,
                                    style: TextStyle(color: Colors.white),
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
                                    "Supplier Name:   " + supplierName,
                                    style: TextStyle(color: Colors.white),
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
                                    "Placed date:   " + placedDate,
                                    style: TextStyle(color: Colors.white),
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
                                    "Required date:   " + requiredDate,
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                  Expanded(child: Container()),
                                ],
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              const Divider(
                                color: Colors.white,
                                thickness: 3,
                              ),
                              const Text(
                                "Item list",
                                style: const TextStyle(color: Colors.white),
                              ),
                              if (orderproductList.isNotEmpty)
                                Container(
                                    height: 100,
                                    padding: const EdgeInsets.symmetric(
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
                                        itemCount: orderproductList.length,
                                        itemBuilder:
                                            (BuildContext context, int index) {
                                          return Container(
                                            child: Row(
                                              children: [
                                                Text(
                                                  orderproductList[index]
                                                      .product
                                                      .productName,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                                Text(
                                                  orderproductList[index]
                                                      .qty
                                                      .toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                                Text(
                                                  orderproductList[index]
                                                      .product
                                                      .pPrice
                                                      .toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                                Expanded(child: Container()),
                                                Text(
                                                  orderproductList[index]
                                                      .opPrice
                                                      .toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                              ],
                                            ),
                                          );
                                        })),
                              const Divider(
                                color: Colors.white,
                                thickness: 3,
                              ),
                              const Text(
                                "Delivery list",
                                style: const TextStyle(color: Colors.white),
                              ),
                              Container(
                                  height: 175,
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 0, horizontal: 10),
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(15),
                                      border: Border.all(
                                          width: 3,
                                          style: BorderStyle.solid,
                                          color: Colors.white)),
                                  child:
                                      FutureBuilder<List<SiteOrdersDelivery>>(
                                    future: deliveryList,
                                    builder: (context, snapshot) {
                                      if (!snapshot.hasData) {
                                        return const SizedBox(
                                            child: Center(
                                          child: Text("No data..."),
                                        ));
                                      } else {
                                        return ListView.separated(
                                            separatorBuilder:
                                                (BuildContext context,
                                                        int index) =>
                                                    const Divider(
                                                      color: Colors.white,
                                                      thickness: 2,
                                                    ),
                                            itemCount: snapshot.data!.length,
                                            itemBuilder: (BuildContext context,
                                                int index) {
                                              return Container(
                                                child: Column(
                                                  children: [
                                                    Row(
                                                      children: [
                                                        Text(
                                                          "Delivery id:" +
                                                              snapshot
                                                                  .data![index]
                                                                  .id
                                                                  .substring(
                                                                      0, 4),
                                                          style:
                                                              const TextStyle(
                                                                  color: Colors
                                                                      .white),
                                                        ),
                                                        Expanded(
                                                            child: Container()),
                                                        Text(
                                                          // ignore: unrelated_type_equality_checks
                                                          snapshot.data![index]
                                                                      .isAccepted ==
                                                                  true
                                                              ? 'Accepted'
                                                              : 'Not Accepted',
                                                          style:
                                                              const TextStyle(
                                                                  color: Colors
                                                                      .white),
                                                        ),
                                                      ],
                                                    ),
                                                    const SizedBox(
                                                      height: 20,
                                                    ),
                                                    for (SiteOrdersDeliveryProductList item
                                                        in snapshot.data![index]
                                                            .productList)
                                                      Row(
                                                        children: [
                                                          Text(
                                                            item.product
                                                                .productName,
                                                            style:
                                                                const TextStyle(
                                                                    color: Colors
                                                                        .white),
                                                          ),
                                                          Expanded(
                                                              child:
                                                                  Container()),
                                                          Text(
                                                            "x" +
                                                                item.qty
                                                                    .toString(),
                                                            style:
                                                                const TextStyle(
                                                                    color: Colors
                                                                        .white),
                                                          ),
                                                        ],
                                                      ),
                                                    SizedBox(
                                                      height: 20,
                                                    ),
                                                    if (!snapshot.data![index]
                                                        .isAccepted)
                                                      TextButton(
                                                        style: TextButton
                                                            .styleFrom(
                                                          primary:
                                                              Colors.yellow,
                                                        ),
                                                        onPressed: () {
                                                          context
                                                              .read<
                                                                  Deliveryprovider>()
                                                              .acceptDelivery(
                                                                  snapshot
                                                                      .data![
                                                                          index]
                                                                      .id);
                                                          Navigator.pushNamed(
                                                              context,
                                                              '/trackorder');
                                                        },
                                                        child: Text('-Accept-'),
                                                      ),
                                                  ],
                                                ),
                                              );
                                            });
                                      }
                                    },
                                  )),
                            ],
                          ),
                        ),
                        Center(
                          child: TextButton(
                            style: TextButton.styleFrom(
                              primary: Colors.yellow,
                            ),
                            onPressed: () {
                              context
                                  .read<Orderprovider>()
                                  .closedOrderBySiteManager();
                              Fluttertoast.showToast(
                                msg: 'Closed the Order',
                              );
                              Navigator.pushNamed(context, '/order');
                            },
                            child: const Text(
                              '-Closed-',
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}


// Container(
//                                                 height: 50,
//                                                 child: ListView.separated(
//                                                     separatorBuilder: (BuildContext
//                                                                 context,
//                                                             int indexProduct) =>
//                                                         const SizedBox(
//                                                           height: 10,
//                                                         ),
//                                                     itemCount: snapshot
//                                                         .data![index]
//                                                         .productList
//                                                         .length,
//                                                     itemBuilder:
//                                                         (BuildContext context,
//                                                             int indexProduct) {
//                                                       return Container(
//                                                         child: Row(children: [
//                                                           Text(
//                                                             snapshot
//                                                                 .data![index]
//                                                                 .productList[
//                                                                     indexProduct]
//                                                                 .opPrice
//                                                                 .toString(),
//                                                             style: TextStyle(
//                                                                 color: Colors
//                                                                     .white),
//                                                           ),
//                                                           Expanded(
//                                                               child:
//                                                                   Container()),
//                                                           Text(
//                                                             snapshot
//                                                                 .data![index]
//                                                                 .productList[
//                                                                     indexProduct]
//                                                                 .qty
//                                                                 .toString(),
//                                                             style:
//                                                                 const TextStyle(
//                                                                     color: Colors
//                                                                         .white),
//                                                           ),
//                                                         ]),
//                                                       );
//                                                     }),
//                                               );