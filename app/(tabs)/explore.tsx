import React from "react";
import { StyleSheet, ScrollView, View, Text, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>About This App</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>Weather App</Text>
          </View>
          <Text style={styles.cardText}>
            This app provides real-time weather information and forecasts using
            the OpenWeatherMap API. You can search for any city around the world
            to get current weather conditions and hourly forecasts.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="list" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>Features</Text>
          </View>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="search" size={20} color="#666" />
              <Text style={styles.featureText}>
                Search for any city worldwide
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="thermometer" size={20} color="#666" />
              <Text style={styles.featureText}>
                Current temperature and conditions
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.featureText}>
                Hourly forecast for the next 24 hours
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="water" size={20} color="#666" />
              <Text style={styles.featureText}>
                Humidity and wind information
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="refresh" size={20} color="#666" />
              <Text style={styles.featureText}>
                Pull to refresh for latest data
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="code-slash" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>Technologies Used</Text>
          </View>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="logo-react" size={20} color="#666" />
              <Text style={styles.featureText}>React Native & Expo</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="cloud" size={20} color="#666" />
              <Text style={styles.featureText}>OpenWeatherMap API</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="git-branch" size={20} color="#666" />
              <Text style={styles.featureText}>Axios for API requests</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="link" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>Resources</Text>
          </View>
          <Text
            style={[styles.cardText, styles.link]}
            onPress={() => Linking.openURL("https://openweathermap.org/")}
          >
            OpenWeatherMap Website
          </Text>
          <Text
            style={[styles.cardText, styles.link]}
            onPress={() => Linking.openURL("https://docs.expo.dev/")}
          >
            Expo Documentation
          </Text>
          <Text
            style={[styles.cardText, styles.link]}
            onPress={() => Linking.openURL("https://reactnative.dev/")}
          >
            React Native Documentation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
  },
  link: {
    color: "#4A90E2",
    textDecorationLine: "underline",
    marginBottom: 8,
  },
});
