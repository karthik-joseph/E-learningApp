import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const PaymentHistory = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const paymentData = [
    {
      id: "1",
      date: "2024-09-15",
      amount: 99.99,
      description: "Monthly Subscription",
      status: "Completed",
    },
    {
      id: "2",
      date: "2024-08-15",
      amount: 99.99,
      description: "Monthly Subscription",
      status: "Completed",
    },
    {
      id: "3",
      date: "2024-07-15",
      amount: 99.99,
      description: "Monthly Subscription",
      status: "Completed",
    },
    {
      id: "4",
      date: "2024-06-15",
      amount: 79.99,
      description: "Special Offer Subscription",
      status: "Completed",
    },
  ];

  const PaymentItem = ({ date, amount, description, status }) => (
    <View style={styles.paymentItem}>
      <View style={styles.paymentInfo}>
        <CustomText style={styles.date}>
          {new Date(date).toLocaleDateString()}
        </CustomText>
        <CustomText style={styles.description}>{description}</CustomText>
        <CustomText style={styles.status}>{status}</CustomText>
      </View>
      <View style={styles.amountContainer}>
        <CustomText style={styles.amount}>${amount.toFixed(2)}</CustomText>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.grey} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
        <CustomText style={styles.title}>Payment History</CustomText>
      </View>
      <FlatList
        data={paymentData}
        renderItem={({ item }) => <PaymentItem {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
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
  listContainer: {
    paddingBottom: 16,
    padding: 16,
  },
  paymentItem: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentInfo: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: theme.colors.grey,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: theme.colors.darkBlue,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.grey5,
    marginRight: 8,
  },
});

export default PaymentHistory;
