import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { WEATHER_ICON_URL } from "../constants/Api";
import { Ionicons } from "@expo/vector-icons";

const DayForecastItem = ({ item }) => {
  const date = new Date(item.dt * 1000);
  const dayName = getDayName(date);
  const iconUrl = `${WEATHER_ICON_URL}${item.weather[0].icon}@2x.png`;

  // Sıcaklık değerlerini al
  const maxTemp = Math.round(item.main.temp_max);
  const minTemp = Math.round(item.main.temp_min);

  // Pazartesi günü ve 16 derece kontrolü
  const isPazartesi = dayName === "Pazartesi";
  const has16Degrees = maxTemp === 16 || minTemp === 16;

  return (
    <View style={styles.dayItem}>
      <Text style={styles.dayName}>{dayName}</Text>
      <View style={styles.weatherInfo}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
        </View>
        <View
          style={[
            styles.tempContainer,
            isPazartesi && has16Degrees && styles.pazartesiTempContainer,
          ]}
        >
          <Text style={styles.maxTemp}>{maxTemp}°</Text>
          <Text style={styles.minTemp}>{minTemp}°</Text>
        </View>
      </View>
      <View style={styles.weatherDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="water-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.main.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="speedometer-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {Math.round(item.wind.speed)} m/s
          </Text>
        </View>
      </View>
    </View>
  );
};

// Günün adını almak için yardımcı fonksiyon
const getDayName = (date) => {
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  return days[date.getDay()];
};

// Günlük tahminleri gruplamak için yardımcı fonksiyon
const groupForecastByDay = (forecastList) => {
  const groupedData = [];
  const dayMap = new Map();

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();

    // Sadece öğlen saatlerindeki (12:00-15:00) tahminleri alalım
    const hour = date.getHours();
    if (hour >= 12 && hour <= 15) {
      if (!dayMap.has(day)) {
        dayMap.set(day, item);
        groupedData.push(item);
      }
    }
  });

  // En fazla 5 gün gösterelim
  return groupedData.slice(0, 5);
};

const WeeklyForecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const dailyData = groupForecastByDay(forecastData.list);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Günlük Tahmin</Text>
      <FlatList
        data={dailyData}
        renderItem={({ item }) => <DayForecastItem item={item} />}
        keyExtractor={(item) => item.dt.toString()}
        scrollEnabled={false}
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
  dayItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dayName: {
    width: 90,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  weatherInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -5,
  },
  pazartesiTempContainer: {
    marginLeft: -15, // Pazartesi günü için daha fazla sola kaydır
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginRight: 15,
  },
  minTemp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  weatherDetails: {
    flexDirection: "row",
    width: 100,
    justifyContent: "flex-end",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});

export default WeeklyForecast;
