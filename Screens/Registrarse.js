import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Picker,
  Platform
} from 'react-native';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from "react-native-modal";



export default class Login extends React.Component {
  constructor (){
    super()
    this.state = {
      createUserInput: '',
      createMailInput:'',
      createPassInput:'',
    }
  }
  
  changeCreateUserInput(createUserInput) {
    this.setState({ createUserInput })
  }

  changeCreateMailInput(createMailInput) {
    this.setState({ createMailInput })
  }

  changeCreatePassInput(createPassInput) {
    this.setState({ createPassInput })
  }

  createPressed() {
    alert('Usuario creado: '+this.state.createUserInput + ' Email creado: '+this.state.createMailInput + ' Contraseña creada: '+this.state.createPassInput)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Registro</Text>
          <Text>Nombre de usuario</Text>
          <TextInput
              style={styles.input}
              placeholder=""
              value={this.state.createUserInput}
              onChangeText={(createUserInput) => this.changeCreateUserInput(createUserInput)}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={this.state.createMailInput}
              onChangeText={(createMailInput) => this.changeCreateMailInput(createMailInput)}
            />
            <Text>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={this.state.createPassInput}
              secureTextEntry
              onChangeText={(createPassInput) => this.changeCreatePassInput(createPassInput)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.createPressed()}
            >
              <Text style={styles.textButton}>Crear cuenta</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

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
    backgroundColor: 'lightblue',
    marginTop: 20,
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
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
});