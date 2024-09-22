import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, usePathname, useRouter } from "expo-router";
import { theme } from "@/constants/Colors";
import CustomText from "@/components/CustomText";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("index");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Update activeTab based on the current pathname
    const currentRoute = pathname.split("/").pop();
    if (currentRoute) {
      setActiveTab(currentRoute);
    }
  }, [pathname]);

  const routes = [
    { name: "Lectures", title: "Today's Lectures" },
    { name: "OnGoingLecture", title: "Ongoing" },
    { name: "CompletedLecture", title: "Completed" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navigationBar}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.navButton,
              activeTab === route.name && styles.navButtonActive,
            ]}
            onPress={() => {
              setActiveTab(route.name);
              router.push(`/(Home)/(Courses)/${route.name}`);
            }}
          >
            <CustomText
              style={[
                styles.navButtonText,
                activeTab === route.name && styles.navButtonTextActive,
              ]}
            >
              {route.title}
            </CustomText>
            {activeTab === route.name && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs for nested navigation */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="Lectures"
          options={{
            title: "Lectures",
          }}
        />
        <Tabs.Screen
          name="OnGoingLecture"
          options={{
            title: "Ongoing",
          }}
        />
        <Tabs.Screen
          name="CompletedLecture"
          options={{
            title: "Completed",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1.5,
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    position: "relative",
  },
  navButtonActive: {
    paddingBottom: 10,
  },
  navButtonText: {
    color: theme.colors.grey[500],
    fontSize: 13,
  },
  navButtonTextActive: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});

export default Layout;
