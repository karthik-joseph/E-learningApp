import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "@/components/CustomText";

const CompletedLecture = () => {
  return (
    <View style={styles.container}>
      <CustomText>CompletedLectures</CustomText>
    </View>
  );
};

export default CompletedLecture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
});
