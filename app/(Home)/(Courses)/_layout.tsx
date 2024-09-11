import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Tabs, useRootNavigationState, useRouter } from "expo-router";
import { theme } from "@/constants/Colors";
import CustomText from "@/components/CustomText";

const _layout = () => {
  const [activeTab, setActiveTab] = useState("index");
  const navigationState = useRootNavigationState();
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navigationBar}>
        {["index", "OnGoingLecture", "CompletedLecture"].map((routeName) => (
          <TouchableOpacity
            key={routeName}
            style={[
              styles.navButton,
              activeTab === routeName && styles.navButtonActive,
            ]}
            onPress={() => {
              setActiveTab(routeName);
              if (routeName == "index") {
                router.push("/(Courses)/index");
              }
              if (routeName == "OnGoingLecture") {
                router.push("/(Courses)/OnGoingLecture");
              }
              if (routeName == "CompletedLecture") {
                router.push("/(Courses)/CompletedLecture");
              }
            }}
          >
            <CustomText style={styles.navButtonText}>
              {/* Access title from the root navigation state */}
              {navigationState?.routes?.options?.title || routeName}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabel: ({}) => false,
          tabBarIcon: ({}) => false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Lectures",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="OnGoingLecture"
          options={{
            title: "OnGoingLecture",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="CompletedLecture"
          options={{
            title: "CompletedLecture",
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
  },
  navigationBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
  },
  navButton: {},
  navButtonActive: {},
  navButtonText: {},
  content: {
    flex: 1,
  },
});
