import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Courses from "@/app/Lessons/Courses";
import { theme } from "@/constants/Colors";
import UserProfile from "@/app/Profile/UserProfile";
import CourseProgressCard from "@/app/Profile/CourseProgressCard";
import CustomText from "@/components/CustomText";
import AccountInfoSection from "@/app/Profile/AccountInfoSection";

const courses = [
  {
    id: "1",
    CourseTitle: "UI/UX Design",
    progress: 50,
    timeSpent: 18,
    bg: theme.colors.violet2,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "2",
    CourseTitle: "Derivation",
    progress: 80,
    timeSpent: 24,
    bg: theme.colors.blue,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "3",
    CourseTitle: "PhotoShop",
    progress: 75,
    timeSpent: 20,
    bg: theme.colors.grey2,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "4",
    CourseTitle: "Business",
    progress: 90,
    timeSpent: 30,
    bg: theme.colors.red,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <UserProfile />
      <View style={styles.courses}>
        <CustomText style={styles.title}>Courses You're Taking</CustomText>
        <ScrollView
          horizontal
          style={styles.gridContainer}
          showsHorizontalScrollIndicator={false}
        >
          <CourseProgressCard course={courses} />
        </ScrollView>
      </View>
      <View style={styles.accountContainer}>
        <CustomText
          style={[styles.title, { paddingHorizontal: 0, marginBottom: 10 }]}
        >
          Account
        </CustomText>
        <AccountInfoSection />
      </View>
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
  courses: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: theme.colors.disabledText,
  },
  gridContainer: {
    paddingTop: 20,
  },
  accountContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
