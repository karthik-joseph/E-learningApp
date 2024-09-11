import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./utils/authContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Italic": require("../assets/fonts/DMSans-Italic.ttf"),
    "Quantico-Regular": require("../assets/fonts/Quantico-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </View>
    </AuthProvider>
  );
}
