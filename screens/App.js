import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import AirQuality from './AirQuality';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* Define your screens and their names */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AQI"
        component={AirQuality}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})