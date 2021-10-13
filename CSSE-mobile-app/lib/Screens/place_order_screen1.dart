import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/Providers/order_provider.dart';
import 'package:mobile/Providers/sites_provider.dart';
import 'package:mobile/Providers/supplier_provider.dart';
import 'package:mobile/Widget/bottom_nav.dart';
import 'package:mobile/models/site_model.dart';
import 'package:mobile/models/supplier_model.dart';
import 'package:provider/src/provider.dart';

class PlaceOrderScreen1 extends StatefulWidget {
  const PlaceOrderScreen1({Key? key}) : super(key: key);

  @override
  _PlaceOrderScreen1State createState() => _PlaceOrderScreen1State();
}

class _PlaceOrderScreen1State extends State<PlaceOrderScreen1> {
  DateTime requiredDate = DateTime.now();

  int SitePickerIndex = 0;
  late Future<List<Site>> siteList;
  late Future<List<String>> siteListName;

  int SupplierPickerIndex = 0;
  late Future<List<Supplier>> supplierList;
  late Future<List<String>> supplierListName;

  static void showSheet(BuildContext context,
          {required Widget child, required VoidCallback onClicked}) =>
      showCupertinoModalPopup(
          context: context,
          builder: (context) => CupertinoActionSheet(
                actions: [child],
                cancelButton: CupertinoActionSheetAction(
                  child: Text('Done'),
                  onPressed: onClicked,
                ),
              ));
  Widget buildDatePicker() => SizedBox(
        height: 300,
        child: CupertinoDatePicker(
            initialDateTime: DateTime.now(),
            mode: CupertinoDatePickerMode.date,
            onDateTimeChanged: (pickedDate) {
              setState(() {
                requiredDate = pickedDate;
              });
            }),
      );
  Widget buildSitePicker() => SizedBox(
        height: 300,
        child: FutureBuilder<List<String>>(
          future: siteListName,
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Container();
            } else {
              return CupertinoPicker(
                itemExtent: 60,
                onSelectedItemChanged: (index) {
                  setState(() {
                    this.SitePickerIndex = index;
                  });
                },
                children: modelBuilder<String>(snapshot.data!, (index, value) {
                  return Center(
                    child: Text(
                      value,
                      style: TextStyle(color: Colors.black, fontSize: 24),
                    ),
                  );
                }),
              );
            }
          },
        ),
      );
  Widget buildSupplierPicker() => SizedBox(
        height: 300,
        child: FutureBuilder<List<String>>(
          future: supplierListName,
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Container();
            } else {
              return CupertinoPicker(
                itemExtent: 60,
                onSelectedItemChanged: (index) {
                  setState(() {
                    SupplierPickerIndex = index;
                  });
                },
                children: modelBuilder<String>(snapshot.data!, (index, value) {
                  return Center(
                    child: Text(
                      value,
                      style: const TextStyle(color: Colors.black, fontSize: 24),
                    ),
                  );
                }),
              );
            }
          },
        ),
      );
  static List<Widget> modelBuilder<M>(
          List<M> models, Widget Function(int index, M model) builder) =>
      models
          .asMap()
          .map<int, Widget>(
              (index, model) => MapEntry(index, builder(index, model)))
          .values
          .toList();

  @override
  void initState() {
    siteList = context.read<SitesProvider>().getSiteList();
    siteListName = context.read<SitesProvider>().getSiteListName();
    supplierList = context.read<SupplierProvider>().getSuppliersList();
    supplierListName = context.read<SupplierProvider>().getSuppliersNameList();

    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: const BottomNavigationbar(
        selIndex: 0,
      ),
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height - 50,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              Center(
                child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 5),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 80,
                        ),
                        const Center(
                          child: Text(
                            "Place order",
                            style:
                                TextStyle(color: Colors.yellow, fontSize: 40),
                          ),
                        ),
                        const SizedBox(
                          height: 40,
                        ),
                        const Text(
                          "Select Site",
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        if (context.read<SitesProvider>().getissiteData())
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            child: Row(
                              children: [
                                CupertinoButton(
                                  padding: EdgeInsets.all(0),
                                  onPressed: () {
                                    showSheet(context, child: buildSitePicker(),
                                        onClicked: () {
                                      Navigator.pop(context);
                                    });
                                  },
                                  child: FutureBuilder<List<String>>(
                                      future: siteListName,
                                      builder: (context, snapshot) {
                                        if (!snapshot.hasData) {
                                          return const Text("No data");
                                        } else {
                                          return Text(
                                            snapshot.data![SitePickerIndex],
                                            style: const TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.white),
                                          );
                                        }
                                      }),
                                ),
                                Expanded(child: Container()),
                                const Icon(
                                  Icons.keyboard_arrow_down_rounded,
                                  color: Colors.white,
                                  size: 24.0,
                                  semanticLabel:
                                      'Text to announce in accessibility modes',
                                ),
                              ],
                            ),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                border: Border.all(
                                    width: 3,
                                    style: BorderStyle.solid,
                                    color: Colors.white)),
                            width: MediaQuery.of(context).size.width - 40,
                          ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Text(
                          "Select Supplier",
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        if (context
                            .read<SupplierProvider>()
                            .getissupplierData())
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            child: Row(
                              children: [
                                CupertinoButton(
                                  padding: EdgeInsets.all(0),
                                  onPressed: () {
                                    showSheet(context,
                                        child: buildSupplierPicker(),
                                        onClicked: () {
                                      Navigator.pop(context);
                                    });
                                  },
                                  child: FutureBuilder<List<String>>(
                                      future: supplierListName,
                                      builder: (context, snapshot) {
                                        if (!snapshot.hasData) {
                                          return const Text("No data");
                                        } else {
                                          return Text(
                                            snapshot.data![SupplierPickerIndex],
                                            style: const TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.white),
                                          );
                                        }
                                      }),
                                ),
                                Expanded(child: Container()),
                                const Icon(
                                  Icons.keyboard_arrow_down_rounded,
                                  color: Colors.white,
                                  size: 24.0,
                                  semanticLabel:
                                      'Text to announce in accessibility modes',
                                ),
                              ],
                            ),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                border: Border.all(
                                    width: 3,
                                    style: BorderStyle.solid,
                                    color: Colors.white)),
                            width: MediaQuery.of(context).size.width - 40,
                          ),
                        const SizedBox(
                          height: 50,
                        ),
                        const Divider(
                          color: Colors.white,
                          thickness: 3,
                        ),
                        const SizedBox(
                          height: 50,
                        ),
                        const Text(
                          "Select Date",
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: Row(
                            children: [
                              CupertinoButton(
                                padding: EdgeInsets.all(0),
                                onPressed: () {
                                  showSheet(context, child: buildDatePicker(),
                                      onClicked: () {
                                    Navigator.pop(context);
                                  });
                                },
                                child: Text(
                                  '$requiredDate',
                                  style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                                ),
                              ),
                              Expanded(child: Container()),
                              const Icon(
                                Icons.keyboard_arrow_down_rounded,
                                color: Colors.white,
                                size: 24.0,
                                semanticLabel:
                                    'Text to announce in accessibility modes',
                              ),
                            ],
                          ),
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(15),
                              border: Border.all(
                                  width: 3,
                                  style: BorderStyle.solid,
                                  color: Colors.white)),
                          width: MediaQuery.of(context).size.width - 40,
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        FutureBuilder<List<Supplier>>(
                            future: supplierList,
                            builder: (context, snapshotSup) {
                              return FutureBuilder<List<Site>>(
                                  future: siteList,
                                  builder: (context, snapshotSite) {
                                    return Center(
                                      child: TextButton(
                                        style: TextButton.styleFrom(
                                          primary: Colors.yellow,
                                        ),
                                        onPressed: () {
                                          context
                                              .read<SitesProvider>()
                                              .setSiteID(snapshotSite
                                                  .data![SitePickerIndex].id);
                                          context
                                              .read<SupplierProvider>()
                                              .setSupplierID(snapshotSup
                                                  .data![SupplierPickerIndex]
                                                  .id);
                                          context
                                              .read<Orderprovider>()
                                              .addOrder(
                                                  snapshotSup
                                                      .data![
                                                          SupplierPickerIndex]
                                                      .id,
                                                  snapshotSite
                                                      .data![SitePickerIndex]
                                                      .id,
                                                  DateTime.now()
                                                      .toString()
                                                      .substring(0, 10),
                                                  requiredDate
                                                      .toString()
                                                      .substring(0, 10));
                                          Navigator.pushNamed(
                                              context, '/placeOrder2');
                                        },
                                        child: Text('-Next-'),
                                      ),
                                    );
                                  });
                            }),
                      ],
                    )),
              ),
            ]),
          ),
        ),
      ),
    );
  }
}
