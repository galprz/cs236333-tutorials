import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './MainScreen';
import HelloScreen from './HelloScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
  Hello: {screen: HelloScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
