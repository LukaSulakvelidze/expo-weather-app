import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { cityForecast } from "../types/cityForecast";
import CityView from "../components/_molecules/CityView";
import Input from "../components/_atoms/Input";
import { handleSubmit } from "../service/handleFunctions";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [cities, setcities] = useState<cityForecast[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  const inputHandler = (inputText: string) => {
    setInputValue(inputText);
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
      <Input
        style={styles.input}
        autoCorrect={false}
        onChangeText={inputHandler}
        value={inputValue}
        placeHolder="Enter City Name"
      />
      <Button
        title="Add City"
        onPress={() =>
          handleSubmit(cities, inputValue, setLoader, setcities, setInputValue)
        }
      />

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
