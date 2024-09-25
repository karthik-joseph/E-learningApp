// CourseProgressCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/constants/Colors";
import CustomText from "../../components/CustomText";
import { useRouter } from "expo-router";

const CourseProgressCard = ({ course }) => {
  const router = useRouter();
  return course.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.container,
        { backgroundColor: `${item.bg}`, shadowColor: `${item.bg}` },
      ]}
      onPress={() => {
        router.push({
          pathname: "/Lessons/LessonDetails",
          params: {
            videoUrl: item.videoUrl,
          },
        });
      }}
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
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: 220,
    height: 120,
    marginRight: 14,
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
    height: 10,
    opacity: 0.8,
    borderRadius: 4,
    marginVertical: 4,
    width: "90%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "transparent",
  },
  progress: {
    height: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: 4,
  },
});

export default CourseProgressCard;
