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
      PickerNot: 'semanalmente',
      ModoCiego: 'desactivado',
      ModoNoche: 'desactivado',
      Sonido: 'activado,'
    };
  }
  state={
    valueCiego: false,
    valueNoche: false,
    valueSonido: true,
  }
  switch1Cambiado(valor){
    if(valor==false){
      this.setState({ModoCiego: 'desactivado'})
    }
    else if(valor==true){
      this.setState({ModoCiego: 'activado'})
    }
  }
  switch2Cambiado(valor){
    if(valor==false){
      this.setState({ModoNoche: 'desactivado'})
    } else if(valor==true){
      this.setState({ModoNoche: 'activado'})
    }
  }

  switch3Cambiado(valor){
    if(valor==false){
      this.setState({Sonido: 'desactivado'})
    } else if(valor==true){
      this.setState({Sonido: 'activado'})
    }
  }

  mostrarEnPantalla(){
    if(this.state.PickerNot!='nunca'){
      alert('Ajustes guardados: Modo ciego '+this.state.ModoCiego + '. Modo noche '+this.state.ModoNoche+ '. Usted recibirá notificaciones '+this.state.PickerNot+'.');
    }
    else {
      alert('Ajustes guardados: Modo ciego '+this.state.ModoCiego + '. Modo noche '+this.state.ModoNoche+ '. Usted no recibirá notificaciones.');
    }   
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
                value={this.state.valueCiego} 
                style={{position: 'absolute', left: '75%', top: '50%'}} 
                onSyncPress={(value) => this.switch1Cambiado(value)} />            
              </View>
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Modo noche</Text>
              <Switch width={60}
                height={30}
                label={2} 
                value={this.state.valueNoche} 
                style={{position: 'absolute', left: '75%', top: '50%'}} 
                onSyncPress={(value) => this.switch2Cambiado(value)} />                          
              </View>
              {/*
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Sonido</Text>
              <Switch width={60}
                height={30}
                label={2} 
                value={this.state.valueSonido} 
                style={{position: 'absolute', left: '75%', top: '50%'}} 
                onSyncPress={(value) => this.switch3Cambiado(value)} />                          
              </View>
              */}
              <View style ={styles.rowContainer}>
              <Text style={{marginTop: 25, fontSize: 20}} > Notificaciones</Text>
              <Picker
              style={{ width: '55%', position: 'absolute', left: '50%', top: '30%'}}
              selectedValue={this.state.PickerNot}
              onValueChange={(itemValue, itemIndex) => this.setState
                ({ PickerNot: itemValue })}
              >
              <Picker.Item label="Semanalmente" value="semanalmente" />
              <Picker.Item label="Nunca" value="nunca" />
              <Picker.Item label="Diariamente" value="diariamente" />
            </Picker>             
              </View>
              <TouchableHighlight
              style={styles.button}
              onPress={() => this.mostrarEnPantalla()}
            >
              <Text style={styles.textButton}>Guardar Ajustes</Text>
            </TouchableHighlight>
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
    marginTop: 30,
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
    color: 'white',
    fontSize: 20
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
