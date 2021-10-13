import 'package:flutter/material.dart';

TextStyle simpleTextStyle() {
  return const TextStyle(color: Colors.white);
}

InputDecoration textFieldInputDecoration(String input) {
  return InputDecoration(
      hintText: input,
      hintStyle: const TextStyle(color: Colors.white54),
      focusedBorder:
          const UnderlineInputBorder(borderSide: BorderSide(color: Colors.white)),
      enabledBorder:
          const UnderlineInputBorder(borderSide: BorderSide(color: Colors.white)));
}
