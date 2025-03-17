import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { WEATHER_ICON_URL } from "../constants/Api";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const iconUrl = `${WEATHER_ICON_URL}${weather[0].icon}@4x.png`;

  // Hava durumuna göre arka plan rengi
  const getBackgroundColor = () => {
    const id = weather[0].id;
    if (id >= 200 && id < 300) return "#6B7280"; // Fırtına
    if (id >= 300 && id < 400) return "#60A5FA"; // Çisenti
    if (id >= 500 && id < 600) return "#3B82F6"; // Yağmur
    if (id >= 600 && id < 700) return "#E5E7EB"; // Kar
    if (id >= 700 && id < 800) return "#9CA3AF"; // Sis
    if (id === 800) return "#4A90E2"; // Açık
    return "#60A5FA"; // Bulutlu
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={24} color="#fff" />
        <Text style={styles.cityName}>{name}</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.tempContainer}>
          <Text style={styles.temperature}>{Math.round(main.temp)}°</Text>
          <Text style={styles.celcius}>C</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
        </View>
      </View>

      <Text style={styles.weatherDescription}>{weather[0].description}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="thermometer-outline" size={22} color="#fff" />
          <Text style={styles.detailLabel}>Hissedilen</Text>
          <Text style={styles.detailValue}>
            {Math.round(main.feels_like)}°C
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="water-outline" size={22} color="#fff" />
          <Text style={styles.detailLabel}>Nem</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="speedometer-outline" size={22} color="#fff" />
          <Text style={styles.detailLabel}>Rüzgar</Text>
          <Text style={styles.detailValue}>{Math.round(wind.speed)} m/s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#fff",
  },
  celcius: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  weatherDescription: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "500",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 15,
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 3,
  },
});

export default WeatherCard;
