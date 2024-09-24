import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Courses = ({ item }) => {
  const router = useRouter();

  return item.map((item) => (
    <View style={styles.courseGrid} key={item.id}>
      <View>
        <TouchableOpacity
          style={[styles.courseCard, { backgroundColor: `${item.bg}` }]}
          onPress={() => {
            router.push("(Home)/(Courses)/Lectures");
          }}
        >
          <CustomText style={styles.courseTitle}>{item.CourseTitle}</CustomText>
          <CustomText style={styles.courseClasses}>
            {item.classes} Classes
          </CustomText>
          <Ionicons
            name="play-circle-outline"
            size={24}
            color="white"
            style={styles.playIcon}
          />
          <View
            style={[
              styles.imageBackground,
              {
                backgroundColor: `${item.bg}`,
                overflow: "hidden",
              },
            ]}
          >
            <Image
              source={item.imagePath}
              alt="Image"
              style={styles.coursesIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ));
};
export default Courses;

const styles = StyleSheet.create({
  courseGrid: {
    width: "50%",
    justifyContent: "space-between",
    padding: 6,
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  courseCard: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
  },
  imageBackground: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "65%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 26,
  },
  courseTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  courseClasses: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  playIcon: {
    position: "absolute",
    bottom: 16,
    left: 15,
    transform: [{ scale: 1.5 }],
  },
  coursesIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 10,
  },
});
