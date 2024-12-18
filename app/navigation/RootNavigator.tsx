import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../(screens)/HomeScreen";
import DetailsScreen from "../(screens)/DetailsScreen";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail Forecast" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
