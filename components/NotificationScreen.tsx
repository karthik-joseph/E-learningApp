import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/Colors";
import { useNavigation } from "expo-router";

const notificationsData = [
  {
    id: "1",
    title: "New lecture available",
    message: "A new Python lecture has been added to your course.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Assignment due soon",
    message: "Your UI/UX Design assignment is due in 2 days.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Live session reminder",
    message: "Don't forget your live Math session today at 3 PM.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    title: "Course completed",
    message: "Congratulations! You've completed the 3D Art course.",
    time: "2 days ago",
    read: true,
  },
];

const NotificationItem = ({ item }) => (
  <TouchableOpacity
    style={[
      styles.notificationItem,
      item.read ? styles.readNotification : styles.unreadNotification,
    ]}
  >
    <View style={styles.notificationIcon}>
      <Ionicons
        name={item.read ? "notifications-outline" : "notifications"}
        size={24}
        color={item.read ? "#6B7280" : "#8B5CF6"}
      />
    </View>
    <View style={styles.notificationContent}>
      <CustomText style={styles.notificationTitle}>{item.title}</CustomText>
      <CustomText style={styles.notificationMessage}>{item.message}</CustomText>
      <CustomText style={styles.notificationTime}>{item.time}</CustomText>
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
        <CustomText style={styles.backNavigationTitle}>Home</CustomText>
      </TouchableOpacity>
      <CustomText style={styles.header}>Notifications</CustomText>
      <FlatList
        data={notificationsData}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
  },
  backNavigation: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backNavigationIcon: {
    marginRight: 10,
  },
  backNavigationTitle: {
    fontWeight: "700",
    fontSize: 18,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
    color: theme.colors.grey2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: theme.colors.darkBlue,
    borderBottomWidth: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "white",
  },
  unreadNotification: {
    backgroundColor: "#EEF2FF",
  },
  readNotification: {
    backgroundColor: "white",
  },
  notificationIcon: {
    marginRight: 16,
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default NotificationScreen;
