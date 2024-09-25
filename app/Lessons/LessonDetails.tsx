import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import CompletedCircle from "@/assets/images/completed.svg";

const LessonItem = ({ title, duration, isCompleted, isLocked }) => (
  <View style={styles.lessonItem}>
    <View style={styles.lessonInfo}>
      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={24} color="#8e44ad" />
      ) : isLocked ? (
        <Ionicons name="lock-closed" size={24} color="#95a5a6" />
      ) : (
        <Ionicons name="play-circle" size={24} color="#3498db" />
      )}
      <CustomText style={styles.lessonTitle}>{title}</CustomText>
    </View>
    <CustomText style={styles.lessonDuration}>{duration}</CustomText>
  </View>
);

const LessonSection = ({ title, items, isExpanded, onToggle }) => (
  <View style={styles.lessonSection}>
    <TouchableOpacity onPress={onToggle} style={styles.sectionHeader}>
      <CustomText style={styles.sectionTitle}>{title}</CustomText>
      <Ionicons
        name={isExpanded ? "chevron-up" : "chevron-down"}
        size={24}
        color="#2c3e50"
      />
    </TouchableOpacity>
    {isExpanded &&
      items.map((item, index) => <LessonItem key={index} {...item} />)}
  </View>
);

const LessonDetails = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { videoUrl } = useLocalSearchParams();
  const [expandedSections, setExpandedSections] = useState({});
  const navigation = useNavigation();

  const lessonSections = [
    {
      id: "1",
      title: "Lesson 1",
      items: [
        { title: "Introduction", duration: "2:05", isCompleted: true },
        {
          title: "Fundamentals of maths",
          duration: "2:05",
          isCompleted: false,
        },
        { title: "Calculus", duration: "2:05", isCompleted: false },
        {
          title: "Set theory",
          duration: "2:05",
          isCompleted: false,
          isLocked: true,
        },
        {
          title: "Functions",
          duration: "2:05",
          isCompleted: false,
          isLocked: true,
        },
      ],
    },
    {
      id: "2",
      title: "Lesson 2",
      items: [
        {
          title: "Advanced Topics",
          duration: "3:15",
          isCompleted: false,
          isLocked: true,
        },
        {
          title: "Problem Solving",
          duration: "4:00",
          isCompleted: false,
          isLocked: true,
        },
        {
          title: "Probability and Statistics",
          duration: "2:45",
          isCompleted: false,
          isLocked: true,
        },
        {
          title: "Linear Algebra",
          duration: "3:30",
          isCompleted: false,
          isLocked: true,
        },
        {
          title: "Geometry",
          duration: "2:15",
          isCompleted: false,
          isLocked: true,
        },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backNavigation}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#8B5CF6"
          style={styles.backNavigationIcon}
        />
        <CustomText style={styles.backNavigationTitle}>Go Back</CustomText>
      </TouchableOpacity>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: videoUrl }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <CustomText style={styles.title}>Introduction</CustomText>
            <CustomText style={styles.subtitle}>
              Fundamentals of maths
            </CustomText>
          </View>
          <TouchableOpacity style={styles.completeButton}>
            <CompletedCircle width={20} height={20} />
            <CustomText style={styles.completeButtonText}>
              Mark as Completed
            </CustomText>
          </TouchableOpacity>
        </View>
        {lessonSections.map((section) => (
          <LessonSection
            key={section.id}
            {...section}
            isExpanded={expandedSections[section.id]}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  backNavigation: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 8,
    backgroundColor: theme.colors.violet,
    marginBottom: 4,
  },
  backNavigationIcon: {
    marginRight: 10,
  },
  backNavigationTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: theme.colors.white,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.grey2,
    marginBottom: 10,
  },
  completeButton: {
    borderWidth: 1,
    borderColor: theme.colors.violet2,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  completeButtonText: {
    color: theme.colors.violet,
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10,
  },
  lessonSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: theme.colors.grey3,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.grey4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  lessonTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  lessonDuration: {
    color: theme.colors.grey,
  },
});

export default LessonDetails;
