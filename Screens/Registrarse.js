import React, { Fragment } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TextInput,
  TouchableHighlight,
  Picker,
  Platform
} from 'react-native';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from "react-native-modal";
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
  {
    id: 1,
    name: 'Agronomía',
  },
  {
    id: 2,
    name: 'Almagro',
  },
  {
    id: 3,
    name: 'Balvanera',
  },
  {
    id: 4,
    name: 'Barracas',
  },
  {
    id: 5,
    name: 'Belgrano',
  },
  {
    id: 6,
    name: 'Boedo',
  },
  {
    id: 7,
    name: 'Caballito',
  },
  {
    id: 8,
    name: 'Chacarita',
  },
  {
    id: 9,
    name: 'Coghlan',
  },
  {
    id: 10,
    name: 'Colegiales',
  },
  {
    id: 11,
    name: 'Constitución',
  },
  {
    id: 12,
    name: 'Flores',
  },
  {
    id: 13,
    name: 'Floresta',
  },
  {
    id: 14,
    name: 'La Boca',
  },
  {
    id: 15,
    name: 'La Paternal',
  },
  {
    id: 16,
    name: 'Liniers',
  },
  {
    id: 17,
    name: 'Mataderos',
  },
  {
    id: 18,
    name: 'Monte Castro',
  },
  {
    id: 19,
    name: 'Monserrat',
  },
  {
    id: 20,
    name: 'Nueva Pompeya',
  },
  {
    id: 21,
    name: 'Nuñez',
  },
  {
    id: 22,
    name: 'Palermo',
  },
  {
    id: 23,
    name: 'Parque Avellaneda',
  },
  {
    id: 24,
    name: 'Parque Chacabuco',
  },
  {
    id: 25,
    name: 'Parque chas',
  },
  {
    id: 26,
    name: 'Parque Patricios',
  },
  {
    id: 27,
    name: 'Puerto Madero',
  },
  {
    id: 28,
    name: 'Recoleta',
  },
  {
    id: 29,
    name: 'Retiro ',
  },
  {
    id: 30,
    name: 'Saavedra',
  },
  {
    id: 31,
    name: 'San Cristóbal',
  },
  {
    id: 32,
    name: 'San Nicolás',
  },
  {
    id: 33,
    name: 'San Telmo',
  },
  {
    id: 34,
    name: 'Veléz Sársfield',
  },
  {
    id: 35,
    name: 'Versalles',
  },
  {
    id: 36,
    name: 'Villa Crespo',
  },
  {
    id: 37,
    name: 'Villa del Parque',
  },
  {
    id: 38,
    name: 'Villa Devoto',
  },
  {
    id: 39,
    name: 'Villa General Mitre',
  },
  {
    id: 40,
    name: 'Villa Lugano',
  },
  {
    id: 41,
    name: 'Villa Luro',
  },
  {
    id: 42,
    name: 'Villa Ortúzar',
  },
  {
    id: 43,
    name: 'Villa Pueyrredón',
  },
  {
    id: 44,
    name: 'Villa Real',
  },
  {
    id: 45,
    name: 'Villa Riachuelo',
  },
  {
    id: 46,
    name: 'Villa Santa Rita',
  },
  {
    id: 47,
    name: 'Villa Soldati',
  },
  {
    id: 48,
    name: 'Villa Urquiza',
  },
];

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      createUserInput: '',
      createDNIInput: '',
      createMailInput: '',
      createPassInput: '',
      selectedItems: [
        {
          id: 0,
          name: 'no ha seleccionado barrio',
        }],
    }
  }

  changeCreateUserInput(createUserInput) {
    this.setState({ createUserInput })
  }

  changeCreateMailInput(createMailInput) {
    this.setState({ createMailInput })
  }

  changeCreateDNIInput(createDNIInput) {
    this.setState({ createDNIInput })
  }

  changeCreatePassInput(createPassInput) {
    this.setState({ createPassInput })
  }

  createPressed() {
    if (this.state.createUserInput && this.state.createMailInput && this.state.createPassInput) {
      fetch('http://10.10.32.52:3000/api/usuarios/reg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.state.createUserInput,
          dni: this.state.createDNIInput,
          name: 'nombre',
          surname: 'apellido',
          email: this.state.createMailInput,
          password: this.state.createPassInput,
          barrio: this.state.selectedItems.name,
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
          alert('Usuario creado: ' + this.state.createUserInput + ' Email creado: ' + this.state.createMailInput + ' Contraseña creada: ' + this.state.createPassInput)
        })
        .catch((error) => {
          console.error(error);
          alert('Se ha producido un error registrando su cuenta')
        })
    }
    else {
      alert('Por favor complete todos los campos')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<ImageBackground source={require('../Images/back2.jpeg')} style={{ width: '100%', height: '100%' }}>*/}
          <View>
            <Text style={styles.title}>Sign Up</Text>
            <SearchableDropdown
              onItemSelect={(item) => {
                //const items = this.state.selectedItems;
                //items.push(item)
                this.setState({ selectedItems: item });
              }}
              containerStyle={{ padding: 5 }}
              onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                this.setState({ createBarrio: items });
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={0}
              resetValue={false}
              textInputProps={
                {
                  placeholderTextColor:'black',
                  placeholder: " Seleccionar barrio",
                  underlineColorAndroid: "transparent",
                  style: {
                    height:50,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            <TextInput
              style={styles.input}
              placeholderTextColor='white'
              placeholder=" Nombre de Usuario"
              value={this.state.createUserInput}
              onChangeText={(createUserInput) => this.changeCreateUserInput(createUserInput)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor='white'
              placeholder=" Correo electrónico"
              value={this.state.createMailInput}
              onChangeText={(createMailInput) => this.changeCreateMailInput(createMailInput)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor='white'
              placeholder=" Número de documento"
              value={this.state.createDNIInput}
              onChangeText={(createDNIInput) => this.changeCreateDNIInput(createDNIInput)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor='white'
              placeholder=" Contraseña"
              value={this.state.createPassInput}
              secureTextEntry
              onChangeText={(createPassInput) => this.changeCreatePassInput(createPassInput)}
            />

            <TouchableHighlight
              style={styles.button}
              onPress={() => this.createPressed()}
            >
              <Text style={styles.textButton}>Crear cuenta</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.textButton}>Login</Text></TouchableHighlight>
          </View>
        {/*</ImageBackground>*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    marginTop: 5,
    paddingLeft: 0,
    paddingRight: 0
  },
  direc: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  ciudad: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15,
  },
  pais: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },
  title: {
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 30,
    fontSize: 22,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#787FF6',
    marginTop: 7,
    marginHorizontal: 30,
    borderRadius: 50,
    height: 50,
    padding: 15,
    marginBottom: 7,
  },
  button2: {
    backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 5
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    color: 'white',
    backgroundColor: '#787FF6',
    borderBottomRightRadius: 30,
    borderTopRightRadius:30,
    marginRight:50,
    borderColor: '#787FF6',
    marginBottom: 15,
    borderWidth: 2
  },
  textArea: {
    height: 60
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
});