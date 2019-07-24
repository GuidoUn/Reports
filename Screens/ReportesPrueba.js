import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from "react-native-modal";
import { Camera } from 'expo-camera';

class Reportes extends React.Component {
  constructor() {
    super()
    this.state = {
      direc: '',
      ciudad: '',
      comment: '',
      pais: '',
      PickerValue: '',
      latitude: null,
      longitude: null,
      estado: '',
      mapaAbierto: false,
      camaraAbierta: false,
      oneClicked: false,
      twoClicked: false,
      threeClicked: false,
      mensajeUbicacion: 'Cargando..',
      coordinate: {
        latitude: '',
        longitude: ''
      },
      marcaCambiada: false,
      coordinateCambiada: {
        latitude: '',
        longitude: '',
      },
      tipoObstaculo: '',
      hasCameraPermission: null,
      PermissionCameraAsked: 0,
      Type: Camera.Constants.Type.back,
    };
  }

  changeDirec(direc) {
    this.setState({ direc })
  }
  changeCiudad(ciudad) {
    this.setState({ ciudad })
  }
  changePais(pais) {
    this.setState({ pais })
  }
  changeComment(comment) {
    this.setState({ comment })
  }
  hacerFetch(sendLatitude, sendLongitude) {
    fetch('http://10.10.6.112:3000/api/obstaculos/creo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationLat: sendLatitude,
        locationLng: sendLongitude,
        description: this.state.comment,
        photo: 'foto',
        clasification: this.state.PickerValue,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('RESULTS HERE:', responseData)
        /*
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        */
        alert('Se ha efectuado el reporte');
      })
      .catch((error) => {
        console.error(error);
        alert('Se produjo un error efectuando un reporte')
      })
  }

  pressedLeve() {
    this.setState({ PickerValue: 'leve' })
    styles.buttonSlide11 = {
      backgroundColor: 'green',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
  }

  pressedParcial() {
    this.setState({ PickerValue: 'parcial' })
    styles.buttonSlide11 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12 = {
      backgroundColor: 'green',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
  }

  pressedTotal() {
    this.setState({ PickerValue: 'total' })
    styles.buttonSlide11 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12 = {
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13 = {
      backgroundColor: 'green',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
  }

  tipoPressed(tipo) {
    this.setState({ tipoObstaculo: tipo })
    this.screen2blue();
    if (tipo == 'Obra') {
      styles.buttonSlide21 = {
        backgroundColor: 'green',
        marginTop: 125,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 125,
        height: 175
      }
    } else if (tipo == 'Pozo') {
      styles.buttonSlide22 = {
        backgroundColor: 'green',
        marginTop: 125,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 125,
        height: 175
      }
    } else if (tipo == 'noLuz') {
      styles.buttonSlide23 = {
        backgroundColor: 'green',
        marginTop: 125,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 125,
        height: 175
      }
    } else if (tipo == 'Otro') {
      styles.buttonSlide24 = {
        backgroundColor: 'green',
        marginTop: 125,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 125,
        height: 175
      }
    }
  }

  screen2blue() {
    styles.buttonSlide21 = {
      backgroundColor: 'blue',
      marginTop: 125,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      width: 125,
      height: 175
    }
    styles.buttonSlide22 = {
      backgroundColor: 'blue',
      marginTop: 125,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      width: 125,
      height: 175
    }
    styles.buttonSlide23 = {
      backgroundColor: 'blue',
      marginTop: 125,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      width: 125,
      height: 175
    }
    styles.buttonSlide24 = {
      backgroundColor: 'blue',
      marginTop: 125,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      width: 125,
      height: 175
    }

  }
  buttonPressed() {
    if (this.state.comment && this.state.PickerValue != "" && this.state.marcaCambiada == false) {
      this.hacerFetch(this.state.latitude, this.state.longitude)
    } else if (this.state.comment && this.state.PickerValue != "" && this.state.marcaCambiada == true) {
      this.hacerFetch(this.state.coordinateCambiada.latitude, this.state.coordinateCambiada.longitude)
    }
    else {
      alert('Por favor complete todos los campos')
    }

  }
  componentWillMount() {
    this._getLocationAsync();
    this._getCameraPermissionAsync();
    let lattext = 'Cargando..';
    let lontext = 'Cargando..';
    if (this.state.errorMessage) {
      lattext = this.state.errorMessage;
    } else if (this.state.latitude) {

      lattext = JSON.stringify(this.state.latitude);
      lontext = JSON.stringify(this.state.longitude);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.componentWillMount(), 1000);
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };

  abrirMapa = () => {
    if (this.state.latitude && this.state.longitude) {
      if (this.state.coordinate.latitude == '') {
        this.state.coordinate.latitude = this.state.latitude;
        this.state.coordinate.longitude = this.state.longitude;
      }
      this.setState({ mapaAbierto: true })
    }
    else {
      alert('Espere mientras obtenemos su ubicación')
    }
  }

  cerrarMapa = () => {
    this.setState({ mapaAbierto: false })
  }

  cambiarMarca = () => {

    this.setState({ marcaCambiada: true, mapaAbierto: false })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };
  _getCameraPermissionAsync = async () => {
    if (this.state.PermissionCameraAsked == 0) {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' })
    }
    else if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access camera was denied',
        PermissionCameraAsked: 0,
      });
    }
  };
  render() {

    let lattext = 'Cargando..';
    let lontext = 'Cargando..';
    if (this.state.errorMessage) {
      lattext = this.state.errorMessage;
    } else if (this.state.latitude) {
      if (this.state.marcaCambiada == true) {

        lattext = JSON.stringify(this.state.latitude) + '. Reportando en: ' + this.state.coordinateCambiada.latitude;
        lontext = JSON.stringify(this.state.longitude) + '. Reportando en: ' + this.state.coordinateCambiada.longitude;
      }
      else if (this.state.marcaCambiada == false) {
        lattext = JSON.stringify(this.state.latitude) + '. Reportando en: ' + JSON.stringify(this.state.latitude);
        lontext = JSON.stringify(this.state.longitude) + '. Reportando en: ' + JSON.stringify(this.state.longitude);
        this.state.mensajeUbicacion = 'Seleccionar ubicación en el mapa';
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Realizando un reporte</Text>
        <Swiper style={styles.wrapper} showsButtons={true} height={500} horizontal={true}>
          <View style={{ alignItems: 'center' }}>

            <Text style={styles.text}>¿Qué tipo de obstáculo es?</Text>
            <View style={styles.slide2}>
              <TouchableHighlight
                style={styles.buttonSlide21}
                onPress={() => this.tipoPressed('Obra')}
              >
                <Text style={styles.textButton}>Obra en construcción</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonSlide22}
                onPress={() => this.tipoPressed('Pozo')}
              >
                <Text style={styles.textButton}>Pozo o daño en la vereda</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.slide23}>
              <TouchableHighlight
                style={styles.buttonSlide23}
                onPress={() => this.tipoPressed('noLuz')}
              >
                <Text style={styles.textButton}>Calle sin iluminación</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonSlide24}
                onPress={() => this.tipoPressed('Otro')}
              >
                <Text style={styles.textButton}>Otro</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text styles={styles.title}>¿Es transitable?</Text>
            <TouchableHighlight
              style={styles.buttonSlide11}
              onPress={() => this.pressedLeve()}
            >
              <Text style={styles.textButton}>Transitable</Text>

            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonSlide12}
              onPress={() => this.pressedParcial()}
            >
              <Text style={styles.textButton}>Parcialmente Transitable</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonSlide13}
              onPress={() => this.pressedTotal()}
            >
              <Text style={styles.textButton}>Intransitable</Text>

            </TouchableHighlight>
          </View>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text styles={styles.title}>Ubicación</Text>
            <Text style={{
              marginTop: 30,
            }}>Introducir dirección manualmente</Text>
            <TextInput
              style={styles.inputSlide3}
              placeholder=" Libertador 6532"
              value={this.state.direc}
              onChangeText={(direc) => this.changeDirec(direc)}
            />
            <TouchableHighlight
              style={styles.button2}
              onPress={() => this.abrirMapa()}
            >
              <Text style={styles.textButton}>{this.state.mensajeUbicacion}</Text>
            </TouchableHighlight>
            <Modal isVisible={this.state.mapaAbierto}>

              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 10 }}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0015,
                  longitudeDelta: 0.0015,
                }}>
                <Marker draggable
                  coordinate={this.state.coordinate}
                  onDragEnd={(e) => this.setState({ coordinateCambiada: e.nativeEvent.coordinate })}
                />
              </MapView>
              <View style={styles.containerButtons}>
                <TouchableHighlight
                  style={styles.buttonMapClose}
                  onPress={() => this.cerrarMapa()}
                >
                  <Text style={styles.textButton}>cerrar mapa</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button4}
                  onPress={() => this.cambiarMarca()}
                >
                  <Text style={styles.textButton}>Utilizar marca</Text>
                </TouchableHighlight>
              </View>
            </Modal>
            <Text style={styles.paragraph}>{lattext}</Text>
            <Text style={styles.paragraph}>{lontext}</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text styles={styles.title}>Comentarios acerca del reporte</Text>
            <TextInput
              multiline={true}
              style={[styles.input, styles.textArea]}
              placeholder=" Pozo profundo"
              value={this.state.comment}
              onChangeText={(comment) => this.changeComment(comment)}

            />
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text styles={styles.title}>Tomar una fotografía</Text>
            <TouchableHighlight
              style={styles.button2}
              onPress={() => this.setState({ camaraAbierta: true })}
            >
              <Text style={styles.textButton}>Abrir cámara</Text>
            </TouchableHighlight>
            <Modal isVisible={this.state.camaraAbierta}>
              <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
                  this.camera = ref;
                }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 0.2,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                        });
                      }}>
                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Rotar</Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
                
                <TouchableHighlight
                  style={styles.button2}
                  onPress={() => this.snap()}
                >
                  <Text style={styles.textButton}>Tomar fotografía</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonCerrarCamara}
                  onPress={() => this.setState({ camaraAbierta: false })}
                >
                  <Text style={styles.textButton}>cerrar cámara</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
        </Swiper>
      </View>
    )
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
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    backgroundColor: 'red',
    paddingTop: 15,
    paddingBottom: 15
  },
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 22,
  },
  buttonCerrarCamara: {
    backgroundColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 22,
  },
  buttonMapClose: {
    backgroundColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 30
  },
  buttonSlide11: {
    backgroundColor: 'blue',
    marginTop: 10,
    justifyContent: 'center',
    width: 250,
    height: 130
  },
  buttonSlide12: {
    backgroundColor: 'blue',
    marginTop: 10,
    justifyContent: 'center',
    width: 250,
    height: 130
  },
  buttonSlide13: {
    backgroundColor: 'blue',
    marginTop: 10,
    justifyContent: 'center',
    width: 250,
    height: 130
  },
  buttonSlide21: {
    backgroundColor: 'blue',
    marginTop: 125,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 175
  },
  buttonSlide22: {
    backgroundColor: 'blue',
    marginTop: 125,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 175
  },
  buttonSlide23: {
    backgroundColor: 'blue',
    marginTop: 125,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 175
  },
  buttonSlide24: {
    backgroundColor: 'blue',
    marginTop: 125,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 175
  },
  button4: {
    backgroundColor: 'green',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 30
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  buttonSlideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  slide2: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide23: {
    flex: 1,
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    marginBottom: 15,
    borderWidth: 2
  },
  inputSlide3: {
    height: 40,
    width: 250,
    borderColor: '#ccc',
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 2
  },
  textArea: {
    height: 400,
    width: 250,
    textAlignVertical: 'top',
  }
});
export default Reportes;
