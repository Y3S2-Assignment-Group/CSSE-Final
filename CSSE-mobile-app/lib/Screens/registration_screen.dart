import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/Providers/site_manager_provider.dart';
import 'package:mobile/models/widget.dart';
import 'package:provider/src/provider.dart';

class RegistrationScreen extends StatefulWidget {
  const RegistrationScreen({Key? key}) : super(key: key);

  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  String password = '';
  String name = '';
  String email = '';

  void Register() {
    print("password:" + password);
    print("name:" + name);
    print("email:" + email);

    context.read<SiteManagerProvider>().setEmail(email);
    context.read<SiteManagerProvider>().setPassword(password);
    context.read<SiteManagerProvider>().setName(name);
    context.read<SiteManagerProvider>().register(context);
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Container(
            alignment: Alignment.center,
            height: MediaQuery.of(context).size.height - 50,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Center(
                      child: Text(
                        "Register",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 30,
                            fontWeight: FontWeight.w700),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Form(
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Row(children: <Widget>[
                              // ignore: prefer_const_constructors
                              Icon(
                                Icons.alternate_email,
                                color: Colors.yellow,
                              ),
                              const SizedBox(width: 3),
                              Expanded(
                                child: TextFormField(
                                    validator: (val) {
                                      return RegExp(
                                                  r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
                                              .hasMatch(val!)
                                          ? null
                                          : "Please provide a valid Email";
                                    },
                                    onChanged: (val) {
                                      setState(() => email = val);
                                    },
                                    style:
                                        const TextStyle(color: Colors.yellow),
                                    decoration:
                                        textFieldInputDecoration(' Email')),
                              ),
                            ]),
                            const SizedBox(height: 10),
                            Row(children: <Widget>[
                              // ignore: prefer_const_constructors
                              Icon(
                                Icons.lock,
                                color: Colors.yellow,
                              ),
                              const SizedBox(width: 3),
                              Expanded(
                                child: TextFormField(
                                    obscureText: true,
                                    validator: (val) {
                                      return val!.isEmpty || val.length <= 6
                                          ? 'Please provide a valid password'
                                          : null;
                                    },
                                    onChanged: (val) {
                                      setState(() => password = val);
                                    },
                                    style:
                                        const TextStyle(color: Colors.yellow),
                                    decoration:
                                        textFieldInputDecoration(' Password')),
                              ),
                            ]),
                            const SizedBox(height: 10),
                            Row(
                              children: <Widget>[
                                const Icon(
                                  Icons.face,
                                  color: Colors.yellow,
                                ),
                                const SizedBox(width: 3),
                                Expanded(
                                  child: TextFormField(
                                      validator: (val) {
                                        if (val!.isEmpty) {
                                          return 'Please provide your name';
                                        } else {
                                          return null;
                                        }
                                      },
                                      onChanged: (val) {
                                        setState(() => name = val);
                                      },
                                      style:
                                          const TextStyle(color: Colors.yellow),
                                      decoration:
                                          textFieldInputDecoration(' Name')),
                                ),
                              ],
                            ),
                            const SizedBox(height: 20),
                            GestureDetector(
                              onTap: Register,
                              child: Container(
                                alignment: Alignment.center,
                                width: MediaQuery.of(context).size.width,
                                padding:
                                    const EdgeInsets.symmetric(vertical: 16),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(25),
                                    color: Colors.yellow),
                                child: const Text('Create Account',
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.w500)),
                              ),
                            ),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text("Already have an account? ",
                                    style: simpleTextStyle()),
                                GestureDetector(
                                  onTap: () {
                                    Navigator.pushNamed(context, '/login');
                                  },
                                  child: Container(
                                    padding:
                                        const EdgeInsets.symmetric(vertical: 8),
                                    child: const Text("Sign In",
                                        style: TextStyle(
                                            color: Colors.white,
                                            decoration:
                                                TextDecoration.underline)),
                                  ),
                                ),
                              ],
                            ),
                          ]),
                    )
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
