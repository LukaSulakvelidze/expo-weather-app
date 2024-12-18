import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { cityForecast } from "../types/cityForecast";
import CityView from "../components/_molecules/CityView";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [cities, setcities] = useState<cityForecast[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  const inputHandler = (inputText: string) => {
    setInputValue(inputText);
  };

  const handleSubmit = async (inputValue: string) => {
    if (!inputValue)
      return alert("Please enter a city name to get the weather data");

    const formattedInputValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (
      cities.some(
        (city: cityForecast) => city.location.name === formattedInputValue
      )
    )
      return alert("City is already in the list");

    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=196cbe371f1c40f9ba3113741241402&q=${inputValue.trim()}&days=7`
      );
      const cityData = response.data;

      if (cityData && cityData.location && cityData.current) {
        setcities((prev) => [...prev, cityData]);
        setInputValue("");
      } else {
        alert("Invalid data received from API");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("City not found");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    } finally {
      setLoader(false);
    }
  };

  const handleRemove = (item: cityForecast) => {
    const cityName = item.location.name;
    const updatedCities = cities.filter(
      (city: cityForecast) => city.location.name !== cityName
    );
    setcities(updatedCities);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={inputHandler}
        value={inputValue}
        placeholder="Enter City Name"
      />
      <Button title="Add City" onPress={() => handleSubmit(inputValue)} />

      {loader ? (
        <ActivityIndicator
          style={{ marginTop: 25 }}
          size="large"
          color="#0000ff"
        />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.location.localtime_epoch.toString()}
          renderItem={({ item }) => (
            <CityView
              item={item}
              navigation={navigation}
              handleRemove={handleRemove}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
