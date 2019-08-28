import React from 'react';
import { Platform, StyleSheet, Text, View, Button, Component, Animated, Dimensions } from 'react-native';
import { Callout, Notifications, Speech } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Constants from 'expo-constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from './MapViewDirections';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const EXAMPLES = [
  { language: 'es', text: 'Ten cuidado dentro de muy poco hay un obstaculo' },
  { language: 'es', text: 'Ten cuidado en los proximos metros hay un obstaculo' },
  { language: 'en', text: 'Charlie Cheever chased a chortling choosy child' },
  { language: 'en', text: 'Adam Perry ate a pear in pairs in Paris' },
];
const GOOGLE_MAPS_APIKEY = 'AIzaSyDcCRO3-f2sklPcIz-hUwdxiEpwbXiWwBg';

const COORDS = [
  { lat: 42, lon: -87 },
  { lat: 42.1, lon: -87 },
  { lat: 42.2, lon: -87 },
  { lat: 42.3, lon: -87 },
  { lat: 42.4, lon: -87 }
];
const showAnimation = "fadeInDownBig"
const hideAnimation = "fadeOutUpBig"
export default class Map extends React.Component {

  // state
  state = {
    address: null,
    coordinates: null,
    mapRegion: null,
    mapRegioinit: null,
    latitude: 37.78825,
    longitude: -122.4324,
    errorMessage: null,
    posicionessx: [],
    todoslosobs: [],
    distancia: [],
    flag: true,
    selectedExample: EXAMPLES[0],
    inProgress: false,
    pitch: 1,
    rate: 0.75,
    serach: '',
    show: false,
    anim: false,
    coordinates: [
      {
        latitude: 1,
        longitude: 1,
      },
      {
        latitude: 1,
        longitude: 1,
      }
    ],
    hola: [
      {
        latitude: 1,
        longitude: 1,
      },
      {
        latitude: 1,
        longitude: 1,
      }
    ],

    markers: [{
      title: 'hello',
      coordinates: {
        latitude: null,
        longitude: null
      },
    },
    {
      title: 'hello',
      coordinates: {
        latitude: null,
        longitude: null
      },
    }]
  };
  updateSearch = serach => {
    this.setState({ serach });
  };
  static navigationOptions = {
    tabBarLabel: 'Menu'

  }
  _handleMapRegionChange = mapRegion => {
    if (!this.state.flag) {
      console.log(mapRegion);
      this.setState({ mapRegion });
      this.toggle();
    }
  };
  toggle = () => {
    if (!this.state.show)
      this.setState({
        show: true,
        anim: true
      })
    else {
      this.setState({
        anim: true
      })
      setTimeout(() => this.setState({
        show: false
      }), 500)
    }

  }
  onMapPress = (e) => {
    if (this.state.coordinates.length == 2) {
      this.setState({
        coordinates: [
          e.nativeEvent.coordinate,
        ],
      });
    } else {
      this.setState({
        coordinates: [
          ...this.state.coordinates,
          e.nativeEvent.coordinate,
        ],
      });
    }
  }
  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    });
  }
  //pide permisos
  componentWillMount() {
    this.tomartodosobjs();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  //toma la ubicacion
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });

    }


    let location = await Location.getCurrentPositionAsync({});
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });

    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    if (this.state.flag) {
      console.log("sirve");
      this.setState({ flag: false });
      this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
    }


  }

  distanciaentreobs() {
    console.log(this.distance(this.state.latitude, this.state.longitude, -34.564112, -58.489167, "K"));
    this._getLocationAsync();

    fetch(`http://10.10.32.4:3000/api/obstaculos?locationlat=${this.state.latitude}&locationlng=${this.state.longitude}`, {

      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {

        const arrayOfPosition = responseJson.obstaculos.map((obstacle) => {
          const latitud = obstacle.location.coordinates[0];
          const longitud = obstacle.location.coordinates[1];
          return { latitud, longitud };
        });
        this.setState({
          posicionessx: arrayOfPosition,
        });

      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });

    for (var i = 0; i < this.state.posicionessx.length; i++) {

      this.setState({ distancia: this.distance(this.state.latitude, this.state.longitude, this.state.posicionessx[i].latitud, this.state.posicionessx[i].longitud, "K") })
      if (this.state.distancia[i] < 50) {
        this.setState({ selectedExample: EXAMPLES[1] });
        this._speak;

      }
      else {
        this.setState({ selectedExample: EXAMPLES[0] });
        this._speak;
      }
    }
  }
  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 * 1000 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }
  tomartodosobjs() {
    fetch(`http://10.10.32.4:3000/api/obstaculos/todos`, {

      method: 'GET',
    })
      .then((response) => response.json())

      .then((responseJson) => {
        const arrayOfPosition = responseJson.map((obstacle) => {
          const latitude = obstacle.location.coordinates[0];
          const longitude = obstacle.location.coordinates[1];
          return { latitude, longitude };
        });

        console.log(arrayOfPosition);
        this.setState({
          todoslosobs: arrayOfPosition,
        });

      }).catch(function (error) {
        // ADD THIS THROW error
        throw error;
      });



  }
  //refreshea la ubicacion 6
  componentDidMount() {

    this.interval = setInterval(() => this.setState({ Location: this.distanciaentreobs() }), 10000);
  }

  render() {

    const allCoords = COORDS.map(c => ({
      geometry: {
        coordinates: [c.lon, c.lat]
      }
    }));





    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.latitude) {
      text = JSON.stringify(this.state.latitude);
      text2 = JSON.stringify(this.state.longitude);

    }
    const { firstQuery } = this.state.serach;
    return (
      <View style={styles.container}>
        {!this.state.show &&
          <Animatable.View style={styles.searchbarview} animation={this.state.anim ? showAnimation : hideAnimation}>
            <GooglePlacesAutocomplete
              style={{ backgroundColor: '#fff' }}
              placeholder='Search'
              minLength={5} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                const { lat, lng } = details.geometry.location;
                this.setState({
                  hola: [

                    {
                      latitude: lat,
                      longitude: lng,
                    },
                  ],
                  coordinates: [

                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    },
                    {
                      latitude: lat,
                      longitude: lng,
                    },
                  ],
                });
              }}


              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_MAPS_APIKEY,
                language: 'es', // language of the results
                componentRestrictions: { country: "ar" }

              }}

              styles={{
                textInputContainer: {
                  width: '100%',
                  borderWidth: 0,
                  backgroundColor: '#fff',
                  borderColor: '#fff',
                  marginBottom: 0,
                  opacity: 0.9,
                  borderRadius: 15

                },
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#fff',
                  opacity: 0.9,
                  borderRadius: 15
                },



              }}

              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                rankby: 'distance',
              }}

              renderRightButton={() => <Ionicons name="ios-pin" size={28} color="#d2d1d1" style={{ marginTop: 7, marginRight: 15 }} />}
              renderLeftButton={() => <Ionicons name="md-navigate" size={28} color="#787ff6" style={{ marginTop: 7, marginLeft: 10 }} />}

              debounce={700} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
          </Animatable.View>}
        <MapView
          style={{ alignSelf: 'stretch', height: 400, flex: 1, zIndex: -1 }}
          initialRegion={this.state.mapRegion}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onRegionChangeComplete={this._handleMapRegionChange}
          onRegionChange={this.toggle}
          ref={c => this.mapView = c}
          //onPress={this.onMapPress}
          loadingEnabled={true}
        >
          {this.state.hola.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> // eslint-disable-line react/no-array-index-key
          )}
          {this.state.todoslosobs.map((coordinate, index) =>

            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> // eslint-disable-line react/no-array-index-key
          )}
          {(this.state.coordinates.length === 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              destination={this.state.coordinates[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={this.onReady}
              onError={this.onError}
            />
          )}

        </MapView>
        {!this.state.show &&
          <Animatable.View style={{
            position: 'absolute', alignItems: 'center', top: 40,
            marginLeft: 150,
          }} animation={this.state.anim ? showAnimation : hideAnimation}>
            <View style={styles.viewbottonhome} >

            </View>
          </Animatable.View>}
      </View>

    );
  }
  _speak = () => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(this.state.selectedExample.text, {
      language: this.state.selectedExample.language,
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewbottonhome: {

    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    top: 600,
    marginLeft: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  searchbarview: {
    width: 300,
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    top: 40,
    marginLeft: 150,
  }
});
