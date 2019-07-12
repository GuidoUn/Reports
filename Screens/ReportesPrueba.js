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
      coordinate: {
        latitude: '',
        longitude: ''
      },
      marcaCambiada: false,
      coordinateCambiada: {
        latitude: '',
        longitude: '',
      }
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
    /*
if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {*/
    this._getLocationAsync();
    //}
    let lattext = 'Waiting..';
    let lontext = 'Waiting..';
    if (this.state.errorMessage) {
      lattext = this.state.errorMessage;
    } else if (this.state.latitude) {
      lattext = JSON.stringify(this.state.latitude);
      lontext = JSON.stringify(this.state.longitude);
    }
  }

  abrirMapa = () => {
    if (this.state.latitude && this.state.longitude) {
      if (this.state.coordinate.latitude == '') {
        this.state.coordinate.latitude = this.state.latitude;
        this.state.coordinate.longitude = this.state.longitude;
      }
      this.setState({ mapaAbierto: true })
    }
    else {
      alert('Espere mientras tomamos su ubicación')
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
  render() {

    let lattext = 'Waiting..';
    let lontext = 'Waiting..';
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
      }

    }
    /*
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Formulario de reportes</Text>
          <Text>Tipo de obstáculo</Text>
          <Picker
            style={{ width: '100%' }}
            selectedValue={this.state.PickerValue}
            onValueChange={(itemValue, itemIndex) => this.setState
              ({ PickerValue: itemValue })}
          >
            <Picker.Item label="Seleccionar" value="" />
            <Picker.Item label="Transitable" value="leve" />
            <Picker.Item label="Parcialmente Transitable" value="parcial" />
            <Picker.Item label="Intransitable" value="total" />
          </Picker>
          <TouchableHighlight
          style={styles.button2}
          onPress={() => this.abrirMapa()}
        >
          <Text style={styles.textButton}>Seleccionar ubicación en el mapa</Text>
        </TouchableHighlight>
        <Modal isVisible={this.state.mapaAbierto}>
        
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={{flex: 10}}
          region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0015,
              longitudeDelta:0.0015,
          }}>
            <Marker draggable
              coordinate={this.state.coordinate}
              onDragEnd={(e) => this.setState({ coordinateCambiada: e.nativeEvent.coordinate })}
          />
          </MapView>
           <View style={styles.containerButtons}>
           <TouchableHighlight
          style={styles.button3}
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
   
          <Text>Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder=" Libertador 6532"
            value={this.state.direc}
            onChangeText={(direc) => this.changeDirec(direc)}
          />
          <Text>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder=" CABA"
            value={this.state.ciudad}
            onChangeText={(ciudad) => this.changeCiudad(ciudad)}
          />
          <Text>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder=" Argentina"
            value={this.state.pais}
            onChangeText={(pais) => this.changePais(pais)}
          />
 
          <Text>Comentarios</Text>
          <TextInput
            multiline={true}
            style={[styles.input, styles.textArea]}
            placeholder=" Pozo profundo"
            value={this.state.comment}
            onChangeText={(comment) => this.changeComment(comment)}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.buttonPressed()}
          >
            <Text style={styles.textButton}>Reportar</Text>
          </TouchableHighlight>
          <Text style={styles.paragraph}>{lattext}</Text>
          <Text style={styles.paragraph}>{lontext}</Text>
        </View>
      </View>
    )
    */
    return (
      <View style={styles.container}>
<Text style={styles.title}>Formulario de reportes</Text>
        <Swiper style={styles.wrapper} showsButtons={true} height={200} horizontal={true}>
          <View style={styles.slide1}>
            <Text>Tipo de obstáculo</Text>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        {/*
        <Swiper style={styles.wrapper} height={240}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          activeDot={<View style={{ backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            {/*<Image resizeMode='stretch' style={styles.image} source={require('./img/1.jpg')} />*/}
        {/*}
          </View>
          */}
        {/*}
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            {/*<Image resizeMode='stretch' style={styles.image} source={require('./img/2.jpg')} />*/}
        {/*
          </View>
          */}
        {/*
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            {/*<Image resizeMode='stretch' style={styles.image} source={require('./img/3.jpg')} /> */}
        {/*
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            {/*<Image resizeMode='stretch' style={styles.image} source={require('./img/4.jpg')} />*}
          </View>
        </Swiper>
          */}
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
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
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
  textArea: {
    height: 60
  }
});
export default Reportes;
