import { cityForecast } from "@/app/types/cityForecast";
import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

interface CityViewProps {
  item: cityForecast;
  navigation: any;
  handleRemove: (arg: cityForecast) => void;
}

const CityView = ({ item, navigation, handleRemove }: CityViewProps) => {
  return (
    <View key={item.location.localtime_epoch} style={styles.card}>
      <Pressable
        onPress={() => navigation.navigate("DetailForecast", { data: item })}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.cityInfo}>
          <Text style={styles.cityName}>{item.location.name}</Text>
          <Text style={styles.detailsText}>Region: {item.location.region}</Text>
          <Text style={styles.detailsText}>
            Country: {item.location.country}
          </Text>
          <Text style={styles.detailsText}>
            Local Time: {item.location.localtime}
          </Text>
          <Text style={styles.temperatureText}>
            Temperature: {item.current.temp_c}°C
          </Text>
        </View>
      </Pressable>
      <Button
        title="Delete"
        onPress={() => handleRemove(item)}
        color="#ff3b30"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressableContainer: {
    borderRadius: 8,
    padding: 10,
  },
  pressed: {
    backgroundColor: "#f0f0f0",
  },
  cityInfo: {
    marginBottom: 10,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
  },
  temperatureText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ff6f00",
    marginTop: 5,
  },
});

export default CityView;
