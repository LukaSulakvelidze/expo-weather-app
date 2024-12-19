import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import RenderForecastItem from "../components/_molecules/RenderForecastItem";

const CityDetailsScreen = ({ route }: { route: any }) => {
  const data = route.params.data;

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Text style={styles.headerText}>{data.location.name}</Text>
          <Text style={styles.currentTempText}>
            Current Temperature: {data.current.temp_c}°C
          </Text>
          <Text style={styles.subHeaderText}>
            {data.forecast.forecastday.length}-Day Forecast:
          </Text>
          <FlatList
            data={data.forecast.forecastday}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => <RenderForecastItem item={item} />}
            contentContainerStyle={styles.forecastList}
          />
        </>
      ) : (
        <ActivityIndicator
          style={{ marginTop: 25 }}
          size="large"
          color="#0000ff"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  currentTempText: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
  },
  forecastList: {
    marginTop: 10,
  },
});

export default CityDetailsScreen;
