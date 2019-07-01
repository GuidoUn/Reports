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
import ToggleSwitch from 'toggle-switch-react-native';
import SwitchToggle from 'react-native-switch-toggle';
import Switch from 'react-native-switch-pro';


class Ajustes extends React.Component {
  constructor() {
    super()
    this.state = {
      PickerNot: '',
    };
  }
  state={
    value: false,
    value1: true
  }

    render() {
          return (
            <View style={styles.container}>
              <Text style={styles.title}>Ajustes</Text>
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Modo ciego</Text>
              <Switch width={60}
                height={30}
                label={2} 
                value={this.state.value} 
                style={{position: 'absolute', left: '75%', top: '50%'}} 
                onSyncPress={(value) => this.setState({value})} />              
              </View>
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Modo noche</Text>
              <Switch width={60}
                height={30}
                label={2} 
                value={this.state.value} 
                style={{position: 'absolute', left: '75%', top: '50%'}} 
                onSyncPress={(value) => this.setState({value})} />              
              </View>
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Notificaciones</Text>
              <Picker
              style={{ width: '55%', position: 'absolute', left: '50%', top: '30%'}}
              selectedValue={this.state.PickerNot}
              onValueChange={(itemValue, itemIndex) => this.setState
                ({ PickerNot: itemValue })}
              >
              <Picker.Item label="Seleccionar" value="" />
              <Picker.Item label="Nunca" value="nunca" />
              <Picker.Item label="Semanalmente" value="semanal" />
              <Picker.Item label="Diariamente" value="diario" />
            </Picker>             
              </View>
            </View>
          )
        }
}
export default Ajustes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  rowContainer: {
    flexDirection: 'row'
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
    fontSize: 30,
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
