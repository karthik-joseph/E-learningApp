// AccountInfoSection.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import { theme } from "@/constants/Colors";
import { useRouter } from "expo-router";

const AccountInfoSection = () => {
  return (
    <View style={styles.container}>
      <AccountInfoItem
        title="Educational Information"
        link="/Profile/EducationalInfo"
      />
      <AccountInfoItem title="Payment History" link="/Profile/PaymentHistory" />
      <AccountInfoItem title="Payment History" link="/Profile/PaymentHistory" />
    </View>
  );
};

const AccountInfoItem = ({ title, link }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        try {
          router.push(link);
        } catch (error) {
          console.error(`Navigation error: ${error.message}`);
          Alert.alert(
            "Navigation Error",
            `Failed to navigate to ${link}. Error: ${error.message}`
          );
        }
      }}
    >
      <CustomText style={styles.itemTitle}>{title}</CustomText>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 16,
  },
  itemContainer: {
    backgroundColor: theme.colors.white,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default AccountInfoSection;
