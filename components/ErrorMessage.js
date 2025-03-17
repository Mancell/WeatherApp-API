import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={50} color="#FF6B6B" />
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
  },
  retryButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ErrorMessage;
