import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4A90E2" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default Loading;
