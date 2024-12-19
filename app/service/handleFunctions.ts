import axios from "axios";
import { cityForecast } from "../types/cityForecast";
import { axiosInstance } from "@/lib/axiosInstance";

const handleSubmit = async (
  cities: cityForecast[],
  inputValue: string,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setcities: React.Dispatch<React.SetStateAction<cityForecast[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
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
    const response = await axiosInstance.get(
      `forecast.json?key=196cbe371f1c40f9ba3113741241402&q=${inputValue.trim()}&days=14`
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

export { handleSubmit };
