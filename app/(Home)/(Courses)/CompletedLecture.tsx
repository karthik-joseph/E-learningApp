import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Colors";
import { CompletedLectures } from "@/components/Lecture";

const CompletedLecture = () => {
  return (
    <View style={styles.container}>
      <CompletedLectures />
    </View>
  );
};

export default CompletedLecture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
});
