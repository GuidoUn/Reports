import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableHigh,
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
import { takeSnapshotAsync } from 'expo';

class Reportes extends React.Component {
  constructor() {
    super()
    this.state = {
      paginationIndex: 0,
      swiper: undefined,
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
      PermissionLocationAsked: 0,
      Type: Camera.Constants.Type.back,
      previewUri: undefined,
      previewBase64: undefined,
    };
  }

  slide(amount) {
    console.log('NO LES MINTIERON');
    this.state.swiper.scrollBy(this.state.paginationIndex + amount);
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
    console.log('reportando');
    fetch('http://10.8.5.20:3000/api/obstaculos/creo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationLat: sendLatitude,
        locationLng: sendLongitude,
        description: this.state.comment,
        photo: this.state.previewBase64,
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
        console.log(error);
        alert('Se produjo un error efectuando un reporte')
      })
  }

  pressedLeve() {
    this.setState({ PickerValue: 'leve' })
    styles.buttonSlide11 = {
      backgroundColor: 'lightblue',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide12 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide13 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
  }

  pressedParcial() {
    this.setState({ PickerValue: 'parcial' })
    styles.buttonSlide11 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide12 = {
      backgroundColor: 'lightblue',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide13 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
  }

  pressedTotal() {
    this.slide(1);
    this.setState({ PickerValue: 'total' })
    styles.buttonSlide11 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide12 = {
      backgroundColor: 'white',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
    styles.buttonSlide13 = {
      backgroundColor: 'lightblue',
      marginTop: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: 37,
    }
  }

  tipoPressed(tipo) {
    this.setState({ tipoObstaculo: tipo })
    this.screen2blue();

    console.log('SOY JEJEJEJE MILEI');
    this.slide(1);

    if (tipo == 'Obra') {
      styles.buttonSlide21 = {
        backgroundColor: 'lightblue',

        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        marginTop: 200,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 142,
        height: 142,
        borderRadius: 37,

      }
    } else if (tipo == 'Pozo') {
      styles.buttonSlide22 = {
        backgroundColor: 'lightblue',

        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        marginTop: 200,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 142,
        height: 142,
        borderRadius: 37,

      }
    } else if (tipo == 'noLuz') {
      styles.buttonSlide23 = {
        backgroundColor: 'lightblue',

        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        marginTop: 150,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        width: 142,
        height: 142,
        borderRadius: 37,

      }
    } else if (tipo == 'Otro') {
      styles.buttonSlide24 = {
        backgroundColor: 'lightblue',

        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
        marginTop: 150,
        justifyContent: 'center',
        width: 142,
        height: 142,
        borderRadius: 37,

      }
    }

  }

  screen2blue() {
    styles.buttonSlide21 = {
      backgroundColor: 'white',
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      marginTop: 200,
      width: 142,
      height: 142,
      borderRadius: 37,
    }
    styles.buttonSlide22 = {
      backgroundColor: 'white',
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      marginTop: 200,
      width: 142,
      height: 142,
      borderRadius: 37,
    }
    styles.buttonSlide23 = {
      backgroundColor: 'white',
      marginTop: 150,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      width: 142,
      height: 142,
      borderRadius: 37,
    }
    styles.buttonSlide24 = {
      backgroundColor: 'white',
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
      marginTop: 150,
      width: 142,
      height: 142,
      borderRadius: 37,
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
      const photo = this.camera.takePictureAsync({ base64: true }).then((data) => {
        const previewBase64 = data.base64;
        this.setState({ previewBase64 });
        alert('Fotografía tomada con éxito');
      }).catch((err) => {
        console.error(err);
        alert('There was an error taking the picture');
      });
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
    if (this.state.PermissionLocationAsked == 0) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      this.setState({ hasLocationPermission: status === 'granted', PermissionLocationAsked: 1 })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
          PermissionLocationAsked: 0,
        });
      }
    }


    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };
  _getCameraPermissionAsync = async () => {
    if (this.state.PermissionCameraAsked == 0) {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted', PermissionCameraAsked: 1 })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access camera was denied',
          PermissionCameraAsked: 0,
        });
      }
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

      <View style={styles.container} accessible={true}>
        <ImageBackground source={require('../Images/back1.jpeg')} style={{ width: '100%', height: '100%' }}>
          <Text style={styles.title} accessibilityLabel="Realizando un reporte">Realizando un reporte</Text>
          <Swiper loop={false} ref={swiper => this.state.swiper = swiper} style={styles.wrapper} showsButtons={true} height={500} horizontal={true}
            showsPagination={true} paginationStyle={{ marginBottom: 10 }} onIndexChanged={index => this.state.paginationIndex = index} >

            <View style={{ alignItems: 'center' }} accessible={true}>

              <Text style={styles.text} accessibilityLabel="Qué tipo de obstáculo es">¿Qué tipo de obstáculo es?</Text>
              <View style={styles.slide2} accessible={true}>
                <TouchableOpacity

                  accessibilityLabel="Obra en construcción"
                  style={styles.buttonSlide21}
                  onPress={() => this.tipoPressed('Obra')}
                >
                  <ImageBackground source={require('../Images/cono.png')} style={{ width: '75%', height: '75%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 32 }}>
                    <Text style={styles.textButton1}>Obra en construcción</Text>
                  </ImageBackground>
                  {//<}
                  }</TouchableOpacity>
                <TouchableOpacity style={styles.buttonSlide22}
                  accessibilityLabel="Pozo o daño en la vereda"
                  onPress={() => this.tipoPressed('Pozo')}
                >
                  <ImageBackground source={require('../Images/barrera.png')} style={{ width: '75%', height: '75%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 32 }}>
                    <Text style={styles.textButton1}>Pozo o daño en la vereda</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.slide23} accessible={true}>
                <TouchableOpacity
                  style={styles.buttonSlide23}
                  accessibilityLabel="Calle sin iluminación nocturna"
                  onPress={() => this.tipoPressed('noLuz')}
                >
                  <ImageBackground source={require('../Images/luz.png')} style={{ width: '75%', height: '75%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 32 }}>
                    <Text style={styles.textButton1}>Calle sin iluminación</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSlide24}
                  onPress={() => this.tipoPressed('Otro')}
                  accessibilityLabel="Otro tipo de obstáculo"
                >
                  <ImageBackground source={require('../Images/otro.png')} style={{ width: '75%', height: '75%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 32 }}>
                    <Text style={styles.textButton1}>Otro</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{
              //justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
              <Text styles={styles.textEspecial} accessibilityLabel="Cuando transitable es?">¿Es transitable?</Text>
              <TouchableOpacity
                style={styles.buttonSlide11}
                onPress={() => this.pressedLeve()}
                accessibilityLabel="Es Transitable"
              >
                <ImageBackground source={require('../Images/transitable.png')} style={{ width: '70%', height: '90%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 32, marginTop: 15 }}>
                </ImageBackground>


              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSlide12}
                onPress={() => this.pressedParcial()}
                accessibilityLabel="Es parcialmente transitable"
              >
                <ImageBackground source={require('../Images/parcialtransitable.png')} style={{ width: '80%', height: '90%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 23, marginTop: 15 }}>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSlide13}
                onPress={() => this.pressedTotal()}
                accessibilityLabel="Instrasitable"
              >
                <ImageBackground source={require('../Images/nopasar.png')} style={{ width: '70%', height: '90%', /*alignItems: 'center', justifyContent: 'center',*/ marginLeft: 30, marginTop: 15 }}>
                </ImageBackground>

              </TouchableOpacity>
            </View>

            <View style={{
              //justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }} accesible={true}>
              <Text styles={styles.text}>Ubicación</Text>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.abrirMapa()}
                accessibilityLabel="Abrir mapa para seleccionar la ubicación del obstáculo"
              >
                <Text style={styles.textButton}>{this.state.mensajeUbicacion}</Text>
              </TouchableOpacity>
              <Modal isVisible={this.state.mapaAbierto}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ flex: 10 }}
                  initialRegion={{
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
                <View style={styles.containerButtons} accesible={true}>
                  <TouchableOpacity
                    style={styles.buttonMapClose}
                    onPress={() => this.cerrarMapa()}
                    accessibilityLabel="Cerrar mapa"
                  >
                    <Text style={styles.textButton}>cerrar mapa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonUseMark}
                    onPress={() => this.cambiarMarca()}
                    accessibilityLabel="Confirmar ubicación del obstáculo"
                  >
                    <Text style={styles.textButton}>Utilizar marca</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              {/*<Text style={styles.paragraph}>{lattext}</Text>
              <Text style={styles.paragraph}>{lontext}</Text>*/}
              <Text styles={styles.text}>Tomar una fotografía</Text>
              <TouchableOpacity
                style={styles.buttonOpenCamera}
                onPress={() => this.setState({ camaraAbierta: true })}
                accessibilityLabel="Tomar una fotografía"
              >
                <Text style={styles.textButton}>Abrir cámara</Text>
              </TouchableOpacity>

              <Modal isVisible={this.state.camaraAbierta}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                  <Camera style={{ flex: 0.8 }} type={this.state.type} ref={ref => {
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

                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => this.snap()}
                    accessibilityLabel="Tomar fotográfia"
                  >
                    <Text style={styles.textButtonCamera}>Tomar fotografía</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonCerrarCamara}
                    onPress={() => this.setState({ camaraAbierta: false })}
                    accessibilityLabel="Cerrar cámara"
                  >
                    <Text style={styles.textButtonCamera}>cerrar cámara</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <Text styles={styles.text}>Comentarios acerca del reporte</Text>
              <TextInput
                placeholderTextColor='grey'
                multiline={true}
                style={[styles.inputBox, styles.textArea]}
                placeholder=" Pozo profundo"
                accessibilityLabel="Contamos más acerca del obstáculo"
                value={this.state.comment}
                onChangeText={(comment) => this.changeComment(comment)}

              />
            </View>

            <View style={{
              //justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
              <TouchableOpacity
                style={styles.buttonReport}
                onPress={() => this.buttonPressed()}
                accessibilityLabel="Confirmar Reporte"
              >
                <Text style={styles.textButtonReport}>Reportar</Text>
              </TouchableOpacity>
            </View>
          </Swiper>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  text: {
    marginTop: 15,
  },
  textEspecial: {
    marginTop: 150,
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
    marginTop: 55,
    fontSize: 22,
    marginBottom: 15
  },
  button: {
    backgroundColor: 'red',
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonReport: {
    height: 50,
    width: 225,
    borderRadius: 90,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 150,
    marginBottom: 15,
    borderWidth: 2,
  },
  button2: {
    height: 40,
    width: 226,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 2
  },
  imageButton: {
    height: 40,
    width: 226,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 55,
    borderWidth: 2,
    alignItems: 'center',

  },
  buttonOpenCamera: {
    height: 40,
    width: 226,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 2
  },
  buttonCerrarCamara: {
    backgroundColor: 'lightblue',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 22,
    height: 40,
    width: 226,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 55,
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonMapClose: {
    backgroundColor: 'lightblue',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 45,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  buttonUseMark: {
    backgroundColor: 'green',
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    height: 45,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonSlide11: {
    backgroundColor: 'white',
    marginTop: 10,
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 37,
  },
  buttonSlide12: {
    backgroundColor: 'white',
    marginTop: 10,
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 37,
  },
  buttonSlide13: {
    backgroundColor: 'white',
    marginTop: 10,
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 37,
  },
  buttonSlide21: {
    backgroundColor: 'white',
    marginTop: 200,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 142,
    height: 142,
    borderRadius: 37,
  },
  buttonSlide22: {
    backgroundColor: 'white',
    marginTop: 200,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 142,
    height: 142,
    borderRadius: 37,
  },
  buttonSlide23: {
    backgroundColor: 'white',
    marginTop: 150,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 142,
    height: 142,
    borderRadius: 37,
  },
  buttonSlide24: {
    backgroundColor: 'white',
    marginTop: 150,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 142,
    height: 142,
    borderRadius: 37,
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
    marginTop: 15,
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
    color: 'black',
    marginTop: 8,
  },
  textButtonReport: {
    textAlign: 'center',
    color: 'black',
    marginTop: 15,
  },
  textButton1: {
    textAlign: 'center',
    marginRight: 25,
    paddingTop: 75,
    color: 'black',
    marginTop: 8,
  },
  textButtonCamera: {
    textAlign: 'center',
    color: 'black',
    marginTop: 4,
  },
  input: {
    height: 40,
    marginBottom: 30,
    borderWidth: 2
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 30,
    marginTop: 15,
    marginLeft: 15,
    borderWidth: 2,
    padding: 25,
  },
  inputSlide3: {
    height: 40,
    width: 250,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 2
  },
  textArea: {
    height: 150,
    width: 250,
    textAlignVertical: 'top',
    borderRadius: 40,
  }
});
export default Reportes;
