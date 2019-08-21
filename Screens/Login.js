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
//import { CheckBox } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from "react-native-modal";

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      passInput: '',
      modalPass: false,
      checked: true,
    }
  }

  changeUserInput(userInput) {
    this.setState({ userInput })
  }

  changePassInput(passInput) {
    this.setState({ passInput })
  }

  loginPressed() {
    alert('Usuario: ' + this.state.userInput + ' Contraseña: ' + this.state.passInput)
    fetch('http://10.10.6.112:3000/api/obstaculos/creo', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        /*
        .then((response) =>
        
        )
        */
        .then((responseData) => {
          console.log('RESULTS HERE:', responseData)
          
          this.setState({
            dataSource: responseJson,
          });
        })
        .catch((error) => {
          console.error(error);
          alert('Se produjo un error logueando')
        })
  }

  recuperarPass() {
    this.setState({ modalPass: true })
  }

  cerrarModalPass() {
    this.setState({ modalPass: false })
  }

  mailRecuperarPass() {
    alert('se debería enviar mail de recuperación')
    this.cerrarModalPass();
  }

  goToRecuperarPass() {
    this.props.navigation.navigate('RecuperarPass')
  }

  goToRegistrarse() {
    this.props.navigation.navigate('Registrarse')
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Log-In</Text>
          <TextInput
            style={styles.input}
            placeholder=" Usuario o correo electrónico"
            value={this.state.userInput}
            onChangeText={(userInput) => this.changeUserInput(userInput)}
          />
          <TextInput
            style={styles.input}
            placeholder=" Contraseña"
            value={this.state.passInput}
            secureTextEntry
            onChangeText={(passInput) => this.changePassInput(passInput)}
          />
          <CheckBox
            style={styles.checkbox}
            left
            rightText='Recordarme'
            onClick={() => this.setState({ checked: !this.state.checked })}
            isChecked={this.state.checked}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.loginPressed()}
          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.goToRecuperarPass()}
          >
            <Text style={styles.textButton}>Recuperar contraseña</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.goToRegistrarse()}
          >
            <Text style={styles.textButton}>Registrarse</Text>
          </TouchableHighlight>

          <Modal isVisible={this.state.modalPass}>
            <View style={styles.containerModal}>
              <Text style={styles.title}>Recuperar Contraseña</Text>
              <Text style={styles.modalText}>Ingresar Email</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={this.state.userInput}
                onChangeText={(userInput) => this.changeUserInput(userInput)}
              />
              <View style={styles.containerButtons}>
                <TouchableHighlight
                  style={styles.button3}
                  onPress={() => this.cerrarModalPass()}
                >
                  <Text style={styles.textButton}>cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button4}
                  onPress={() => this.mailRecuperarPass()}
                >
                  <Text style={styles.textButton}>Enviar Email</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDCDCD',
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  containerModal: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 175,
    marginBottom: 175,
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
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#787FF6',
    height: 50,
    marginTop: 7,
    padding: 15,
    marginBottom: 7,
  },
  modalText: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5
  },
  textButton: {
    textAlign: 'center',
    color: '#787FF6',
  },
  input: {
    height: 50,
    borderColor: '#CDCDCD',
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
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
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5,
  },
  button3: {
    backgroundColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 30
  },
  button4: {
    backgroundColor: 'green',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 30
  },
  checkbox: {
    backgroundColor: '#CDCDCD',
    height: 35,
  },
});