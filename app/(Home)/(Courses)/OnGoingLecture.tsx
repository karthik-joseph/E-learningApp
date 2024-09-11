import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "@/components/CustomText";

const OnGoingLecture = () => {
  return (
    <View style={styles.container}>
      <CustomText>OnGoingLectures</CustomText>
    </View>
  );
};

export default OnGoingLecture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
});
