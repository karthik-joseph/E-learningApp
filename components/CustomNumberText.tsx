import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface CustomNumberTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const CustomNumberText: React.FC<CustomNumberTextProps> = ({
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
    fontFamily: "Quantico-Regular",
    color: "#000",
  },
});

export default CustomNumberText;
