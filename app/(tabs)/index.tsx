import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
  ImageBackground,
  StatusBar as RNStatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../../services/weatherService";
import WeatherCard from "../../components/WeatherCard";
import ForecastList from "../../components/ForecastList";
import WeeklyForecast from "../../components/WeeklyForecast";
import SearchBar from "../../components/SearchBar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState("Istanbul"); // Default city

  const fetchWeatherData = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const [weather, forecast] = await Promise.all([
        getCurrentWeather(cityName),
        getWeatherForecast(cityName),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError("Hava durumu verileri alınamadı. Lütfen tekrar deneyin.");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (cityName: string) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeatherData(city);
  };

  // Hava durumuna göre arka plan renkleri
  const getBackgroundColors = (): [string, string] => {
    if (!weatherData || !weatherData.weather) return ["#4A90E2", "#87CEFA"];

    const id = weatherData.weather[0].id;
    if (id >= 200 && id < 300) return ["#2C3E50", "#34495E"]; // Fırtına
    if (id >= 300 && id < 400) return ["#3498DB", "#87CEFA"]; // Çisenti
    if (id >= 500 && id < 600) return ["#2980B9", "#3498DB"]; // Yağmur
    if (id >= 600 && id < 700) return ["#ECF0F1", "#BDC3C7"]; // Kar
    if (id >= 700 && id < 800) return ["#95A5A6", "#7F8C8D"]; // Sis
    if (id === 800) return ["#3498DB", "#87CEFA"]; // Açık
    return ["#4A90E2", "#87CEFA"]; // Bulutlu
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={getBackgroundColors()}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor="#fff"
              />
            }
          >
            <Text style={styles.title}>Mancel Weather App</Text>
            <SearchBar onSearch={handleSearch} />

            {loading && !refreshing ? (
              <Loading message="Hava durumu verileri alınıyor..." />
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={() => fetchWeatherData(city)}
              />
            ) : (
              <View style={styles.weatherContainer}>
                <WeatherCard weatherData={weatherData} />
                <ForecastList forecastData={forecastData} />
                <WeeklyForecast forecastData={forecastData} />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: RNStatusBar.currentHeight,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    elevation: 3,
  },
  weatherContainer: {
    marginTop: 10,
  },
});
