import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import HomeG from "@/assets/images/Home g.svg";
import HomeB from "@/assets/images/Home b.svg";
import ClassLight from "@/assets/images/class-light.svg";
import ClassBlue from "@/assets/images/class-dark.svg";
import ProfileB from "@/assets/images/profile.svg";
import { theme } from "@/constants/Colors";

const Home = () => {
  const { phoneNumber, name, password } = useLocalSearchParams();

  const params = {
    phoneNumber,
    name,
    password,
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          padding: 15,
          borderRadius: 30,
          width: "97%",
          marginHorizontal: "auto",
          marginBottom: 5,
          height: 65,
          backgroundColor: theme.colors.black,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        initialParams={params}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeB style={styles.iconStyle} />
            ) : (
              <HomeG style={styles.iconStyle} />
            ),
        }}
      />
      <Tabs.Screen
        name="(Courses)"
        options={{
          title: "Lecture",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ClassBlue style={styles.iconStyle} />
            ) : (
              <ClassLight style={styles.iconStyle} />
            ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Lecture",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileB
                style={[
                  styles.iconStyle,
                  { backgroundColor: theme.colors.darkBlue },
                ]}
              />
            ) : (
              <ProfileB style={styles.iconStyle} />
            ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 20,
  },
});

export default Home;
