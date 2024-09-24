// UserProfile.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import CustomText from "../CustomText";
import ProfileIcon from "@/assets/images/profile.svg";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/person.jpg")}
        alt="Person Photo"
        style={styles.profilePicture}
      />
      <CustomText style={styles.name}>John Andros</CustomText>
      <CustomText style={styles.email}>johnandros@gmail.com</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default UserProfile;
