import CustomText from "@/components/CustomText";
import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AuthContext } from "@/app/utils/authContext";

const HomeScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.root}>
      <CustomText>Welcome {user ? user?.name : "User"}</CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
