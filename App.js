import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';

import * as Location from "expo-location";

export default function App() {


  const [cityInput, setcityInput] = useState("karachi");


  const [cityName, setCityName] = useState("");
  const [weather, setweather] = useState("");
  const [degree, setdegree] = useState("");
  const [countryName, setcountryName] = useState("");
  const [windSpeed, setwindSpeed] = useState("");
  const [realfeel, setrealfeel] = useState("");
  const [minimum, setminimum] = useState("");
  const [maximum, setmaximum] = useState("");
  const [air, setair] = useState("");
  const [humidity, sethumidity] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(()=> {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    });

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput || location}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`)
      .then(resp => {
        console.log("resp: ", resp.data);
        const completeResponse = resp.data;
        setCityName(completeResponse.name)
        setweather(completeResponse.weather[0].main);
        setdegree(completeResponse.main.temp);
        setcountryName(completeResponse.sys.country);
        setwindSpeed(completeResponse.wind.speed);
        setrealfeel(completeResponse.main.feels_like);
        setminimum(completeResponse.main.temp_min);
        setmaximum(completeResponse.main.temp_max);
        setair(completeResponse.main.pressure);
        sethumidity(completeResponse.main.humidity);
      })
  },[cityInput])




  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setcityInput}
        value={cityInput}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text>{cityName}</Text>
      <Text>{weather}</Text>
      <Text>{degree} Degree</Text>
      <Text>{countryName}</Text>
      <Text>{windSpeed}</Text>
      <Text>{realfeel}</Text>
      <Text>{minimum}</Text>
      <Text>{maximum}</Text>
      <Text>{air}</Text>
      <Text>{humidity}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});