import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Courses from "@/app/Lessons/Courses";
import { theme } from "@/constants/Colors";
import UserProfile from "@/components/Profile/UserProfile";
import CourseProgressCard from "@/components/Profile/CourseProgressCard";

const courses = [
  {
    id: "1",
    CourseTitle: "UI/UX Design",
    progress: 50,
    timeSpent: 18,
    bg: theme.colors.violet2,
  },
  {
    id: "2",
    CourseTitle: "Derivation",
    progress: 80,
    timeSpent: 24,
    bg: theme.colors.blue,
  },
  {
    id: "3",
    CourseTitle: "PhotoShop",
    progress: 75,
    timeSpent: 20,
    bg: theme.colors.grey2,
  },
  {
    id: "4",
    CourseTitle: "Business",
    progress: 90,
    timeSpent: 30,
    bg: theme.colors.red,
  },
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <UserProfile />
      <ScrollView horizontal style={styles.gridContainer}>
        <CourseProgressCard course={courses} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.lightGray,
    flex: 1,
    paddingHorizontal: 10,
  },
  gridContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
