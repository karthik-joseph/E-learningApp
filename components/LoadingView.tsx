import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingView: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7C5BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingView;
