import React from 'react';
import {
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
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button onPress={() => this.props.navigation.navigate('Test')} title="Hacer un reporte"></Button>
      </View>
    )
  }
}

class Test extends React.Component {
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
  buttonPressed() {
    if (this.state.comment && this.state.PickerValue != "") {
      /*
      fetch('https://10.10.6.9:3000/api/obstaculos/', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationLat: this.state.latitude,
          locationLng: this.state.longitude,
          description: this.state.comment,
          photo: "foto",
          clasification: "total"
        })
      }).catch(error => {
        console.log(error);
      })
      */
      fetch('https://10.10.6.9:3000/api/obstaculos/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationLat: this.state.latitude,
          locationLng: this.state.longitude,
          description: this.state.comment,
          photo: "foto",
          clasification: "total"
        })
      })

        .then((response) => response.json())
        .then((responseData) => {
          console.log("RESULTS HERE:", responseData)

          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function () {

          });
        })
        .catch((error) => {
          console.error(error);
        })
      alert('Se ha efectuado el reporte')
    } else {
      alert('Por favor complete todos los campos')
    }

  }
  componentWillMount() {
    /*
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    */
    //} else {
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
    /*
    Geocoder.from(lattext, lontext)
		.then(json => {
      var addressComponent = json.results[0].formatted_address;
      console.log(addressComponent);
 
		})
    .catch(error => console.warn(error));
    */
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
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ Location: this._getLocationAsync() }), 1000);
  }

  render() {

    let lattext = 'Waiting..';
    let lontext = 'Waiting..';
    if (this.state.errorMessage) {
      lattext = this.state.errorMessage;
    } else if (this.state.latitude) {
      lattext = JSON.stringify(this.state.latitude);
      lontext = JSON.stringify(this.state.longitude);

    }
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
            <Picker.Item label="Transitable" value="Transitable" />
            <Picker.Item label="Parcialmente Transitable" value="Parcialmente Transitable" />
            <Picker.Item label="Intransitable" value="intransitable" />
          </Picker>
          <TouchableHighlight
            style={styles.button2}
          //onPress={() => this.buttonPressed()}
          >
            <Text style={styles.textButton}>Seleccionar ubicación en el mapa</Text>
          </TouchableHighlight>
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
  }
}

const AppNavigator = createStackNavigator({
  Home: Home,
  Test: Test
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
    backgroundColor: 'red',
    paddingTop: 15,
    paddingBottom: 15
  },
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5
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
