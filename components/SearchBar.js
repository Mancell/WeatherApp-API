import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="location"
          size={20}
          color="#4A90E2"
          style={styles.locationIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Şehir ara..."
          placeholderTextColor="#9CA3AF"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {city.length > 0 && (
          <TouchableOpacity
            onPress={() => setCity("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 15,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4A90E2",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default SearchBar;
