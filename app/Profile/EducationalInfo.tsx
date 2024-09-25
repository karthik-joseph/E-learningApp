import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const EducationalInfo = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      year: "2018 - 2022",
      details: "Major in Artificial Intelligence and Machine Learning",
    },
    {
      degree: "High School Diploma",
      institution: "Central High School",
      year: "2014 - 2018",
      details: "Valedictorian, President of Computer Science Club",
    },
  ];

  const EducationItem = ({ degree, institution, year, details }) => (
    <View style={styles.educationItem}>
      <CustomText style={styles.degree}>{degree}</CustomText>
      <CustomText style={styles.institution}>{institution}</CustomText>
      <CustomText style={styles.year}>{year}</CustomText>
      <CustomText style={styles.details}>{details}</CustomText>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          <CustomText style={styles.title}>Educational Info</CustomText>
        </View>
        <View style={styles.educationDataContainer}>
          {educationData.map((item, index) => (
            <EducationItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
    backgroundColor: theme.colors.violet,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.lightBlue,
    marginHorizontal: "auto",
  },
  educationDataContainer: {
    paddingHorizontal: 16,
  },
  educationItem: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  degree: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.violet,
    marginBottom: 4,
  },
  institution: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 2,
  },
  year: {
    fontSize: 14,
    color: theme.colors.grey,
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default EducationalInfo;
