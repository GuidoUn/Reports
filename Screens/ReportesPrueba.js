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
      oneClicked: false,
      twoClicked: false,
      threeClicked: false,
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

  pressedLeve(){
    this.setState({ PickerValue: 'leve' })
    styles.buttonSlide11={
      backgroundColor: 'black',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
  }

  pressedParcial() {
    this.setState({PickerValue: 'parcial'})
    styles.buttonSlide11={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12={
      backgroundColor: 'black',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
  }

  pressedTotal() {
    this.setState({PickerValue: 'total'})
    styles.buttonSlide11={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide12={
      backgroundColor: 'blue',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
    }
    styles.buttonSlide13={
      backgroundColor: 'black',
      marginTop: 10,
      justifyContent: 'center',
      width: 250,
      height: 130
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de reportes</Text>
        <Swiper style={styles.wrapper} showsButtons={false} height={500} horizontal={true}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text styles={styles.title}>Tipo de obstáculo</Text>
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
          <View style={{alignItems: 'center'}}>
            
            <Text style={styles.text}>Beautiful</Text>
            <View style={styles.slide2}>
            <TouchableHighlight
              style={styles.buttonSlide21}
            >
              <Text style={styles.textButton}>Transitable</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonSlide22}
            >
              <Text style={styles.textButton}>Parcialmente Transitable</Text>
            </TouchableHighlight>
          </View>  
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
    marginTop: 175,
    marginRight:5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 150
  },
  buttonSlide22: {
    backgroundColor: 'blue',
    marginTop: 175,
    marginRight:5,
    marginLeft: 5,
    justifyContent: 'center',
    width: 125,
    height: 150
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
  textArea: {
    height: 60
  }
});
export default Reportes;
