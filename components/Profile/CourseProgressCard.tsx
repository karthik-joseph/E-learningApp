// CourseProgressCard.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/constants/Colors";
import CustomText from "../CustomText";

const CourseProgressCard = ({ course }) => {
  return course.map((item) => (
    <View
      key={item.id}
      style={[styles.container, { backgroundColor: `${item.bg}` }]}
    >
      <CustomText style={styles.courseTitle}>{item.CourseTitle}</CustomText>
      <CustomText style={styles.timeSpent}>
        {item.timeSpent} Hour Spend
      </CustomText>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{item.progress}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${item.progress}%` }]} />
        </View>
      </View>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: 220,
    height: 120,
    marginRight: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: 4,
  },
  timeSpent: {
    fontSize: 14,
    color: theme.colors.white,
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.white,
    marginRight: 5,
  },
  progressBar: {
    height: 8,
    borderWidth: 0.8,
    opacity: 0.8,
    borderRadius: 4,
    borderColor: "transparent",
    marginVertical: 4,
    width: "100%",
  },
  progress: {
    height: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: 4,
  },
});

export default CourseProgressCard;
