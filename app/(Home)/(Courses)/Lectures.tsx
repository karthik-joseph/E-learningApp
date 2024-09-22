import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Lecture from "@/components/Lecture";
import { theme } from "@/constants/Colors";

const Lectures = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Lecture />
    </SafeAreaView>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
});
