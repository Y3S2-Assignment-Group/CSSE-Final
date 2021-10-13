import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class BottomNavigationbar extends StatefulWidget {
  final selIndex;
  const BottomNavigationbar({Key? key, this.selIndex}) : super(key: key);
  // const BottomNavigationbar({this.selIndex});

  @override
  _BottomNavigationbarState createState() => _BottomNavigationbarState();
}

class _BottomNavigationbarState extends State<BottomNavigationbar> {
  int _selectedIndex = 0;

  Future<void> _onItemTapped(int index) async {
    setState(() {
      _selectedIndex = index;
    });
    switch (_selectedIndex) {
      case 0:
        Navigator.pushNamed(context, '/placeOrder1');
        break;
      case 1:
        Navigator.pushNamed(context, '/site');
        break;
      case 2:
        Navigator.pushNamed(context, '/draftOrderSites');
        break;
      case 3:
        await FlutterSecureStorage().deleteAll();
        Navigator.pushNamed(context, '/login');
        break;
      default:
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      selectedItemColor: Colors.yellow,
      unselectedItemColor: Colors.white,
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          backgroundColor: Colors.black,
          icon: Icon(Icons.checklist_rtl_sharp),
          label: 'Place Order',
        ),
        BottomNavigationBarItem(
          backgroundColor: Colors.black,
          icon: Icon(Icons.chrome_reader_mode),
          label: 'Orders',
        ),
        BottomNavigationBarItem(
          backgroundColor: Colors.black,
          icon: Icon(Icons.compare_arrows),
          label: 'Drafts',
        ),
        BottomNavigationBarItem(
          backgroundColor: Colors.black,
          icon: Icon(Icons.upload_file),
          label: 'Logout',
        ),
      ],
      currentIndex: widget.selIndex,
      onTap: _onItemTapped,
    );
  }
}
