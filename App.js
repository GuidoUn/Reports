import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Reportes from './Reportes';
import Ajustes from './Ajustes';
import MapaReportes from './MapaReportes';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('ReportesScreen')}><Text style={styles.textButton}>Realizar un reporte</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Ajustes')}><Text style={styles.textButton}>Ajustes</Text></TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('MapaReportes')}><Text style={styles.textButton}>Prueba MapaReportes</Text></TouchableHighlight>
      </View>
    )
  }
}
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  ReportesScreen: {
    screen: Reportes
  },
  MapaReportes: {
    screen: MapaReportes
  },
  Ajustes: {
    screen: Ajustes
  }
},
  {
    initialRouteName: "Home"
  }
);

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
    marginBottom:10,
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
