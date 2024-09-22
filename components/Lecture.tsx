import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import { useRouter } from "expo-router";

const lecturesData = [
  {
    id: "1",
    title: "Maths",
    status: "Running...",
    progress: 60,
    icon: "📚",
    bgColor: theme.colors.violet2,
    // add video url
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "2",
    title: "UI/UX",
    status: "Running...",
    progress: 40,
    icon: "🎨",
    bgColor: theme.colors.violet2,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "3",
    title: "3D Art",
    status: "Running...",
    progress: 75,
    icon: "🖌️",
    bgColor: theme.colors.violet2,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "4",
    title: "History",
    status: "Finished",
    progress: 100,
    icon: "🏛️",
    bgColor: "#E0FFEF",
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "5",
    title: "Python",
    status: "Running...",
    progress: 50,
    icon: "🐍",
    bgColor: theme.colors.violet2,
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "6",
    title: "Biology",
    status: "Finished",
    progress: 100,
    icon: "🧬",
    bgColor: "#E0FFEF",
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "7",
    title: "Editing",
    status: "Finished",
    progress: 100,
    icon: "✂️",
    bgColor: "#E0FFEF",
    videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

const LectureItem = ({ item }) => (
  <View style={styles.lectureCard}>
    <View
      style={[styles.lectureIconContainer, { backgroundColor: item.bgColor }]}
    >
      <CustomText style={styles.lectureIcon}>{item.icon}</CustomText>
    </View>
    <View style={styles.lectureInfo}>
      <CustomText style={styles.lectureTitle}>{item.title}</CustomText>
      <CustomText
        style={[
          styles.lectureStatus,
          item.status === "Finished" ? styles.finishedStatus : {},
        ]}
      >
        {item.status}
      </CustomText>
      <View style={styles.lectureProgress}>
        <View
          style={[
            styles.lectureProgressBar,
            { width: `${item.progress}%` },
            item.status === "Finished" ? styles.finishedProgressBar : {},
          ]}
        />
      </View>
    </View>
  </View>
);

export const CompletedLectures = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {lecturesData
        .filter((item) => item.status === "Finished")
        .map((item) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/Lessons/LessonDetails",
                params: {
                  videoUrl: item.videoUrl,
                },
              });
            }}
            key={item.id}
          >
            <LectureItem key={item.id} item={item} />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export const OnGoingLectures = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {lecturesData
        .filter((item) => item.status === "Running...")
        .map((item) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/Lessons/LessonDetails",
                params: {
                  videoUrl: item.videoUrl,
                },
              });
            }}
            key={item.id}
          >
            <LectureItem key={item.id} item={item} />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const Lectures = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {lecturesData.map((item) => (
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/Lessons/LessonDetails",
              params: {
                videoUrl: item.videoUrl,
              },
            });
          }}
          key={item.id}
        >
          <LectureItem key={item.id} item={item} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
    marginBottom: 30,
  },
  lectureCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: "center",
  },
  lectureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  lectureIcon: {
    fontSize: 24,
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lectureStatus: {
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: 4,
  },
  finishedStatus: {
    color: "#10B981",
  },
  lectureProgress: {
    height: 4,
    backgroundColor: theme.colors.grey3,
    borderRadius: 2,
  },
  lectureProgressBar: {
    height: "100%",
    backgroundColor: theme.colors.violet2,
    borderRadius: 2,
  },
  finishedProgressBar: {
    backgroundColor: "#10B981",
  },
});
