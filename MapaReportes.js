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
import Reportes from './Reportes';
import MapView from 'react-native-maps';
import ToggleSwitch from 'toggle-switch-react-native';
import SwitchToggle from 'react-native-switch-toggle';
import Switch from 'react-native-switch-pro';


export default class MapaReportes extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }
    render() {
          return (
            <MapView style={{flex: 1}}
            region={{
                latitude: Reportes.state.lattext,
                longitude: Reportes.state.lontext,
                latitudeDelta: 0.015,
                longitudeDelta:0.0121,
            }}
             />
          )
        }
}