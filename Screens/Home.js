import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableHighlight,
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: this.props.navigation.state.params.userEmail,
      not: this.props.navigation.state.params.notificaciones,
      ajustes: {
        notificaciones: this.props.navigation.state.params.notificaciones,
        modoCiego: this.props.navigation.state.params.modoCiego,
        modoNoche: this.props.navigation.state.params.modoNoche,
        sonido: this.props.navigation.state.params.sonido,
      }
    };
  }


  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../Images/fondo.png')} style={{
          width: '110%', height: '100%', flex: 1,
          paddingLeft: 15,
          paddingRight: 15,
          alignItems: 'center',
        }}>
          <TouchableHighlight style={styles.button2} onPress={() => navigate('Ajustes')}><Text style={styles.textButton}>Ajustes</Text></TouchableHighlight>
          <TouchableHighlight style={styles.button2} onPress={() => navigate('Login')}><Text style={styles.textButton}>Login</Text></TouchableHighlight>
          <TouchableHighlight style={styles.button2} onPress={() => navigate('Registrarse')}><Text style={styles.textButton}>Registrarse</Text></TouchableHighlight>
          <TouchableHighlight style={styles.button2} onPress={() => navigate('ReportesPrueba')}><Text style={styles.textButton}>Reportes</Text></TouchableHighlight>
          <TouchableHighlight style={styles.button2} onPress={() => navigate('MapaScreen', { modoCiego: this.props.navigation.state.params.modoCiego, modoCiego: this.props.navigation.state.params.modoNoche })}><Text style={styles.textButton}>Ir al mapa</Text></TouchableHighlight>
          {/*<TouchableHighlight style={styles.button2} onPress={() => navigate('MapaBlind')}><Text style={styles.textButton}>Mapa en modo ciego</Text></TouchableHighlight>}*/}
        </ImageBackground>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',

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
    alignItems: 'center',
    height: 40,
    width: 226,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 2
  },
  textButton: {
    textAlign: 'center',
    color: 'black',
    marginTop: 8,
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
