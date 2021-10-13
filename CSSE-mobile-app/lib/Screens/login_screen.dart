import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/Providers/site_manager_provider.dart';
import 'package:mobile/models/widget.dart';
import 'package:provider/src/provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String email = '';
  String password = '';

  void SignIn() {
    context.read<SiteManagerProvider>().setEmail(email);
    context.read<SiteManagerProvider>().setPassword(password);
    context.read<SiteManagerProvider>().login(context);
  }

  @override
  void initState() {
    checkAuth();
    super.initState();
  }

  void checkAuth() async {
    final authToken = await const FlutterSecureStorage().read(key: 'token');
    if (authToken != null) {
      Navigator.pushNamed(context, '/placeOrder1');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: SingleChildScrollView(
          child: Container(
            height: MediaQuery.of(context).size.height - 50,
            alignment: Alignment.center,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Form(
                    child: Column(
                      children: [
                        // ignore: prefer_const_constructors
                        AnimatedTextKit(totalRepeatCount: 1, animatedTexts: [
                          ColorizeAnimatedText(
                            "Constructo",
                            colors: [Colors.yellow, Colors.white],
                            textStyle: const TextStyle(
                                fontFamily: 'Billabong', fontSize: 65),
                            speed: const Duration(milliseconds: 2000),
                          ),
                        ]),

                        // ignore: prefer_const_constructors
                        SizedBox(
                          height: 30,
                        ),
                        Row(
                          children: [
                            // ignore: prefer_const_constructors
                            Icon(
                              Icons.alternate_email,
                              color: Colors.white,
                            ),
                            // ignore: prefer_const_constructors
                            SizedBox(width: 3),
                            Expanded(
                              child: TextFormField(
                                  validator: (val) =>
                                      val!.isEmpty ? 'Enter an email' : null,
                                  //decoration: textInputDecoration.copyWith(
                                  //hintText: 'Email Address'),
                                  onChanged: (val) {
                                    setState(() => email = val);
                                  },
                                  style: simpleTextStyle(),
                                  decoration:
                                      textFieldInputDecoration(' Email')),
                            ),
                          ],
                        ),
                        Row(
                          children: <Widget>[
                            // ignore: prefer_const_constructors
                            Icon(
                              Icons.lock,
                              color: Colors.white,
                            ),
                            // ignore: prefer_const_constructors
                            SizedBox(width: 3),
                            Expanded(
                              child: TextFormField(
                                  validator: (val) => val!.length < 6
                                      ? 'Enter a password with more than 6 characters'
                                      : null,
                                  //decoration:
                                  //textInputDecoration.copyWith(hintText: 'Password'),
                                  obscureText: true,
                                  onChanged: (val) {
                                    setState(() => password = val);
                                  },
                                  style: simpleTextStyle(),
                                  decoration:
                                      textFieldInputDecoration(' Password')),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  const SizedBox(height: 8),
                  GestureDetector(
                    //CHANGED TO ASYNC
                    onTap: SignIn,
                    child: Container(
                      alignment: Alignment.center,
                      width: MediaQuery.of(context).size.width,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(25),
                          color: Colors.yellow),
                      // ignore: prefer_const_constructors
                      child: Text(
                        'Sign In',
                        style: const TextStyle(
                            color: Colors.black, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Don't have an account? ", style: simpleTextStyle()),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(context, '/register');
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          // ignore: prefer_const_constructors
                          child: Text("Register now",
                              style: const TextStyle(
                                  color: Colors.white,
                                  decoration: TextDecoration.underline)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ));
  }
}
