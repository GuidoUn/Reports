import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  Button, 
  TextInput,
  TouchableHighlight,
  Picker,
  Platform
 } from 'react-native';
 import {
  Permissions, 
  Location, 
  Constants
  } from 'expo';
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
  constructor(){
    super()
    this.state={
      direc:'',
      ciudad:'',
      comment:'',
      pais:'',
      PickerValue:'',
      latitude: null,
      longitude: null,
    };
  }
  changeDirec(direc){
    this.setState({direc})
  }
  changeCiudad(ciudad){
    this.setState({ciudad})
  }
  changePais(pais){
    this.setState({pais})
  }
  changeComment(comment){
    this.setState({comment})
  }
  buttonPressed(){
    if(this.state.comment&&this.state.pais&&this.state.direc&&this.state.ciudad&&this.state.PickerValue!=""){
      alert('Completó todos los campos correctamente')
    }else{
      alert('Por favor complete todos los campos')  
    } 
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.title}>Formulario de reportes</Text>
        <Text>Tipo de obstáculo</Text>
          <Picker
          style={{width:'100%'}}
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue,itemIndex) => this.setState
          ({PickerValue:itemValue})}
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
    marginTop:5,
    paddingLeft: 15,
    paddingRight: 15
  },
  direc:{
    textAlign:'center',
    fontSize: 18,
    marginBottom: 20
  },
  ciudad:{
    textAlign:'center',
    fontSize: 18,
    marginBottom: 20
  },
  pais:{
    textAlign:'center',
    fontSize: 18,
    marginBottom: 20
  },
  title:{
    textAlign:'center',
    fontSize: 22,
    marginBottom: 30
  },
  button:{
    backgroundColor: 'red',
    paddingTop: 15,
    paddingBottom: 15
  },
  button2:{
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5
  },
  textButton:{
    textAlign:'center',
    color: 'white'
  },
  input: {
    height:40,
    borderColor: '#ccc',
    marginBottom:20,
    borderWidth:2
  },
  textArea:{
    height:60
  }
});
