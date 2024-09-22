import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationScreen from "@/components/NotificationScreen";

const index = () => {
  return (
    <SafeAreaView>
      <NotificationScreen />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {},
});
