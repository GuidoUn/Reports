import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Reportes from './Screens/Reportes';
import Ajustes from './Screens/Ajustes';
import Login from './Screens/Login';
import Registrarse from './Screens/Registrarse';
import Home from './Screens/Home';
import ReportesPrueba from './Screens/ReportesPrueba';
import RecuperarPass from './Screens/RecuperarPass';
import MapaScreen from './Screens/map'
import MapaBlind from './Screens/map1'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  ReportesScreen: {
    screen: Reportes
  },
  Ajustes: {
    screen: Ajustes
  },
  Login: {
    screen: Login
  },
  Registrarse: {
    screen: Registrarse
  },
  ReportesPrueba: {
    screen: ReportesPrueba
  },
  RecuperarPass: {
    screen: RecuperarPass
  },
  MapaScreen: {
    screen: MapaScreen
  },
  MapaBlind: {
    screen: MapaBlind
  },
},
  {
    initialRouteName: "MapaScreen"
  }
);

console.disableYellowBox = true;

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  direc: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  ciudad: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  pais: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5
  },
  textButton: {
    textAlign: 'center',
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    marginBottom: 15,
    borderWidth: 2
  },
  textArea: {
    height: 60
  }
});
