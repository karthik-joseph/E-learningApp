import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import CustomText from "@/components/CustomText";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomText>Index</CustomText>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
});
