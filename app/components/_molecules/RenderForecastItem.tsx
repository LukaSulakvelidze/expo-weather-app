import { detailForecast } from "@/app/types/cityForecast";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RenderForecastItem = ({ item }: { item: detailForecast }) => {
  const dayOfWeek = new Date(item.date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <View style={styles.forecastItem}>
      <Text style={styles.dayText}>{dayOfWeek}</Text>
      <Text style={styles.conditionText}>{item.day.condition.text}</Text>
      <Text style={styles.tempText}>
        Min: {item.day.mintemp_c}°C | Max: {item.day.maxtemp_c}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  conditionText: {
    fontSize: 16,
    color: "#555",
  },
  tempText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default RenderForecastItem;
