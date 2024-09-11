import LoginScreen from "@/app/logging/LoginScreen";
import React, { useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Redirect } from "expo-router";
import { AuthContext } from "./utils/authContext";
import LoadingView from "@/components/LoadingView";

export type RootStackParamList = {
  Login: undefined;
  VerifyOTP: { phoneNumber: string };
  EnterName: undefined;
  SetPassword: { name: string };
  Home: undefined;
};

const Index = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/(Home)");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingView />;
  }

  if (!user) {
    return <LoginScreen />;
  }
  if (user) {
    return <Redirect href="/(Home)" />;
  }
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
});
