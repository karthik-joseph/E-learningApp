import CustomText from "@/components/CustomText";
import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/app/utils/authContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { theme } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import Lecture from "@/components/Lecture";

const HomeScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { width: screenWidth } = Dimensions.get("window");
  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      BackHandler.exitApp();
    });

    return unsubscribe;
  }, [navigation]);

  const ongoingCourses = [
    { id: "1", title: "3D Art & Illustration", progress: 50 },
    { id: "2", title: "UI/UX Design Basics", progress: 30 },
    { id: "3", title: "Web Development", progress: 70 },
    { id: "4", title: "Web Development", progress: 70 },
    { id: "5", title: "Web Development", progress: 70 },
    { id: "6", title: "Web Development", progress: 70 },
    { id: "7", title: "Web Development", progress: 70 },
  ];

  const courses = [
    {
      id: "1",
      CourseTitle: "UI/UX Design",
      classes: "03",
      bg: theme.colors.primary,
      imagePath: require("@/assets/images/ui-ux.jpg"),
    },
    {
      id: "2",
      CourseTitle: "Derivation",
      classes: "05",
      bg: theme.colors.blue,
      imagePath: require("@/assets/images/derivation.jpg"),
    },
    {
      id: "3",
      CourseTitle: "PhotoShop",
      classes: "08",
      bg: theme.colors.blue,
      imagePath: require("@/assets/images/photoshop.jpg"),
    },
    {
      id: "4",
      CourseTitle: "Business",
      classes: "03",
      bg: theme.colors.grey4,
      imagePath: require("@/assets/images/bussiness.jpg"),
    },
  ];

  const SimpleImageSlider = ({ courses }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timer = useRef(null);
    const scrollViewRef = useRef(null);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
      timer.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex =
            (prevIndex + direction + courses.length) % courses.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * screenWidth,
            animated: true,
          });
          return nextIndex;
        });
      }, 2500);

      return () => {
        clearInterval(timer.current);
      };
    }, [courses.length, direction]);

    const handleScroll = (event) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      setActiveIndex(roundIndex);
    };

    return (
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ width: courses.length * screenWidth }}
        >
          {courses.map((course, index) => (
            <View key={index} style={{ width: screenWidth }}>
              <OngoingCourseCard item={course} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {courses.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex ? styles.paginationDotActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const OngoingCourseCard = ({ item }) => {
    return (
      <View style={styles.ongoingCard}>
        <View style={styles.contentContainer}>
          <CustomText style={styles.ongoingLabel}>ongoing</CustomText>
          <CustomText style={styles.ongoingTitle}>{item.title}</CustomText>
          <View style={styles.progressContainer}>
            <CustomText style={styles.progressText}>
              {item.progress}%
            </CustomText>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${item.progress}%` }]} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              router.push("/(Courses)/OnGoingLecture");
            }}
          >
            <CustomText style={styles.continueButtonText}>Continue</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/3d-art-illution.jpg")}
            alt="3d Art Illution Image"
            style={[styles.artsImage, { backgroundColor: "transparent" }]}
          />
        </View>
      </View>
    );
  };

  const Courses = ({ item }) =>
    item.map((item) => (
      <View style={styles.courseGrid} key={item.id}>
        <View>
          <TouchableOpacity
            style={[styles.courseCard, { backgroundColor: `${item.bg}` }]}
            onPress={() => {
              router.push("/(Courses)/Lectures");
            }}
          >
            <CustomText style={styles.courseTitle}>
              {item.CourseTitle}
            </CustomText>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("@/assets/images/person.jpg")}
              alt="Person Photo"
              style={styles.userImage}
            />
            <View>
              <CustomText style={styles.greeting}>
                Hey, {user?.name ? user?.name : "User"} 👋
              </CustomText>
              <CustomText style={styles.subGreeting}>
                let's get started
              </CustomText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/notification/");
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <SimpleImageSlider courses={ongoingCourses} />

        {/* Course Selection */}
        <View style={styles.coursesContainer}>
          <View style={styles.sectionTitle}>
            <CustomText style={styles.sectionTitleText}>
              Choose Your Course
            </CustomText>
          </View>
          <View style={styles.gridContainer}>
            <Courses item={courses} />
          </View>
        </View>
        {/* Today's Lecture */}
        <View style={styles.sectionTitle}>
          <CustomText style={styles.sectionTitleText}>
            Today's Lecture
          </CustomText>
        </View>
        <Lecture />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 55,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subGreeting: {
    fontSize: 14,
    color: "#6B7280",
  },
  ongoingCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.violet2,
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    paddingBottom: 35,
  },
  contentContainer: {
    flex: 1,
  },
  ongoingLabel: {
    color: "white",
    fontSize: 14,
  },
  ongoingTitle: {
    color: "white",
    fontSize: 16,
    maxWidth: 180,
    fontWeight: "bold",
    marginVertical: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 0.8,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    marginRight: 8,
  },
  progress: {
    height: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: 25,
  },
  progressText: {
    color: "white",
    fontSize: 14,
    marginRight: 5,
  },
  continueButton: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  continueButtonText: {
    color: theme.colors.violet2,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "42%",
    marginLeft: 10,
    backgroundColor: theme.colors.violet2,
  },
  artsImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.98,
    resizeMode: "contain",
    borderRadius: 20,
    backgroundColor: theme.colors.violet2,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
    marginRight: 8,
  },
  paginationDotActive: {
    width: 25,
    backgroundColor: theme.colors.darkBlue,
  },
  coursesContainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  sectionTitle: {
    padding: 16,
    marginTop: 10,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
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

export default HomeScreen;
