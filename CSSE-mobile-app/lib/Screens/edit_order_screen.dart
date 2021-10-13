import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/Providers/order_provider.dart';
import 'package:mobile/Providers/product_provider.dart';
import 'package:mobile/Providers/sites_provider.dart';
import 'package:mobile/Providers/supplier_provider.dart';
import 'package:mobile/Widget/bottom_nav.dart';
import 'package:mobile/models/order_product_model.dart';
import 'package:mobile/models/product_model.dart';
import 'package:mobile/models/site_model.dart';
import 'package:mobile/models/supplier_model.dart';
import 'package:provider/src/provider.dart';

class EditOrderScreen extends StatefulWidget {
  const EditOrderScreen({Key? key}) : super(key: key);

  @override
  _EditOrderScreenState createState() => _EditOrderScreenState();
}

class _EditOrderScreenState extends State<EditOrderScreen> {
  late Future<Supplier> selectedSupplier;
  late Future<Site> selectedSite;

  int ProductPickerIndex = 0;
  late Future<List<String>> ProductListName;
  late Future<List<Product>> ProductList;

  int qty = 0;
  late Future<List<OrderProducts>> orderProductList;

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
    selectedSite = context.read<SitesProvider>().getSelectedSite();
    selectedSupplier = context.read<SupplierProvider>().getSelectedSupplier();
    ProductListName = context
        .read<produtprovider>()
        .getProductListNamesForSupplier(
            context.read<SupplierProvider>().getSupplierID());
    ProductList = context.read<produtprovider>().getProductListForSupplier(
        context.read<SupplierProvider>().getSupplierID());
    orderProductList =
        context.read<Orderprovider>().getAllOrderProductsByOrderID();
    super.initState();
  }

  Widget buildProductPicker() => SizedBox(
        height: 300,
        child: FutureBuilder<List<String>>(
          future: ProductListName,
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Container();
            } else {
              return CupertinoPicker(
                itemExtent: 60,
                onSelectedItemChanged: (index) {
                  setState(() {
                    ProductPickerIndex = index;
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
                            "Edit order",
                            style:
                                TextStyle(color: Colors.yellow, fontSize: 30),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Divider(
                          color: Colors.white,
                          thickness: 3,
                        ),
                        Row(
                          children: [
                            const SizedBox(
                              width: 20,
                            ),
                            FutureBuilder<Site>(
                                future: selectedSite,
                                builder: (context, snapshot) {
                                  if (!snapshot.hasData) {
                                    return const Text(
                                      "Loading...",
                                      style: TextStyle(color: Colors.yellow),
                                    );
                                  } else {
                                    return Text(
                                      'Site: ' + snapshot.data!.siteName,
                                      style:
                                          const TextStyle(color: Colors.yellow),
                                    );
                                  }
                                }),
                            Expanded(child: Container()),
                            FutureBuilder<Supplier>(
                                future: selectedSupplier,
                                builder: (context, snapshot) {
                                  if (!snapshot.hasData) {
                                    return const Text(
                                      "Loading...",
                                      style: TextStyle(color: Colors.yellow),
                                    );
                                  } else {
                                    return Text(
                                      "Supplier: " + snapshot.data!.name,
                                      style:
                                          const TextStyle(color: Colors.yellow),
                                    );
                                  }
                                }),
                            const SizedBox(
                              width: 20,
                            )
                          ],
                        ),
                        const Divider(
                          color: Colors.white,
                          thickness: 3,
                        ),
                        const SizedBox(
                          height: 40,
                        ),
                        const Text(
                          "Select product",
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
                                  showSheet(context,
                                      child: buildProductPicker(),
                                      onClicked: () {
                                    Navigator.pop(context);
                                  });
                                },
                                child: FutureBuilder<List<String>>(
                                    future: ProductListName,
                                    builder: (context, snapshot) {
                                      if (!snapshot.hasData) {
                                        return const Text("No data");
                                      } else {
                                        return Text(
                                          snapshot.data![ProductPickerIndex],
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
                          height: 40,
                        ),
                        const Text(
                          "Select Quantiy",
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: TextField(
                            onChanged: (ch) {
                              qty = int.parse(ch);
                            },
                            style: const TextStyle(color: Colors.white),
                            decoration: const InputDecoration(
                                border: UnderlineInputBorder(),
                                hintText: 'Enter a search term'),
                          ),
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(15),
                              border: Border.all(
                                  width: 3,
                                  style: BorderStyle.solid,
                                  color: Colors.white)),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          children: [
                            const SizedBox(
                              width: 20,
                            ),
                            FutureBuilder<List<String>>(
                                future: ProductListName,
                                builder: (context, snapshot) {
                                  if (!snapshot.hasData) {
                                    return const Text("No data");
                                  } else {
                                    return Text(
                                      snapshot.data![ProductPickerIndex],
                                      style: const TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.white),
                                    );
                                  }
                                }),
                            Expanded(child: Container()),
                            Text(
                              "x$qty",
                              style: const TextStyle(
                                  color: Colors.white, fontSize: 20),
                            ),
                            Expanded(child: Container()),
                            FutureBuilder<List<Product>>(
                                future: ProductList,
                                builder: (context, snapshot) {
                                  if (!snapshot.hasData) {
                                    return const Text("No data");
                                  } else {
                                    return Text(
                                      snapshot.data![ProductPickerIndex].pPrice
                                          .toString(),
                                      style: const TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.white),
                                    );
                                  }
                                }),
                            Expanded(child: Container()),
                            FutureBuilder<List<Product>>(
                                future: ProductList,
                                builder: (context, snapshot) {
                                  return IconButton(
                                      onPressed: () {
                                        context
                                            .read<Orderprovider>()
                                            .addOrderProducts(
                                                snapshot
                                                    .data![ProductPickerIndex]
                                                    .id,
                                                qty);
                                        // setState(() {
                                        //   orderProductList = context
                                        //       .read<Orderprovider>()
                                        //       .getAllOrderProductsByOrderID();
                                        // });
                                        Navigator.pushNamed(
                                            context, '/editorder');
                                      },
                                      icon: Container(
                                          padding: EdgeInsets.all(5),
                                          decoration: BoxDecoration(
                                              color: Color(0xFFED960B),
                                              borderRadius:
                                                  BorderRadius.circular(50)),
                                          child: const Icon(
                                            Icons.add,
                                            color: Colors.white,
                                          )));
                                }),
                            const SizedBox(
                              width: 20,
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        FutureBuilder<List<OrderProducts>>(
                            future: orderProductList,
                            builder: (context, snapshot) {
                              if (!snapshot.hasData) {
                                return const Text("No data...",
                                    style: TextStyle(color: Colors.yellow));
                              } else {
                                return Container(
                                  height: 150,
                                  padding:
                                      const EdgeInsets.symmetric(vertical: 0),
                                  child: ListView.separated(
                                      separatorBuilder:
                                          (BuildContext context, int index) =>
                                              const SizedBox(
                                                height: 1,
                                              ),
                                      itemCount: snapshot.data!.length,
                                      itemBuilder:
                                          (BuildContext context, int index) {
                                        return ListTile(
                                          onTap: () {},
                                          title: Row(
                                            children: [
                                              Text(
                                                snapshot.data![index].product
                                                    .productName,
                                                style: const TextStyle(
                                                    color: Colors.white),
                                              ),
                                              const SizedBox(
                                                width: 30,
                                              ),
                                              Text(
                                                  "x" +
                                                      snapshot.data![index].qty
                                                          .toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white)),
                                              SizedBox(
                                                width: 30,
                                              ),
                                              Text(
                                                  snapshot.data![index].product
                                                      .pPrice
                                                      .toString(),
                                                  style: TextStyle(
                                                      color: Colors.white)),
                                              const SizedBox(
                                                width: 30,
                                              ),
                                              Text(
                                                  snapshot.data![index].opPrice
                                                      .toString(),
                                                  style: const TextStyle(
                                                      color: Colors.white)),
                                              const SizedBox(
                                                width: 20,
                                              ),
                                            ],
                                          ),
                                        );
                                      }),
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(15),
                                      border: Border.all(
                                          width: 3,
                                          style: BorderStyle.solid,
                                          color: Colors.white)),
                                );
                              }
                            }),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          children: [
                            Expanded(child: Container()),
                            TextButton(
                              style: TextButton.styleFrom(
                                primary: Colors.yellow,
                              ),
                              onPressed: () {
                                Navigator.pushNamed(context, '/order');
                              },
                              child: Text('-Edit Order-'),
                            ),
                            Expanded(child: Container()),
                          ],
                        ),
                      ]),
                ),
              ),
            ]),
          ),
        ),
      ),
    );
  }
}
