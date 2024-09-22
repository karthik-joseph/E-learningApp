import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Colors";
import { OnGoingLectures } from "@/components/Lecture";

const OnGoingLecture = () => {
  return (
    <View style={styles.container}>
      <OnGoingLectures />
    </View>
  );
};

export default OnGoingLecture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
});
