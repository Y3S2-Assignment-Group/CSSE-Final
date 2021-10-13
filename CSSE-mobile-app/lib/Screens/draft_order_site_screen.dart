import 'package:flutter/material.dart';
import 'package:mobile/Providers/sites_provider.dart';
import 'package:mobile/Widget/bottom_nav.dart';
import 'package:mobile/models/site_model.dart';
import 'package:provider/src/provider.dart';

class DraftOrderSiteScreen extends StatefulWidget {
  const DraftOrderSiteScreen({Key? key}) : super(key: key);

  @override
  _DraftOrderSiteScreenState createState() => _DraftOrderSiteScreenState();
}

class _DraftOrderSiteScreenState extends State<DraftOrderSiteScreen> {
  late Future<List<Site>> siteList;

  @override
  void initState() {
    siteList = context.read<SitesProvider>().getSiteList();
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: const BottomNavigationbar(
        selIndex: 2,
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
                            "Sites list",
                            style:
                                TextStyle(color: Colors.yellow, fontSize: 30),
                          ),
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        FutureBuilder<List<Site>>(
                            future: siteList,
                            builder: (context, snapshot) {
                              if (!snapshot.hasData) {
                                return const Text("No data...",
                                    style: TextStyle(color: Colors.yellow));
                              } else {
                                return Container(
                                  height: 500,
                                  padding: EdgeInsets.symmetric(vertical: 0),
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
                                          onTap: () {
                                            context
                                                .read<SitesProvider>()
                                                .setOrderselectedSiteid(
                                                    snapshot.data![index].id);
                                            Navigator.pushNamed(
                                                context, '/draftorder');
                                          },
                                          title: Row(
                                            children: [
                                              const SizedBox(
                                                width: 30,
                                              ),
                                              Text(
                                                snapshot.data![index].siteName,
                                                style: const TextStyle(
                                                    color: Colors.white),
                                              ),
                                              Expanded(child: Container()),
                                              const Icon(
                                                Icons.arrow_forward_ios,
                                                color: Colors.white,
                                                size: 24.0,
                                                semanticLabel:
                                                    'Text to announce in accessibility modes',
                                              ),
                                              const SizedBox(
                                                width: 30,
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
