import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { WEATHER_ICON_URL } from "../constants/Api";
import { LinearGradient } from "expo-linear-gradient";

const ForecastItem = ({ item, isFirst }) => {
  const date = new Date(item.dt * 1000);
  const hours = date.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const iconUrl = `${WEATHER_ICON_URL}${item.weather[0].icon}@2x.png`;

  // Hava durumuna göre renk
  const getGradientColors = () => {
    const id = item.weather[0].id;
    if (id >= 200 && id < 300) return ["#6B7280", "#4B5563"]; // Fırtına
    if (id >= 300 && id < 400) return ["#60A5FA", "#3B82F6"]; // Çisenti
    if (id >= 500 && id < 600) return ["#3B82F6", "#2563EB"]; // Yağmur
    if (id >= 600 && id < 700) return ["#E5E7EB", "#D1D5DB"]; // Kar
    if (id >= 700 && id < 800) return ["#9CA3AF", "#6B7280"]; // Sis
    if (id === 800) return ["#4A90E2", "#3B82F6"]; // Açık
    return ["#60A5FA", "#3B82F6"]; // Bulutlu
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={[styles.forecastItem, isFirst && styles.firstItem]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Text style={styles.forecastTime}>{formattedHours}:00</Text>
      <View style={styles.iconContainer}>
        <Image source={{ uri: iconUrl }} style={styles.forecastIcon} />
      </View>
      <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°</Text>
      <Text style={styles.forecastDesc}>{item.weather[0].main}</Text>
    </LinearGradient>
  );
};

const ForecastList = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  // Sonraki 24 saat (3 saatlik aralıklarla)
  const groupedData = forecastData.list.slice(0, 8);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saatlik Tahmin</Text>
      <FlatList
        data={groupedData}
        renderItem={({ item, index }) => (
          <ForecastItem item={item} isFirst={index === 0} />
        )}
        keyExtractor={(item) => item.dt.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  listContent: {
    paddingRight: 10,
  },
  forecastItem: {
    alignItems: "center",
    marginRight: 12,
    minWidth: 80,
    padding: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  firstItem: {
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  forecastTime: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  forecastIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  forecastTemp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  forecastDesc: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
});

export default ForecastList;
