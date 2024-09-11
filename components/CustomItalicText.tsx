import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface CustomItalicTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const CustomItalicText: React.FC<CustomItalicTextProps> = ({
  style,
  children,
  ...props
}) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans-Italic",
    color: "#000",
  },
});

export default CustomItalicText;
